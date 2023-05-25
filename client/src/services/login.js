import axios from 'axios'

let location = document.location
let baseUrl = `${location.protocol}//${location.hostname}:8080/api/login`

const login = async (creds) => {
  const response = await axios.post(`${baseUrl}`, creds)
  return response.data
}

export { login }
