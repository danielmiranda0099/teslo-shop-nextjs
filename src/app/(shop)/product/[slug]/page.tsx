import { notFound } from "next/navigation";

import { initialData } from "@/seed/seed";
import { titleFont } from "@/fonts-next/fonts";
import { SizeSelector } from "@/components/products";

interface Props {
  params: {
    slug: string;
  }
}

export default function ProductPage({params: {slug}}: Props) {

  const product = initialData.products.find((product) => product.slug === slug );

  if(!product){
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        
      </div>
      
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>

        <SizeSelector availableSizes={product.sizes} selectedSize={product.sizes[0]}/>

        <button className="btn-primary my-5">Agregar Al Carrito</button>

        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>


      </div>
    </div>
  )
}