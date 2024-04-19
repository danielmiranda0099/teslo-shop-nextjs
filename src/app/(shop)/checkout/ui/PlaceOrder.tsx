'use client'

import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Link from "next/link"
import { useEffect, useState } from "react"

export function PlaceOrder() {
  const [isLoaded, setIsLoaded] = useState(false);

  const address = useAddressStore( state => state.address);
  const {subTotal, tax, total, totalItemsInCart} = useCartStore( state => state.getSummaryOrden());



  useEffect( () => {
    setIsLoaded(true);
  }, []);

  if(!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
    <h2 className="text-2xl mb-2">Dirección De Entrega</h2>
    <div className="mb-10">
      <p>{address.firstName} {address.lastName}</p>
      <p>{address.address}</p>
      <p>{address.address2}</p>
      <p>{address.postalCode}</p>
      <p>{address.city}, {address.country}</p>
      <p>{address.phone}</p>
    </div>

    <div className="w-full h-0.5 rounded bg-gray-200 mb-10"></div>

    <h2 className="text-2xl mb-2">Resumen De Orden</h2>

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

    <div className="mt-5 mb-2 w-full">
      <div>
        <p className="mb-5">
          <span className="text-xs">
            Al Hacer Click En "Hacer Orden", Aceptas nuestros{" "}
            <Link href="/" className="underline">
              Terminos Y Condiciones
            </Link>
            Y
            <Link href="/" className="underline">
              Politicas De Privacidad
            </Link>
          </span>
        </p>
      </div>

      <button 
      // href="/orders/123" 
      className="flex btn-primary">
        Hacer Orden
      </button>
    </div>
  </div>
  )
}
