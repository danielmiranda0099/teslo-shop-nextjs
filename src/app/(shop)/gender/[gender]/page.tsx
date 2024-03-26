import { ProductsGrid } from "@/components/products";
import { Pagination, Title } from "@/components/ui";
import { initialData } from "@/seed/seed";
import { notFound, redirect } from "next/navigation";
import { Gender } from "@/interfaces";
import { GetPaginatedProductWithImages } from "@/actions/product";

interface Props {
  params: { 
    gender: Gender 
  };
  searchParams: {
    page?: string;
  };
}

const GENDERS: Gender[] = ["men", "women", "kid", "unisex"];

export default async function GenderPageByType({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? Number(searchParams.page) : 1;
  console.log("GenderPageByType", {page})

  if( isNaN(page) || page <= 0 ){
    redirect(`/gender/${gender}`);
  }

  if (!GENDERS.includes(gender)) {
    notFound();
  }

  const { products, currentPage, totalPages } = await GetPaginatedProductWithImages({ page, filter: gender });

  return (
    <>
      <Title title={ gender.toUpperCase() } subtitle={`Todos Los Productos De ${gender}`} className="mb-2" />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
