import { prisma } from "@/prisma/prisma-client";
import { Ingredient } from "@prisma/client";
import { Check } from "lucide-react";
import { Title, OrderItem } from "@/shared/components/shared";
import { checkPaymentAndNotify } from "@/shared/lib/create-payment";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  categoryId: number;
}

interface ProductItem {
  id: number;
  price: number;
  size: number;
  pizzaType: number;
  productId: number;
  product: Product;
}

interface CartItem {
  id: number;
  productItemId: number;
  cartId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  ingredients: Ingredient[];
  productItem: ProductItem;
}
type tSearchParams = Promise<{
  session_id?: string;}>

export default async function SuccessPage(props: {searchParams: tSearchParams}) {
  const searchParams = await props.searchParams;

  const sessionId = searchParams.session_id || null;
  if (sessionId) {
    await checkPaymentAndNotify(sessionId);
  }

  const order = await prisma.order.findFirst({
    where: {
      paymentId: sessionId,
    },
  });

  if (!order) {
    return (
      <div className="container mx-auto p-6 min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 text-center">
          <h1 className="text-2xl font-bold mb-4">
            Could not find order information
          </h1>
          <p>Please contact our customer support</p>
        </div>
      </div>
    );
  }

  const items: CartItem[] = JSON.parse(String(order.items));

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-center mb-6">
          <Check className="text-green-500 h-16 w-16" />
        </div>
        <Title
          text="Thank you for your order!"
          className="font-bold text-center mb-2"
          size="xl"
        />

        <p className="text-center text-gray-600 mb-6">
          Order #{order.id} has been successfully paid and is being processed
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Order details:</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order information</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Name:</p>
                <p className="font-medium">{order.fullName}</p>
              </div>
              <div>
                <p className="text-gray-600">Phone:</p>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{order.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Delivery address:</p>
                <p className="font-medium">{order.address}</p>
              </div>
              <div>
                <p className="text-gray-600">Order date:</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleString("en-US")}
                </p>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{order.totalAmount} $</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
