"use client";

import { QuantitySelector, SizeSelector } from "@/components/products";
import { CartInProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}

export function AddToCart({ product }: Props) {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [isErrorSelectedSize, setIsErrorSelectedSize] = useState(false);

  const AddProductToCart = useCartStore( state => state.addProductToCart );

  const OnAddProductToCart = () => {
    if (!size) {
      setIsErrorSelectedSize(true);
      return;
    }

    setIsErrorSelectedSize(false);
    
    const cartProduct: CartInProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price:product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    AddProductToCart(cartProduct);

    setQuantity(1);
    setSize(undefined);
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

      <button onClick={OnAddProductToCart} className="btn-primary my-5">
        Agregar Al Carrito
      </button>
    </>
  );
}
