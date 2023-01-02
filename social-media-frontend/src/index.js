import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'app/App'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store, { sagaMiddleware } from 'app/store'
import 'index.css'
import setupSocket from 'services/chat'
import {
  handleNewMessage,
  handleNewOnlineUser,
  handleRemoveOnlineUser,
} from 'sagas'

const socket = setupSocket(store.dispatch)

sagaMiddleware.run(handleNewMessage, { socket })
sagaMiddleware.run(handleNewOnlineUser, { socket })
sagaMiddleware.run(handleRemoveOnlineUser, { socket })

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
