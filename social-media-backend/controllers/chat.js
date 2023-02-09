/*eslint-disable*/
const WebSocket = require('ws')

const logger = require('../utils/logger')

//create websocket server for chat
const wss = new WebSocket.Server({ port: 8989 })

//configure websocket server
const users = []

const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}

wss.on('connection', (ws) => {
  logger.info('websocket server running')

  ws.on('message', (message) => {
    const data = JSON.parse(message)
    logger.info(data)
    switch (data.type) {
      case 'chat/addOnlineUser': {
        index = users.length
        const user = data.payload

        if (users.every((u) => u.id !== user.id)) {
          users.push(user)
          ws.send(
            JSON.stringify({ type: 'chat/setOnlineUsers', payload: users })
          )
          broadcast({ type: 'chat/setOnlineUsers', payload: users }, ws)
        } else {
          broadcast({ type: 'chat/setOnlineUsers', payload: users }, ws)
        }

        break
      }
      case 'chat/addChatMessage': {
        const now = new Date()
        ws.send(
          JSON.stringify(
            {
              type: 'chat/messageReceived',
              payload: {
                id: data.payload.id,
                content: data.payload.content,
                username: data.payload.username,
                timecode: now.toLocaleString('en-UK'),
                avatar: data.payload.avatar,
              },
            },
            ws
          )
        )
        broadcast(
          {
            type: 'chat/messageReceived',
            payload: {
              id: data.payload.id,
              content: data.payload.content,
              username: data.payload.username,
              timecode: now.toLocaleString('en-UK'),
              avatar: data.payload.avatar,
            },
          },
          ws
        )
        break
      }
      case 'chat/removeOnlineUser':
        {
          const user = users.find((u) => u.id === data.payload.id)
          const index = users.indexOf(user)
          console.log(users, user, index)
          if (index > -1) users.splice(index, 1)
          ws.send(
            JSON.stringify(
              {
                type: 'chat/userLeft',
                payload: user,
              },
              ws
            )
          )

          broadcast(
            {
              type: 'chat/userLeft',
              payload: user,
            },
            ws
          )
        }
        break
      default:
        break
    }
  })
})

module.exports = wss
/*eslint-enable*/
