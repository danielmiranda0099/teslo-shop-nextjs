import { GetPaginatedProductWithImages } from "@/actions/product";
import { ProductsGrid } from "@/components/products";
import { Title } from "@/components/ui";

export default async function Home() {
  const { products } = await GetPaginatedProductWithImages() || { products: [] };

  console.log(products);
  return (
    <>
      <Title title="Tienda" subtitle="Todos Los Poductos" className="mb-2" />

      <ProductsGrid products={products} />
    </>
  );
}
