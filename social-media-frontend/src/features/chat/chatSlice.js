import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  onlineUsers: [],
  messages: [],
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    setChatMessages(state, action) {
      return {
        ...state,
        messages: action.payload,
      }
    },
    addChatMessage(state, action) {
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      }
    },
    setOnlineUsers(state, action) {
      return {
        ...state,
        onlineUsers: action.payload,
      }
    },
    addOnlineUser(state, action) {
      if (
        !state.onlineUsers ||
        state.onlineUsers.every((u) => u.id !== action.payload.id)
      ) {
        const onlineUsers =
          state.onlineUsers === undefined
            ? action.payload
            : action.payload
            ? state.onlineUsers.concat(action.payload)
            : state
        return {
          ...state,
          onlineUsers: onlineUsers,
        }
      } else {
        return state
      }
    },
    removeOnlineUser(state, action) {
      return {
        ...state,
        onlineUsers: state.onlineUsers.filter((u) => u !== action.payload),
      }
    },
    userLeft(state, action) {
      return {
        ...state,
        onlineUsers: action.payload
          ? state.onlineUsers.filter((u) => u.id !== action.payload.id)
          : state.onlineUsers,
      }
    },
    messageReceived(state, action) {
      return state.messages.every((m) => m.id !== action.payload.id)
        ? {
            ...state,
            messages: state.messages.concat(action.payload),
          }
        : state
    },
    getMessages(state, action) {
      return state
    },
  },
})

export const sendMessage = (message) => {
  return async (dispatch) => {
    return dispatch(addChatMessage(message))
  }
}

export const addUser = (user) => {
  return async (dispatch) => {
    return dispatch(addOnlineUser(user))
  }
}

export const removeUser = (user) => {
  return (dispatch) => {
    return dispatch(removeOnlineUser(user))
  }
}

export const getNewMessages = () => {
  return (dispatch) => {
    return dispatch(getMessages())
  }
}

export const {
  setChatMessages,
  addChatMessage,
  setOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  getMessages,
  messageReceived,
  userLeft,
} = chatSlice.actions
export default chatSlice.reducer
