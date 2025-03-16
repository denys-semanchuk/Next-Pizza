import { useRouter } from "next/navigation";
import { Filters } from "./use-filters";
import qs from "qs";
import { useEffect } from "react";
export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      pizzaTypes: Array.from(filters.pizzaTypes),
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };
    const query = qs.stringify(params, { arrayFormat: "comma" });
    router.push(`?${query}`);
  }, [
    filters.pizzaTypes,
    filters.sizes,
    filters.prices,
    filters.selectedIngredients,
    router,
  ]);
};
