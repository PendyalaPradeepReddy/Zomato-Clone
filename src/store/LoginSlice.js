import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  modalIsOpen: false
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    toggleModal: (state) => {
      state.modalIsOpen = !state.modalIsOpen;
    }
  }
})

export default loginSlice.reducer

export const { toggleModal } = loginSlice.actions