import { Container, PizzaImage, Title,GroupVariants } from "@/shared/components/shared"
import { prisma } from "@/prisma/prisma-client"
import { notFound } from "next/navigation"

export default async function ProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;

  const {
    id
  } = params;

  const product = await prisma.product.findFirst({ where: { id: Number(id) } })

  if (!product) {
    return notFound()
  }
  return <Container className="flex flex-col my-10">
    <div className="flex flex-1">
      <PizzaImage imageUrl={product.imageUrl} size={40} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={product.name} />
        <p className="text-gray-400"></p>
        <GroupVariants value="2" items={[{
          name: 'Little',
          value: '1'
        },
        {
          name: 'Middle',
          value: '2'
        },
        {
          name: 'Big',
          value: '3'
        }]}/>
      </div>
    </div>
  </Container>
}