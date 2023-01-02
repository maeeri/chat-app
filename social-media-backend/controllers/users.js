const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const logger = require('../utils/logger')
const { userExtractor } = require('../utils/middleware')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id)
  res.json(user)
})

usersRouter.post('/', async (req, res) => {
  const { username, password, name, role } = req.body

  const usernames = (await User.find({})).map((user) => user.username)
  if (usernames.includes(username)) {
    res.status(400).end()
  } else {
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) return logger.error(err)

      const user = new User({
        username: username,
        password: hash,
        name: name,
        role: role,
      })
      const savedUser = await user.save()

      res.status(201).json(savedUser)
    })
  }
})

usersRouter.put('/:id/profilePicture', userExtractor, async (req, res) => {
  const { profilePicture } = req.body

  const user = req.user

  user.profilePicture =
    profilePicture === undefined ? user.profilePicture : profilePicture

  updateAndRespond(res, req.params.id, user)
})

usersRouter.put('/:id/password', userExtractor, async (req, res) => {
  const { password } = req.params.body
  const user = req.user

  if (await bcrypt.compare(password, user.password)) {
    await bcrypt.hash(password, 10, async (err, hash) => {
      if (err) console.log(err.message)
      user.password = hash
      updateAndRespond(res, req.params.id, user)
    })
  } else {
    res.status(401)
  }
})

usersRouter.put('/:id/role', userExtractor, async (req, res) => {
  const modifier = req.user

  if (modifier.role === 'admin') {
    const { role } = req.body
    const user = await User.findById(req.params.id)
    user.role = role === undefined ? user.role : role
    updateAndRespond(res, req.params.id, user)
  } else {
    res.status(401).end()
  }
})

usersRouter.put('/:id/befriend', userExtractor, async (req, res) => {
  const user = req.user
  const friend = await User.findById(req.params.id)

  logger.info(user, friend)

  if (!user.pendingRequests || user.pendingRequests.includes(friend.id)) {
    user.friends.push(friend)
    user.pendingRequests.remove(friend)
    friend.friends.push(user)
    friend.sentRequests.remove(user)
  } else if (!friend.pendingRequests.includes(user.id)) {
    friend.pendingRequests.push(user)
    user.sentRequests.push(friend)
  }
  await User.findByIdAndUpdate(friend.id, friend, { new: true })
  await updateAndRespond(res, user.id, user)
})

usersRouter.put('/:id/unfriend', userExtractor, async (req, res) => {
  const user = req.user
  const friend = await User.findById(req.params.id)

  user.friends.indexOf(friend.id) > -1
    ? user.friends.splice(user.friends.indexOf(friend.id), 1)
    : user.friends
  friend.friends.indexOf(user.id) > -1
    ? friend.friends.splice(friend.friends.indexOf(user.id, 1))
    : friend.friends

  await User.findByIdAndUpdate(friend.id, friend, { new: true })
  await updateAndRespond(res, user.id, user)
})

usersRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const userToBeDeleted = await User.findById(req.params.id)

  if (user.role !== 'admin' && user.id !== userToBeDeleted.id) {
    res.status(401).end()
  }

  await User.deleteOne(userToBeDeleted)
  res.status(204).end()
})

const updateAndRespond = async (res, id, user) => {
  const updatedUser = await User.findByIdAndUpdate(id, user, { new: true })
  res.json(updatedUser)
}

module.exports = usersRouter
