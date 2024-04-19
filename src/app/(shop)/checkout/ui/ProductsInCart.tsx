"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function ProductsInCart() {
  const [isLoadedComponent, setIsLoadedComponent] = useState(false);
  
  const productsInCart = useCartStore((state) => state.cart);

  useEffect(() => {
    setIsLoadedComponent(true);
  }, []);

  if (isLoadedComponent && productsInCart.length <= 0) {
    redirect("/empty");
  }

  if (!isLoadedComponent) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            src={`/products/${product.image}`}
            alt={product.title}
            width={100}
            height={100}
            className="mr-5 rounded"
            style={{
              width: "100px",
              height: "100px",
            }}
          />

          <div>
            <span className="text-balance">
              {product.size} - {product.title} 
            </span>
            <br />
            <span>({product.quantity})</span>
            
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
}
