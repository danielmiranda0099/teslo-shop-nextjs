'use client'
import Link from "next/link";
 
import { titleFont } from "@/fonts-next/fonts";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { useCartStore, useUI } from "@/store";
import { useEffect, useState } from "react";

export function TopMenu() {
  const OpenSideMenu = useUI((state) => state.OpenSideMenu);
  const totalItemsInCart = useCartStore( state => state.getTotalItems());

  const [isloadedComponent, setIsloadedComponent] = useState(false);

  useEffect(() => {
    setIsloadedComponent(true);
  }, [])
  

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${titleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link href="/gender/men" className="m-2 p-2 rounded-md transition-colors hover:bg-gray-100">Hombres</Link>
        <Link href="/gender/women" className="m-2 p-2 rounded-md transition-colors hover:bg-gray-100">Mujeres</Link>
        <Link href="/gender/kid" className="m-2 p-2 rounded-md transition-colors hover:bg-gray-100">Niños</Link>
      </div>

      <div className="flex items-center">
        <Link href="/searh" className="mx-2">
          <IoSearchOutline className="w-5 h-5" />
        </Link>

        <Link href="/cart" className="mx-2">
          <div className="relative">
            {
              (isloadedComponent && totalItemsInCart > 0)  && <span className="absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white">{totalItemsInCart}</span>
            }
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button 
        onClick={ () => OpenSideMenu()}
        className="m-2 p-2 rounded-md transition-colors hover:bg-gray-100">
          Menú
        </button>
      </div>
    </nav>
  );
}
