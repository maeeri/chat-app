import { createSlice } from '@reduxjs/toolkit'
import { getUsers, deleteUser } from 'services/user'

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    },
    removeUserFromAllUsers(state, action) {
      return [state.filter((u) => u.id !== action.payload)]
    },
  },
})

export const { setAllUsers, removeUserFromAllUsers } = allUsersSlice.actions

export const initializeAllUsers = () => {
  return async (dispatch) => {
    const users = await getUsers()
    return dispatch(setAllUsers(users))
  }
}

export const deleteUserFromDb = (toBeDeletedId, token) => {
  return async (dispatch) => {
    await deleteUser(toBeDeletedId, token)
    return await dispatch(removeUserFromAllUsers(toBeDeletedId))
  }
}

export default allUsersSlice.reducer
