'use server'
import { Title } from "@/components/ui";
import Link from "next/link";
import { PlaceOrder, ProductsInCart } from "./ui";



export default async function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar Elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar Carrito
            </Link>

            <ProductsInCart />
          </div>

          <PlaceOrder />         
        </div>
      </div>
    </div>
  );
}
