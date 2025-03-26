import { Stripe } from "stripe";

interface Props {
  description: string;
  orderId: number;
  amount: number;
}

export async function createPayment(details: Props) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  
  // Define a default base URL if environment variable is missing
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