import { ProductsGrid } from "@/components/products";
import { Title } from "@/components/ui";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { Category } from '@/interfaces'

interface Props {
  params: {
    id: Category;
  };
}

const PRODUCTS = initialData.products;
const CATEGORIES: Category[] = ['men', 'women', 'kid', 'unisex'];

export default function CategoryPage({ params }: Props) {
  const { id: category } = params;

  if (!CATEGORIES.includes(category)) {
    notFound();
  }

  const productsByCategory = PRODUCTS.filter(
    (product) => product.gender === category
  );

  return (
    <>
      <Title title={ category.toUpperCase() } subtitle={`Todos Los Productos De ${category}`} className="mb-2" />
      <ProductsGrid products={productsByCategory} />
    </>
  );
}
