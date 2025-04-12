import {
  Container,
  Filters,
  Title,
  TopBar,
  ProductsGroupList,
} from '@/shared/components/shared';
import { Suspense } from 'react';
import { GetSearchParams, findPizzas } from '@/shared/lib/find-pizzas';
import { Sheet, SheetContent, SheetTrigger } from '@/shared/components/ui/sheet';
import { FilterIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui';

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  const params = await searchParams;
  const categories = await findPizzas(params);

  return (
    <>
      <Container className="mt-6 md:mt-10">
        <div className="flex items-center justify-between">
          <Title text="All Pizzas" size="lg" className="font-extrabold text-2xl md:text-3xl" />
          
          {/* Mobile filter button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FilterIcon size={16} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[85%] sm:w-[350px] pt-10">
                <div className="w-full overflow-y-auto pr-4">
                  <Suspense fallback={<div>Loading filters...</div>}>
                    <Filters />
                  </Suspense>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>

      <div className="overflow-x-auto scrollbar-hide">
        <TopBar categories={categories.filter((category) => category.products.length > 0)} />
      </div>

      <Container className="mt-6 md:mt-10 pb-14 px-5">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Filtering - hidden on mobile and tablet */}
          <div className="hidden lg:block w-[220px] flex-shrink-0">
            <Suspense fallback={<div>Loading filters...</div>}>
              <Filters />
            </Suspense>
          </div>

          {/* Product list */}
          <div className="flex-1 max-w-full">
            <div className="flex flex-col gap-8 md:gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}