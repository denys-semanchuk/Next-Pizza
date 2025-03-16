'use client';
import React, { useRef, useEffect } from 'react'
import { Title } from './title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './product-card';
import { useIntersection } from 'react-use';
import { useCategoryStore } from '@/shared/store/category';
import {ProductItem } from '@prisma/client';

type Props = {
  className?: string
  title: string;
  items: Product[];
  categoryId?: number;
  listClassName?: string
}


export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  items: ProductItem[];
  description?: string;
  ingredients?: string[];
  isNew?: boolean;
  isCollectable?: boolean;
  rating?: number;
  category?: 'pizza' | 'sides' | 'drinks' | 'desserts';
}

export const ProductsGroupList = (props: Props) => {
  const setCategoryId = useCategoryStore(state => state.setActiveId);
  const intersectionRef = useRef<HTMLElement>(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  useEffect(() => {
    if (intersection?.isIntersecting && props.categoryId) {
      setCategoryId(props.categoryId)
    }
  }, [intersection?.isIntersecting, props.categoryId, props.title]);

  return (
    <div id={props.title} className={props.className} ref={intersectionRef as React.RefObject<HTMLDivElement>}>
      <Title text={props.title} size='lg' className='font-extrabold mb-5' />
      <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]", props.listClassName)}>
        {props.items.map((product: Product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  )
}