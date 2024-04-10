"use client";

import { QuantitySelector } from "@/components/products";
import { useCartStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export function ProductInCart() {
  const [isLoadedComponent, setIsLoadedComponent] = useState(false);
  
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const removeProduct = useCartStore((state) => state.removeProduct);

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
            <Link
              className="cursor-pointer hover:underline"
              href={`/product/${product.slug}`}
            >
              {" "}
              <span className="font-semibold">{product.size}</span> -{" "}
              {product.title}
            </Link>
            <p>${product.price}</p>

            <QuantitySelector
              quantity={product.quantity}
              OnQuantityChanged={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />

            <button onClick={() => removeProduct(product)} className="underline mt-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
}
