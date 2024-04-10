import type { Size } from "@/interfaces";
import clsx from "clsx";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];
  OnSizeChanged: (size: Size) => void;
  isErrorSelectedSize: boolean;
}

export function SizeSelector({ selectedSize, availableSizes, OnSizeChanged, isErrorSelectedSize }: Props) {
  return (
    <div className="my-5">
      <h3 className="font-bold mb-4">Tallas Disponibles</h3>

      <div className="flex mb-2">
        {availableSizes.map((size) => (
          <button 
            onClick={() => OnSizeChanged(size)}
            className={
              clsx(
                "mx-2 hover:underline text-lg",
                {
                  'underline': size === selectedSize
                }
              )
            } 
            key={size}
          >
            {size}
          </button>
        ))}
      </div>

      {
        isErrorSelectedSize && <span className="text-red-950 bg-red-300 p-2 rounded-md fade-in">Debe Seleccionar Una Talla *</span>
      }
    </div>
  );
}
