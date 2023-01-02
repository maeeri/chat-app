import { createSlice } from '@reduxjs/toolkit'
import { initializeAllUsers } from 'features/allUsers/allUsersSlice'
import {
  getOneUser,
  editUserRole,
  changeProfilePicture,
  addFriend,
  removeFriend,
} from 'services/user'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    name: '',
    favouritePokemon: [],
    pendingRequests: [],
    sentRequests: [],
    friends: [],
  },
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    setProfilePicture(state, action) {
      return {
        ...state,
        profilePicture: action.payload,
      }
    },
    setUserRole(state, action) {
      return {
        ...state,
        role: action.payload,
      }
    },
    setAddFriend(state, action) {
      return {
        ...state,
        friends: state.friends.concat(action.payload),
      }
    },
    setAddSentRequest(state, action) {
      return {
        ...state,
        sentRequests: state.sentRequests.concat(action.payload),
      }
    },
    setRemoveFriend(state, action) {
      return {
        ...state,
        friends: state.friends.filter((f) => f !== action.payload),
      }
    },
  },
})

export const addUserToState = (id) => {
  return async (dispatch) => {
    const user = await getOneUser(id)
    return await dispatch(setUser(user))
  }
}

export const removeUserFromState = () => {
  return (dispatch) => {
    return dispatch(setUser({}))
  }
}

export const addProfilePictureToState = (id, url, token) => {
  return async (dispatch) => {
    await changeProfilePicture(id, url, token)
    return dispatch(setProfilePicture(url))
  }
}

export const changeUserRole = (id, role, token) => {
  return async (dispatch) => {
    await editUserRole(id, role, token)
    return await dispatch(setUserRole(role))
  }
}

export const acceptFriendRequest = (friendId, token) => {
  return async (dispatch) => {
    await addFriend(friendId, token)
    return await dispatch(setAddFriend(friendId))
  }
}

export const addFriendRequest = (friendId, token) => {
  return async (dispatch) => {
    await addFriend(friendId, token)
    return await dispatch(setAddSentRequest(friendId))
  }
}

export const removeConnection = (friendId, token) => {
  return async (dispatch) => {
    await removeFriend(friendId, token)
    await dispatch(initializeAllUsers())
    return await dispatch(setRemoveFriend(friendId))
  }
}

export default userSlice.reducer
export const {
  setUser,
  setProfilePicture,
  setUserRole,
  setAddFriend,
  setRemoveFriend,
  setAddSentRequest,
} = userSlice.actions
