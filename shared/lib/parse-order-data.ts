// import { Ingredient, Order } from "@prisma/client";

// // Simplified product structure
// export interface SimplifiedProduct {
//   id: number;
//   name: string;
//   imageUrl: string;
//   size: number;
//   pizzaType: string; // Already converted to "Traditional" or "Thin crust"
//   price: number;
//   quantity: number;
//   ingredients: SimplifiedIngredient[];
//   totalPrice: number; // Price with ingredients and quantity calculated
// }

// // Simplified ingredient structure
// export interface SimplifiedIngredient {
//   id: number;
//   name: string;
//   price: number;
// }

// // Simplified order structure
// export interface SimplifiedOrder {
//   id: number;
//   products: SimplifiedProduct[];
//   customerInfo: {
//     fullName: string;
//     email: string;
//     phone: string;
//     address: string;
//   };
//   totalAmount: number;
//   createdAt: Date;
//   paymentId: string;
// }

// // The main parsing function
// export function parseOrderData(order: Order): SimplifiedOrder {
//   // Parse the items JSON
//   const items = JSON.parse(String(order.items));

//   // Convert pizza type number to string
//   const getPizzaTypeText = (type: number): string => {
//     return type === 1 ? "Traditional" : "Thin crust";
//   };

//   // Process each product to simplify structure
//   const products: SimplifiedProduct[] = items.map((item: any) => {
//     // Calculate total price including ingredients
//     const ingredientsPrice = item.ingredients.reduce(
//       (sum: number, ing: any) => sum + ing.price,
//       0
//     );
    
//     const basePrice = item.productItem.price;
//     const totalItemPrice = (basePrice + ingredientsPrice) * item.quantity;

//     return {
//       id: item.id,
//       name: item.productItem.product.name,
//       imageUrl: item.productItem.product.imageUrl,
//       size: item.productItem.size,
//       pizzaType: getPizzaTypeText(item.productItem.pizzaType),
//       price: basePrice,
//       quantity: item.quantity,
//       ingredients: item.ingredients.map((ing: any) => ({
//         id: ing.id,
//         name: ing.name,
//         price: ing.price,
//       })),
//       totalPrice: totalItemPrice,
//     };
//   });

//   // Return simplified order
//   return {
//     id: order.id,
//     products,
//     customerInfo: {
//       fullName: order.fullName,
//       email: order.email,
//       phone: order.phone,
//       address: order.address,
//     },
//     totalAmount: order.totalAmount,
//     createdAt: order.createdAt,
//     paymentId: order.paymentId,
//   };
// }