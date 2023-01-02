import { createSlice } from '@reduxjs/toolkit'

const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState: '',
  reducers: {
    setSearchTerm(state, action) {
      return action.payload
    },
  },
})

export const setSearch = (query) => {
  return async (dispatch) => {
    return dispatch(setSearchTerm(query))
  }
}

export const { setSearchTerm } = searchTermSlice.actions
export default searchTermSlice.reducer
