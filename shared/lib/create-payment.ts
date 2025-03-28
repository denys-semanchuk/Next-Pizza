import { Stripe } from "stripe";
import { sendEmail } from "./send-email";
import { prisma } from "@/prisma/prisma-client";
import { OrderSuccessTemplate } from "../components/shared/email-templates/order-success";
import { CartItemDTO } from "../services/dto/cart.dto";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  
  const baseUrl = process.env.STRIPE_CALLBACK_URL || 'http://localhost:3000';

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: details.description,
          },
          unit_amount: Math.round(details.amount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/canceled`,
    metadata: {
      order_id: details.orderId.toString(),
    },
  });

  return {
    id: session.id,
    confirmation: {
      confirmation_url: session.url,
    },
    status: session.status,
  };
}

export async function checkPaymentAndNotify(sessionId: string): Promise<boolean> {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status === "paid") {
      const orderId = session.metadata?.order_id;
      
      if (!orderId) {
        console.error("Order ID not found in session metadata");
        return false;
      }
      
      // Get the order from database
      const order = await prisma.order.findUnique({
        where: { id: parseInt(orderId) }
      });
      
      if (!order) {
        console.error(`Order ${orderId} not found`);
        return false;
      }
      
      // Check if order is already marked as successful - only send email on status change
      if (order.status === "SUCCEDED") {
        // Order already processed, don't send email again
        return true;
      }
      
      // Update order status
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { status: "SUCCEDED" }
      });
      
      // Send success email only on status change
      await sendEmail(
        order.email,
        "Next Pizza / Ваш заказ успешно оплачен 🎉",
        OrderSuccessTemplate({
          orderId: order.id,
          items: JSON.parse(order.items as string) as CartItemDTO[],
        })
      );
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error checking payment status:", error);
    return false;
  }
}