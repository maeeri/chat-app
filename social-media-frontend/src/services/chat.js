import {
  messageReceived,
  setOnlineUsers,
  userLeft,
} from 'features/chat/chatSlice'

const setupSocket = (dispatch) => {
  const socket = new WebSocket('ws://localhost:8989')

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    switch (data.type) {
      case 'chat/setOnlineUsers':
        dispatch(setOnlineUsers(data.payload))
        break
      case 'chat/messageReceived':
        dispatch(messageReceived(data.payload))
        break
      case 'chat/userLeft':
        dispatch(userLeft(data.payload))
        break
      default:
        break
    }
  }

  return socket
}

export default setupSocket
