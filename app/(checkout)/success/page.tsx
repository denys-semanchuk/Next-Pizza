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

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  const { session_id: sessionId } = searchParams;

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
            Не удалось найти информацию о заказе
          </h1>
          <p>Пожалуйста, свяжитесь с нашей службой поддержки</p>
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
          text="Спасибо за заказ!"
          className=" font-bold text-center mb-2"
          size="xl"
        />

        <p className="text-center text-gray-600 mb-6">
          Заказ #{order.id} успешно оплачен и принят в обработку
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Состав заказа:</h2>
            <div className="space-y-4">
            {items.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Информация о заказе</h2>
            <div className="space-y-3">
              <div>
                <p className="text-gray-600">Имя:</p>
                <p className="font-medium">{order.fullName}</p>
              </div>
              <div>
                <p className="text-gray-600">Телефон:</p>
                <p className="font-medium">{order.phone}</p>
              </div>
              <div>
                <p className="text-gray-600">Email:</p>
                <p className="font-medium">{order.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Адрес доставки:</p>
                <p className="font-medium">{order.address}</p>
              </div>
              <div>
                <p className="text-gray-600">Дата заказа:</p>
                <p className="font-medium">
                  {new Date(order.createdAt).toLocaleString("ru-RU")}
                </p>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-lg font-bold">
                <span>Итого:</span>
                <span>{order.totalAmount} ₽</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
