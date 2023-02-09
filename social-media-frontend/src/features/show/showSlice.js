import { createSlice } from '@reduxjs/toolkit'
import { addUser } from 'features/chat/chatSlice'

const showSlice = createSlice({
  name: 'show',
  initialState: { signin: false, signup: false, chat: false },
  reducers: {
    setShowSignIn(state, action) {
      return {
        ...state,
        signin: action.payload,
      }
    },
    setShowSignUp(state, action) {
      return {
        ...state,
        signup: action.payload,
      }
    },
    setShowChat(state, action) {
      return {
        ...state,
        chat: action.payload,
      }
    },
  },
})

export const toggleShowSignIn = (show) => {
  return (dispatch) => {
    dispatch(setShowSignIn(show))
  }
}

export const toggleShowSignUp = (show) => {
  return (dispatch) => {
    dispatch(setShowSignUp(show))
  }
}

export const toggleShowChat = (show) => {
  return (dispatch) => {
    dispatch(setShowChat(show))
  }
}

export const { setShowSignIn, setShowSignUp, setShowChat } =
  showSlice.actions
export default showSlice.reducer
