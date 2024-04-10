'use client';

import { QuantitySelector, SizeSelector } from "@/components/products";
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: Product,

}

export function AddToCart({product}: Props) {
  const [size, setSize] = useState< Size|undefined >();
  return (
    <>
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        OnSizeChanged={setSize}
      />

      <QuantitySelector quantity={2} />

      <button className="btn-primary my-5">Agregar Al Carrito</button>
    </>
  );
}
