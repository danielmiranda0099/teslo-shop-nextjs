import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  // await Promise.all([
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  const { products, categories } = initialData;

  const categoriesData = categories.map( (category) => (
    {
      name: category
    }
  ));

  await prisma.category.createMany({
    data: categoriesData
  })

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce( (map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  products.forEach( async (product) => {
    const { type, images, ...rest } = product;

    const productDB = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type], 
      }
    });

    const imagesMap = images.map( (image) => (
      {
        url: image,
        productId: productDB.id
      }
    ));

    await prisma.productImage.createMany({
      data: imagesMap
    })
  });

  console.log("SEED RUN ON DB ------> OK");
}

(() => {
  main();
})();
