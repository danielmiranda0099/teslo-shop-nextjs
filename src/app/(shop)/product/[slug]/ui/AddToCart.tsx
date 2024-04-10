"use client";

import { QuantitySelector, SizeSelector } from "@/components/products";
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: Product;
}

export function AddToCart({ product }: Props) {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isErrorSelectedSize, setIsErrorSelectedSize] = useState(false);

  const AddProductToCart = () => {
    if (!size) {
      setIsErrorSelectedSize(true);
      return;
    }

    setIsErrorSelectedSize(false);
    console.log({ size, quantity });
  };

  return (
    <>
      <SizeSelector
        availableSizes={product.sizes}
        selectedSize={size}
        OnSizeChanged={setSize}
        isErrorSelectedSize={isErrorSelectedSize}
      />

      <QuantitySelector quantity={quantity} OnQuantityChanged={setQuantity} />

      <button onClick={AddProductToCart} className="btn-primary my-5">
        Agregar Al Carrito
      </button>
    </>
  );
}
