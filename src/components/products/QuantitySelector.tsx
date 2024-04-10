import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  OnQuantityChanged: (quantity: number) => void,
}

export function QuantitySelector({ quantity, OnQuantityChanged }: Props) {
  

  const OnQuantityValue = (value: number) => {
    if( (quantity + value) < 1) return;
    
    OnQuantityChanged(quantity + value);
  }

  return (
    <div className="flex">
      <button
        onClick={() => OnQuantityValue(-1)}
      >
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-200 text-center rounded">{quantity}</span>

      <button
        onClick={() => OnQuantityValue(1)}
      >
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
