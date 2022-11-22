const crypto = require('crypto')
const sequelize = require('../database/database.js')
const User = sequelize.models.user
const { Octokit } = require('octokit')
const jwt = require('jsonwebtoken')

// Create and Save a new user
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.user_password) {
    res.status(400).send({
      message: 'user or password can not be empty!'
    })
    return
  }
  const user = ({
    username: req.body.username,
    password: req.body.user_password
  })
  try {
    const existing = await User.findAll({
      where: {
        username: user.username
      }
    })
    console.log(existing)
    if (existing.length > 0) {
      res.status(505).send({ message: 'Already exists' })
      return
    } else {
      const hash = crypto.createHash('sha256').update(user.password).digest('hex')
      console.log(hash)
      user.password = hash
      User.create(user)
      res.status(201).send({ message: 'Created', data: req.body, status: 201 })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

// Find a single user with username
exports.findOne = async (req, res) => {
  if (!req.params.username) {
    res.status(400).send({
      message: 'username can not be empty!'
    })
    return
  }
  const username_query = req.params.username
  try {
    const user = await User.findOne({
      where: {
        username: username_query
      }
    })
    res.status(200).send(user)
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.login = async (req, res) => {
  if (!req.body.username || !req.body.user_password) {
    res.status(400).send({
      message: 'username or password can not be empty!'

    })
    return
  }
  try {
    console.log('usr = ' + req.body.username + ' pass=' + req.body.user_password)
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (user == null) {
      res.status(404).send({ message: 'No existe usuario' })
      return
    } else {
      const hash = crypto.createHash('sha256').update(req.body.user_password).digest('hex')
      if (user.password === hash) {
      // crear token, guardarlo, etc, etc
        const token_res = createToken(user)
        res.status(200).send({ message: 'ok', data: user, token: token_res })
        return
      } else {
        res.status(500).send({ message: 'Wrong password' })
        return
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.getJwtFromOauthGithubToken = async (req, res) => {
  if (!req.params.access_token) {
    res.status(400).send({ message: 'access_token can not be empty!' })
    return
  }
  console.log('Tengo un token de oauth, intento obtener info del usuario de github')
  const oauth_token = req.params.access_token
  try {
    const octokit = new Octokit({ auth: oauth_token })
    const github_username = ((await octokit.request('GET /user', {})).data.login)

    // verificar si el usuario ya existe
    const existing_user = await User.findOne({
      where: {
        username: github_username
      }
    })
    if (existing_user == null) {
      const user_person_name = ((await octokit.request('GET /user', {})).data.name)
      let user_new = ({
        username: github_username,
        name: user_person_name,
        used_oauth: true
      })
      await User.create(user_new)
      user_new = await User.findOne({
        where: {
          username: github_username
        }
      })
      const jwt_token = createToken(user_new)
      res.status(200).send({ message: 'ok', data: user_new, token: jwt_token })
      return
    } else {
      // Existe un usuario con este nombre
      if (existing_user.used_oauth === true) {
        // Este usuario utiliza oauth
        const jwt_token = createToken(existing_user)
        res.status(200).send({ message: 'ok', data: existing_user, token: jwt_token })
        return
      } else {
        // Para evitar que un usuario con un nombre igual a otro existente en la bd lo pise
        // con el que esta usando oauth - Este usuario no usa oauth
        res.status(404).send({ message: 'No existe el usuario' })
        return
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.findMe = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: 'juan9889'
    }

  })
  res.status(200).send({ data: user })
}

function createToken (user) {
  const token = jwt.sign({
    name: user.name,
    id: user.id
  }, 'secreto_para_hacer_tokens_asdfgh')
  return token
}
