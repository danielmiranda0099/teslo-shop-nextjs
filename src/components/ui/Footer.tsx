import { titleFont } from "@/fonts-next/fonts";
import Link from "next/link";

export function Footer() {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/" className="mx-3">
        <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
        <span>| Shop</span>
        <span>© { new Date().getFullYear() }</span>
      </Link>

      <Link href="/" className="mx-3">Privacidad Y Legal</Link>

      <Link href="/" className="mx-3">Ubicaciones</Link>
    </div>
  )
}
