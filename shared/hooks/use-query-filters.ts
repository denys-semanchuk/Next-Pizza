import React from 'react';
import { Filters } from './use-filters';
import qs from 'qs';
import { useRouter } from 'next/navigation';

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        priceFrom: filters.prices?.priceFrom,
        priceTo: filters.prices?.priceTo,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };

      // Only update URL if we have actual filters
      const hasFilters = Object.values(params).some(value => 
        value !== undefined && 
        (Array.isArray(value) ? value.length > 0 : true)
      );

      const query = hasFilters 
        ? qs.stringify(params, { arrayFormat: 'comma' })
        : '';

      router.push(query ? `?${query}` : '/', {
        scroll: false,
      });
    }

    isMounted.current = true;
  }, [
    filters.prices?.priceFrom,
    filters.prices?.priceTo,
    filters.pizzaTypes,
    filters.sizes,
    filters.selectedIngredients,
    router
  ]);
};