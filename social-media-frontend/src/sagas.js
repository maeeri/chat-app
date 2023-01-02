import { takeEvery } from 'redux-saga/effects'
import { addChatMessage, addOnlineUser, removeOnlineUser } from 'features/chat/chatSlice'

export const handleNewMessage = function* handleNewMessage(params) {
  yield takeEvery(addChatMessage, (action) => {
    params.socket.send(JSON.stringify(action))
  })
}

export const handleNewOnlineUser = function* handleNewOnlineUser(params) {
  yield takeEvery(addOnlineUser, (action) => {
    params.socket.send(JSON.stringify(action))
  })
}

export const handleRemoveOnlineUser = function* handleRemoveOnlineUser(params) {
  yield takeEvery(removeOnlineUser, action => {
    params.socket.send(JSON.stringify(action))
  })
}
