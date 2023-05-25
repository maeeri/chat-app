import { takeEvery } from 'redux-saga/effects'
import {
  addChatMessage,
  addOnlineUser,
  removeOnlineUser,
} from 'features/chat/chatSlice'

const waitForOpenSocket = (socket) => {
  return new Promise((resolve) => {
    if (socket.readyState !== socket.OPEN) {
      socket.addEventListener('open', (_) => {
        resolve()
      })
    } else {
      resolve()
    }
  })
}

async function sendMessage(socket, msg) {
  await waitForOpenSocket(socket)
  socket.send(msg)
}

export const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(addChatMessage, (action) => {
    sendMessage(params.socket, JSON.stringify(action))
  })
}

export const handleNewOnlineUser = function* handleNewOnlineUser(params) {
  yield takeEvery(addOnlineUser, (action) => {
    sendMessage(params.socket, JSON.stringify(action))
  })
}

export const handleRemoveOnlineUser = function* handleRemoveOnlineUser(params) {
  yield takeEvery(removeOnlineUser, (action) => {
    sendMessage(params.socket, JSON.stringify(action))
  })
}
