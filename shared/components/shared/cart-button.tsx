'use client';

import { cn } from '@/shared/lib/utils';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store/cart';

interface Props {
  className?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
  const [hydrated, setHydrated] = useState(false);
  
  const totalAmount = useCartStore(state => state.totalAmount);
  const cartItems = useCartStore(state => state.cartItems);
  const loading = useCartStore(state => state.loading);
  
  useEffect(() => {
    useCartStore.persist.rehydrate();
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <CartDrawer>
        <Button
          loading={true}
          className={cn('group relative w-[105px]', className)}>
          <b>0 ₽</b>
          <span className="h-full w-[1px] bg-white/30 mx-3" />
          <div className="flex items-center gap-1">
            <ShoppingCart size={16} className="relative" strokeWidth={2} />
            <b>0</b>
          </div>
        </Button>
      </CartDrawer>
    );
  }

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn('group relative', { 'w-[105px]': loading }, className)}>
        <b>{totalAmount} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{cartItems.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};