import prisma from "@/lib/prisma";



export async function GetProductsBySlug( slug: string ) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      }
    });

    if(!product) return null;

    return {
      ...product,
      images: product.ProductImage.map( image => image.url )
    }
  } catch (error) {
    throw new Error("Error al obtener producto por slug");
  }
}
