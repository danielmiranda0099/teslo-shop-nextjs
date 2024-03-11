'use client';
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export function QuantitySelector({ quantity }: Props) {
  const [count, setCount] = useState(quantity)

  const OnQuantityChange = (value: number) => {
    if( (count + value) < 1) return;
    
    setCount(count + value);
  }

  return (
    <div className="flex">
      <button
        onClick={() => OnQuantityChange(-1)}
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">{count}</span>

      <button
        onClick={() => OnQuantityChange(1)}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
