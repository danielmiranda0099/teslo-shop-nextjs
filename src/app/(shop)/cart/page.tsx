import { QuantitySelector } from "@/components/products";
import { Title } from "@/components/ui";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const PRODUCTS_IN_CART = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

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

            {PRODUCTS_IN_CART.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mr-5 rounded"
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                />

                <div>
                  <p>{product.title}</p>
                  <p>${product.price}</p>

                  <QuantitySelector quantity={1} />

                  <button className="underline mt-3">Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen De Orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 Artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 100</span>
            </div>

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
