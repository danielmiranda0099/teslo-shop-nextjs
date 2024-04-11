import { CartInProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartInProduct[];
  getTotalItems: () => number;
  getSummaryOrden: () => {
    subTotal: number;
    tax: number;
    total: number;
    totalItemsInCart: number;
  };
  addProductToCart: (product: CartInProduct) => void;
  updateProductQuantity: (product: CartInProduct, quantity: number) => void;
  removeProduct: (product: CartInProduct) => void;
}

export const useCartStore = create<State>()(
  
  persist(
    (set, get) => (
      {
        cart: [],

        // ----------------------------
        getTotalItems: () => {
          const { cart } = get();
          return cart.reduce( (total, item) => total + item.quantity , 0);
        },

        // ----------------------------
        getSummaryOrden: () => {
          const { cart } = get();

          const subTotal = cart.reduce( 
            (subTotal, product) => (product.quantity * product.price) + subTotal
            , 0)
          const tax = subTotal * 0.15;
          const total = subTotal + tax;
          const totalItemsInCart = cart.reduce( (total, item) => total + item.quantity , 0);

          return {
            subTotal,
            tax,
            total,
            totalItemsInCart,
          }
        },

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
        },

        //---------------------------------
        updateProductQuantity: (product: CartInProduct, quantity: number) => {
          const {cart} = get();

          const updatedCartProducts = cart.map( item => {
            if(item.id === product.id && item.size === product.size){
              return {...item, quantity: quantity}
            }
            return item;
          })

          set({cart: updatedCartProducts});
        },

        //---------------------------------
        removeProduct: (product: CartInProduct) => {
          const { cart } = get();

          const updateCartProducts = cart.filter(
            (item) => item.id !== product.id || item.size !== product.size
          );

          set({cart: updateCartProducts});
        },
      }
    )
    ,
    {
      name: "shopping-cart"
    }
  )
);
