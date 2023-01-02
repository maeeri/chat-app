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

    /*eslint-disable*/
    switch (data.type) {
      case 'chat/addOnlineUser': {
        index = users.length
        const user = data.payload
        if (!users.length === 0 || users.every((u) => u.id !== user.id)) {
          users.push(user)
          ws.send(
            JSON.stringify({ type: 'chat/setOnlineUsers', payload: users })
          )
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
      case 'chat/removeOnlineUser': {
        const user = data.payload

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
      default:
        break
    }
    /*eslint-enable*/
  })

  //   ws.on('close', () => {
  //     users.slice(index, 1)
  //     broadcast(
  //       {
  //         type: 'chat/setOnlineUsers',
  //         payload: users,
  //       },
  //       ws
  //     )
  //   })
})

module.exports = wss
