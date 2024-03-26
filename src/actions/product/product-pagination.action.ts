'use server'

import { Gender } from "@/interfaces";
import prisma from "@/lib/prisma"

interface Props {
  page?: number;
  take?: number;
  filter?: Gender;
}

export async function GetPaginatedProductWithImages({page=1, take=6, filter}: Props) {
  page = Number(page);
  take = Number(take);

  console.log(filter)
  
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
      },
      where: {
        gender: filter
      }
    });

    const totalCount = await prisma.product.count({where: {gender: filter}});
    const totalPages = Math.ceil( totalCount / take );
    console.log("total page", {totalPages, filter, totalCount})

    return {
      currentPage: page,
      totalPages: totalPages,
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