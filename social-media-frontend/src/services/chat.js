import {
  messageReceived,
  setOnlineUsers,
  userLeft,
} from 'features/chat/chatSlice'

const setupSocket = (dispatch) => {
  let location = document.location
  let scheme = 'ws'
  if (location.protocol === 'https:') {
    scheme += 's'
  }
  let serverUrl = `${scheme}://${location.hostname}:8989`
  const socket = new WebSocket(serverUrl)

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
