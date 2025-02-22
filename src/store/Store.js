import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import signupSlice from "./signupSlice";
const store = configureStore({
  reducer: {
    login: LoginSlice,
    signup: signupSlice,
    auth: authSlice,
    cart: cartSlice
  }
})

export default store