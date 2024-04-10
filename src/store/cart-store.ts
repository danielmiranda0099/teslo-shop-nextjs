import { CartInProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartInProduct[];

  addProductToCart: (product: CartInProduct) => void;
}

export const useCartStore = create<State>()(
  
  persist(
    (set, get) => (
      {
        cart: [],

        // ----------------------------
        addProductToCart: (product: CartInProduct) => {
          const { cart } = get();
  
          const productInCart = cart.some(
            (item) => (item.id === product.id && item.size === product.size)
          );
  
          if(!productInCart){
            set({cart: [...cart, product]})
            return;
          }
  
          const updatedCartProducts = cart.map(
            (item) => {
              if (item.id === product.id && item.size === product.size) {
                return { ...item, quantity: item.quantity + product.quantity}
              }
              return item;
            }
          );
  
          set( {cart: updatedCartProducts});
        }
      }
    )
    ,
    {
      name: "shopping-cart"
    }
  )
);