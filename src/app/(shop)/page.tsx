import { GetPaginatedProductWithImages } from "@/actions/product";
import { ProductsGrid } from "@/components/products";
import { Title } from "@/components/ui";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { products } = await GetPaginatedProductWithImages({page}) || { products: [] };

  return (
    <>
      <Title title="Tienda" subtitle="Todos Los Poductos" className="mb-2" />

      <ProductsGrid products={products} />
    </>
  );
}
