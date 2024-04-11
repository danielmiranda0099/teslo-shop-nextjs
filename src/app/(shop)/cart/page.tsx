import { Title } from "@/components/ui";
import Link from "next/link";
import { OrderSummary, ProductInCart } from "./ui";


export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar Más Items</span>
            <Link href="/" className="underline mb-5">
              Continuar Comprando
            </Link>

            <ProductInCart />
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen De Orden</h2>

           <OrderSummary />

            <div className="mt-5 mb-2 w-full">
              <Link href="/checkout/address" className="flex btn-primary">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
