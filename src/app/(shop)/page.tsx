import { ProductsGrid } from "@/components/products";
import { Title } from "@/components/ui";
import { initialData } from "@/seed/seed";

const PRODUCTS = initialData.products;


export default function Home() {
  return (
    <>
      <Title title="Tienda" subtitle="Todos Los Poductos" className="mb-2"/>

      <ProductsGrid products={PRODUCTS}/>
    </>
  );
}
