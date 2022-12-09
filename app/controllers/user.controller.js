const crypto = require('crypto')
const sequelize = require('../database/database.js')
const User = sequelize.models.user
const { Octokit } = require('octokit')
const jwt = require('jsonwebtoken')

// Create and Save a new user
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password || !req.body.name || !req.body.mail || !req.body.cityId) {
    res.status(400).send({
      message: 'User need to be complete'
    })
    return
  }
  const user = ({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    mail: req.body.mail,
    cityId: req.body.cityId
  })
  try {
    const existing = await User.findOne({
      where: {
        username: user.username
      }
    })
    if (existing != null) {
      res.status(505).send({ message: 'El usuario ya existe' })
      return
    } else {
      const hash = crypto.createHash('sha256').update(user.password).digest('hex')
      console.log(hash)
      user.password = hash
      User.create(user)
      res.status(201).send(user)
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.update = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.name || !req.body.mail || !req.body.cityId) {
    res.status(400).send({
      message: 'User need to be complete'
    })
    return
  }
  try {
    const id = req.params.id
    const updateUser = await User.update(req.body, {
      where: { id }
    })
    if (updateUser === 1) {
      res.status(200).send({
        message: 'User was updated successfully.'
      })
    } else {
      res.status(502).send({
        message: `Cannot update User with id = ${id}.Maybe User was not found or req.body is empty!`
      })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}
// Find a single user with username
exports.findByUserName = async (req, res) => {
  try {
    if (!req.params.username) {
      res.status(400).send({
        message: 'username can not be empty!'
      })
      return
    }
    const username_query = req.params.username
    const user = await User.scope('find').findOne({
      where: {
        username: username_query
      }
    })
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ message: `Cannot find with id=${req.params.username}.` })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.findAll = async (req, res) => {
  try {
    const users = await User.scope('find').findAll()
    if (users) {
      res.status(200).send(users)
    } else {
      res.status(404).send({ message: 'Cannot find' })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.findEvents = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({
        message: 'user id can not be empty!'
      })
      return
    }
    const id = parseInt(req.params.id)
    const user = await User.scope('events').findByPk(id)
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ message: 'Cannot find' })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.findCommunities = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({
        message: 'user id can not be empty!'
      })
      return
    }
    const id = parseInt(req.params.id)
    const user = await User.scope('communities').findByPk(id)
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ message: 'Cannot find' })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.findOne = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({
        message: 'id can not be empty!'
      })
      return
    }
    const id = parseInt(req.params.id)
    const user = await User.scope('find').findByPk(id)
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).send({ message: `Cannot find with id=${req.params.id}.` })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.findOneInternal = async (username_query) => {
  const user = await User.scope('login_find').findOne({
    where: {
      username: username_query
    }
  })
  return user
}

exports.findMe = async (req, res) => {
  try {
    const id = req.user.id
    const user = await User.scope('find').findByPk(id)
    if (!user) {
      return res.json({ message: 'No user found' })
    }
    return res.json({ data: user })
  } catch (error) {
    return res.json({ error })
  }
}

exports.login = async (req, res) => {
  console.log(req.body)
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: 'Login need to be complete'

    })
    return
  }
  try {
    const user = await this.findOneInternal(req.body.username)
    if (user === null) {
      res.status(404).send({ message: 'No existe el usuario' })
      return
    } else {
      const hash = crypto.createHash('sha256').update(req.body.password).digest('hex')
      console.log('hash : ' + hash)
      console.log('dbhash : ' + user.password)
      if (user.password === hash) {
      // crear token, guardarlo, etc, etc
        const token_res = module.exports.createToken(user)
        // res.status(200).send({ data: user, token: token_res })
        res.send({ data: user, token: token_res })
        res.status(200)

        return
      } else {
        res.status(500)
        res.send({ message: 'Contraseña incorrecta' })

        return
      }
    }
  } catch (error) {
    res.status(500)
    res.send({ message: 'Server error' + error.message })
  }
}

exports.getJwtFromOauthGithubToken = async (req, res) => {
  if (!req.params.access_token) {
    res.status(400).send({
      message: 'access_token can not be empty!'
    })
    return
  }
  console.log('Tengo un token de oauth, intento obtener info del usuario de github')
  const oauth_token = req.params.access_token
  try {
    const octokit = new Octokit({
      auth: oauth_token
    })

    const github_username = ((await octokit.request('GET /user', {})).data.login)
    console.log(github_username)
    // verificar si el usuario ya existe
    const existing_user = await User.findOne({
      where: {
        username: github_username
      }
    })
    if (existing_user == null) {
      console.log('El usuario es nuevo')
      const user_person_name = ((await octokit.request('GET /user', {})).data.name)
      let user_new = ({
        username: github_username,
        name: user_person_name,
        usedOauth: true
      })
      await User.create(user_new)
      user_new = await User.findOne({
        where: {
          username: github_username
        }
      })
      const jwt_token = module.exports.createToken(user_new)
      res.status(200).send({ data: user_new, token: jwt_token })
      return
    } else {
      console.log('Existe un usuario con este nombre')
      if (existing_user.usedOauth === true) {
        console.log('Este usuario utiliza oauth')
        const jwt_token = module.exports.createToken(existing_user)
        res.status(200).send({ data: existing_user, token: jwt_token })
        return
      } else {
        // Para evitar que un usuario con un nombre igual a otro existente en la bd lo pise con el que esta usando oauth
        console.log('Este usuario no usa oauth')
        res.status(404).send({ message: 'No existe el usuario' })
        return
      }
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.createToken = (user) => {
  const token = jwt.sign({
    name: user.name,
    id: user.id,
    admin: user.admin
  }, 'secreto_para_hacer_tokens_asdfgh', {
    expiresIn: 36000
  })
  return token
}
