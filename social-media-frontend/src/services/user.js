import axios from 'axios'

const baseUrl = 'http://localhost:5000/api/users'

const setToken = (newToken) => {
  return `bearer ${newToken}`
}

const setConfig = (newToken) => {
  const config = {
    headers: { Authorization: setToken(newToken) },
  }
  return config
}

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOneUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const createUser = async (username, password, name, role) => {
  const response = await axios.post(baseUrl, {
    username: username,
    password: password,
    name: name,
    role: role || 'user',
  })
  return response.data
}

const editUserRole = async (id, role, newToken) => {
  const response = await axios.put(
    `${baseUrl}/${id}/role`,
    {
      role: role,
    },
    setConfig(newToken)
  )
  return response.data
}

const changeProfilePicture = async (id, url, newToken) => {
  const response = await axios.put(
    `${baseUrl}/${id}/profilePicture`,
    {
      profilePicture: url,
    },
    setConfig(newToken)
  )
  return response.data
}

const addFriend = async (friendId, newToken) => {
  const response = await axios.put(
    `${baseUrl}/${friendId}/befriend`,
    {},
    setConfig(newToken)
  )
  return response.data
}

const removeFriend = async (friendId, newToken) => {
  const response = await axios.put(
    `${baseUrl}/${friendId}/unfriend`,
    {},
    setConfig(newToken)
  )
  return response.data
}

const deleteUser = async (toBeDeletedId, newToken) => {
  const response = await axios.delete(
    `${baseUrl}/${toBeDeletedId}`,
    setConfig(newToken)
  )
  return response.data
}

export {
  getUsers,
  getOneUser,
  createUser,
  editUserRole,
  changeProfilePicture,
  addFriend,
  deleteUser,
  removeFriend
}
