import Image from "next/image";
import { Ingredient } from "@prisma/client";

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

export interface OrderItemProps {
  id: number;
  productItemId: number;
  quantity: number;
  ingredients: Ingredient[];
  productItem: ProductItem;
}

export const OrderItem = ({ item }: { item: OrderItemProps }) => {
  const getPizzaTypeText = (type: number) => {
    return type === 1 ? "Traditional" : "Thin crust";
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-1/4">
        <Image
          src={item.productItem.product.imageUrl}
          alt={item.productItem.product.name}
          width={150}
          height={150}
          className="rounded-lg"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">
            {item.productItem.product.name}
          </h3>
          <p className="font-semibold">
            {item.productItem.price * item.quantity} $
          </p>
        </div>
        <p className="text-gray-600 text-sm mb-2">
          {item.productItem.size} cm,{" "}
          {getPizzaTypeText(item.productItem.pizzaType)}
        </p>
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="mt-2">
            <p className="text-sm font-medium">
              Additional ingredients:
            </p>
            <ul className="text-sm text-gray-600">
              {item.ingredients.map((ingredient) => (
                <li
                  key={ingredient.id}
                  className="flex justify-between"
                >
                  <span>{ingredient.name}</span>
                  <span>{ingredient.price} $</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-2 text-sm text-gray-600">
          Quantity: {item.quantity}
        </div>
      </div>
    </div>
  );
};