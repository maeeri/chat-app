import { createSlice } from '@reduxjs/toolkit'

const showSlice = createSlice({
  name: 'show',
  initialState: { signin: false, signup: false, chat: false, sidebar: false },
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
    setShowSidebar(state, action) {
      return {
        ...state,
        sidebar: action.payload,
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

export const toggleShowSidebar = (show) => {
  return (dispatch) => {
    dispatch(setShowSidebar(show))
  }
}

export const { setShowSignIn, setShowSignUp, setShowChat, setShowSidebar } =
  showSlice.actions
export default showSlice.reducer
