import React from 'react'
import { Container, Title, TopBar, Filters, ProductsGroupList } from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { Suspense } from 'react'
import { Ingredient } from '@prisma/client'

export default async function Page() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          productItems: true
        }
      }
    }
  })

  const adaptedCategories = categories.map(category => ({
    id: category.id,
    name: category.name,
    products: category.products.map(product => ({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      items: product.productItems,
      ingredients: product.ingredients.map((ing: Ingredient) => ing.name),
    }))
  }));

  return (
    <>
      <Container className='mt-10'>
        <Title text='All Pizzas' size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories.filter((cat) => cat.products.length > 0)} />

      <Container className='pb-14 mt-10'>
        <div className="flex gap-[60px]">
          {/* Filtration */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Products list */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <Suspense fallback={<div>Loading products...</div>}>
                {adaptedCategories.map(category => (
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      items={category.products}
                      categoryId={category.id}
                    />
                  )
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}