import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: null,
  token: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
    setToken: (state, action) => {
      state.token = action.payload.user
    },
    setAll: (state, action) => {
      state.token = action.payload.token
      state.name = action.payload.user
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUser, setAll, setToken } = userSlice.actions

export default userSlice.reducer
