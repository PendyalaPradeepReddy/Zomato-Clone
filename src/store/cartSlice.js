import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  cartItem: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  totalQuantity: 0,
  showCart: true
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {

      const newItem = {
        id: nanoid(),
        price: action.payload.price,
        quantity: 1,
        totalPrice: action.payload.price,
        name: action.payload.foodName,
        featuredImageId: action.payload.featuredImageId
      }

      state.cartItem.push(newItem)
      state.totalQuantity += 1
      localStorage.setItem("cartItems", JSON.stringify(state.cartItem));
    },

    removeFromCart: (state, action) => {
      state.cartItem = state.cartItem.filter((item) => item.id !== action.payload)
      const updateCartItems = JSON.parse(localStorage.getItem("cartItems")).filter((item) => item.id !== action.payload)
      localStorage.setItem("cartItems", JSON.stringify(updateCartItems))
    }
  }
})

export const { addToCart, removeFromCart } = cartSlice.actions //to extract all store function
export default cartSlice.reducer
