'use client';

import { ProductWithRelations } from '@/@types/prisma';
import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import { useCartStore } from '@/shared/store/cart';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const addCartItem = useCartStore(state => state.addCartItem);
  const loading = useCartStore(state => state.loading);

  const firstItem = product.productItems?.[0];
  const isPizzaForm = Boolean(firstItem?.pizzaType);
  
  const handleSubmit = useCallback(async (productItemId?: number, ingredients?: number[]) => {
    try {
      if (!firstItem) {
        toast.error('Product has no items');
        return;
      }

      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      toast.success(`${product.name} added to cart`);

      if (_onSubmit) {
        setTimeout(() => {
          _onSubmit();
        }, 0);
      }
    } catch (err) {
      toast.error('Failed to add item to cart');
      console.error(err);
    }
  }, [addCartItem, firstItem, product.name, _onSubmit]);

  if (isPizzaForm && firstItem) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.productItems}
        onSubmit={handleSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      onSubmit={handleSubmit}
      price={firstItem?.price || 0}
      loading={loading}
    />
  );
};