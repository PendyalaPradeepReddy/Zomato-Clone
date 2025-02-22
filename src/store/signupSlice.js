import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  signUpModalOpen: false
}

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    toggleSignupModal: (state) => {
      state.signUpModalOpen = !state.signUpModalOpen
    }
  }
})


export default signupSlice.reducer

export const { toggleSignupModal } = signupSlice.actions