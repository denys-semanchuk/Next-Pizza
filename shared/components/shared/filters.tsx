'use client'
import React from 'react';

import { cn } from '@/shared/lib/utils';
import { useFilters, useIngredients } from '@/shared/hooks';
import { RangeSlider, CheckboxFiltersGroup, Title } from '@/shared/components/shared';
import { Input } from '../ui';
import { useQueryFilters } from '@/shared/hooks/use-query-filters';

interface FiltersProps {
  className?: string
}

export const Filters: React.FC<FiltersProps> = ({ className }) => {

  const filters = useFilters()
  const { ingredients, loading } = useIngredients();
  useQueryFilters(filters)

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div className={cn(className)}>
      <Title text='Filters' size='sm' className='font-bold mb-5' />


      <CheckboxFiltersGroup
        name='crustTypes'
        title='Crust Types'
        className='mb-5'
        items={[
          { text: "Thin Crust", value: "1" },
          { text: "Traditional Crust", value: "2" },
          { text: "Stuffed Crust", value: "3" },
        ]}
        onClickCheckbox={filters.togglePizzaType}
        selected={filters.pizzaTypes}
      />

      <CheckboxFiltersGroup
        name='sizes'
        title='Pizza Sizes'
        className='mb-5'
        limit={6}
        items={[
          { text: "20cm", value: "20" },
          { text: "30cm", value: "30" },
          { text: "40cm", value: "40" },
        ]}
        onClickCheckbox={filters.togglePizzaSize}
        selected={filters.sizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price Range</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={filters.prices?.priceFrom || 0}
            onChange={(e) => filters.updatePrice("priceFrom", Number(e.target.value))}
          />
          <Input
            type="number"
            min={100}
            max={1000}
            placeholder='1000'
            value={filters.prices?.priceTo || 1000}
            onChange={(e) => filters.updatePrice("priceTo", Number(e.target.value))}
          />
        </div>
      </div>
      <RangeSlider
        min={0}
        max={1000}
        step={10}
        value={[filters.prices?.priceFrom || 0, filters.prices?.priceTo || 1000]}
        onValueChange={([priceFrom, priceTo]) => filters.setPrice({ priceFrom, priceTo })}
      />
      <CheckboxFiltersGroup
        name='ingredients'
        title='Ingredients'
        className='mt-10'
        limit={6}
        items={items}
        defaultItems={items.slice(0, 6)}
        loading={loading}
        onClickCheckbox={filters.toggleIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};