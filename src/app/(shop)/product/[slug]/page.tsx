export const revalidate = 604800; //7 dias
import { notFound } from "next/navigation";

import { titleFont } from "@/fonts-next/fonts";
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from "@/components/products";
import { GetProductsBySlug } from "@/actions/product";
import { Metadata, ResolvingMetadata } from "next";
import { AddToCart } from "./ui";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  const product = await GetProductsBySlug(slug);
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: product?.title ?? "Producto No Encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto No Encontrado",
      description: product?.description ?? "",
      images: [`/product/${ product?.images[1] }`],
    },
  }
}

export default async function ProductBySlugPage( {params: {slug} }: Props) {
  
  const product = await GetProductsBySlug(slug);

  if(!product){
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <ProductMobileSlideShow title={product.title} images={product.images} className="block md:hidden" />

        <ProductSlideShow title={product.title} images={product.images} className="hidden md:block" />
      </div>
      
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>


      </div>
    </div>
  )
}
