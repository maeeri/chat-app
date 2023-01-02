const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const logger = require('../utils/logger')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  user === null
    ? res.status(401).json({ error: 'invalid username' })
    : await bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(401).json({
          error: 'invalid username or password',
        })
      } else {
        const userForToken = {
          id: user._id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)
        res.status(201).send({
          token,
          id: user.id,
        })
      }
    })
})

module.exports = loginRouter
