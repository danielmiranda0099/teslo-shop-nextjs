'use client';
import { GetStockBySlug } from "@/actions/product";
import { titleFont } from "@/fonts-next/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export function StockLabel({ slug }: Props) {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true)

  const GetStock = async () => {
    const stock = await GetStockBySlug(slug);
    setStock(stock);
    setIsLoading(false);
  }

  useEffect(() => {
    GetStock();
  }, [])

  if(isLoading) return <Skeleton />

  return (
    <h1 className={`${titleFont.className} antialiased font-bold text-md`}>
      Stock: { stock }
    </h1>
  )
}

function Skeleton() {
  return(
    <h1 className={`${titleFont.className} antialiased font-bold text-md bg-gray-200 animate-pulse`}>
      &nbsp;
    </h1>
  )
}
