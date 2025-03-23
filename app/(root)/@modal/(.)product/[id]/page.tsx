import { ChooseProductModal } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductModalPage(props: Props) {
  const { id } = props.params;
  
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      productItems: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}