'use server'

import prisma from "@/lib/prisma"

interface Props {
  page?: number;
  take?: number;
}

export async function GetPaginatedProductWithImages({page=1, take=6}: Props) {
  page = Number(page);
  take = Number(take);
  
  if( isNaN( page ) ) page = 1;
  if( page < 1 ) page = 1;

  if( isNaN( take) ) take = 6
  if( take < 6 ) page = 6;

  try {
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true,
          }
        }
      }
    });

    return {
      products: products.map( (product) => (
        {
          ...product,
          images: product.ProductImage.map( (image) => image.url),
        }
      )),
    }

  } catch (error) {
    throw new Error("Error al cargar productos");
  }
}