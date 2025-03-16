import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import React from "react";

interface QueryFilters extends PriceProps {
  pizzaTypes: string[];
  sizes: string[];
  ingredients: string[];
}

export interface Filters {
  prices: PriceProps;
  sizes: Set<string>;
  selectedIngredients: Set<string>;
  pizzaTypes: Set<string>;
}

interface ReturnProps extends Filters {
  updatePrice: (name: keyof PriceProps, value: number) => void;
  setPrice: ({
    priceFrom,
    priceTo,
  }: {
    priceFrom: number;
    priceTo: number;
  }) => void;
  togglePizzaSize: (size: string) => void;
  toggleIngredients: (ingredient: string) => void;
  togglePizzaType: (type: string) => void;
}
interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}
export const useFilters = (): ReturnProps => {
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>()
  );
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [prices, setPrice] = React.useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });
  const [sizes, { toggle: togglePizzaSize }] = useSet(
    new Set<string>(
      searchParams.has("sizes") ? searchParams.get("sizes").split(",") : []
    )
  );
  const [pizzaTypes, { toggle: togglePizzaType }] = useSet(
    new Set<string>(
      searchParams.has("pizzaTypes")
        ? searchParams.get("pizzaTypes").split(",")
        : []
    )
  );

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return {
    prices,
    setPrice,
    sizes,
    selectedIngredients,
    toggleIngredients,
    togglePizzaSize,
    togglePizzaType,
    pizzaTypes,
    updatePrice,
  };
};
