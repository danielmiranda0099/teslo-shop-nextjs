import { GetPaginatedProductWithImages } from "@/actions/product";
import { ProductsGrid } from "@/components/products";
import { Pagination, Title } from "@/components/ui";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt( searchParams.page ) : 1;
  const { products, currentPage, totalPages } = await GetPaginatedProductWithImages({page});

  if( products.length <= 0 || page <= 0 || isNaN(page) ){
    redirect("/");
  }


  return (
    <>
      <Title title="Tienda" subtitle="Todos Los Poductos" className="mb-2" />

      <ProductsGrid products={products} />

      <Pagination totalPages={totalPages} />
    </>
  );
}
