import { createSlice } from '@reduxjs/toolkit'

const tokenSlice = createSlice({
  name: 'token',
  initialState: '',
  reducers: {
    setToken(state, action) {
      return action.payload
    }
  },
})

export const addTokenToState = (token) => {
  return async (dispatch) => {
    return dispatch(setToken(token))
  }
}


export const { setToken } = tokenSlice.actions
export default tokenSlice.reducer
