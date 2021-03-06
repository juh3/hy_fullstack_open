const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if(password.length <= 2){
    return response.status(400).json({error: 'Password needs to have atleast 3 letters'})
  }
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  if (savedUser){
    response.status(201).json(savedUser)
  }else{
    response.status(400).json({error: 'Username has to be atleast 3 letters long'})
  }

})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {title: 1, author: 1})
  response.json(users)
})

module.exports = usersRouter