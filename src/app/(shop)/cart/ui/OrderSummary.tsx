"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";

export function OrderSummary() {
  const [isLoadedComponent, setIsLoadedComponent] = useState(false);

  const {subTotal, tax, total, totalItemsInCart} = useCartStore( state => state.getSummaryOrden());

  useEffect(() => {
    setIsLoadedComponent(true);
  }, [])

  if(!isLoadedComponent) return <p>Loading...</p>

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{totalItemsInCart} {totalItemsInCart > 1 ? 'Artículos': 'Artículo'}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
}
