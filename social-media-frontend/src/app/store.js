import { configureStore } from '@reduxjs/toolkit'
import searchTermReducer from 'features/searchTerm/searchTermSlice'
import userReducer from 'features/user/userSlice'
import tokenReducer from 'features/token/tokenSlice'
import showReducer from 'features/show/showSlice'
import allUsersReducer from 'features/allUsers/allUsersSlice'
import chatReducer from 'features/chat/chatSlice'
import thunk from 'redux-thunk'
import createSagaMiddleware from '@redux-saga/core'

export const sagaMiddleware = createSagaMiddleware()

export default configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    user: userReducer,
    allUsers: allUsersReducer,
    token: tokenReducer,
    show: showReducer,
    chat: chatReducer,
  },
  middleware: [thunk, sagaMiddleware],
})
