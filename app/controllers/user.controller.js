const crypto = require('crypto')
const sequelize = require('../database/database.js')
const User = sequelize.models.user
const {Octokit} = require('octokit')
const jwt = require('jsonwebtoken');

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
    user_password: req.body.user_password
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
      const hash = crypto.createHash('sha256').update(user.user_password).digest('hex')
      console.log(hash)
      user.user_password = hash
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
  console.log('GET')
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
  if (!req.params.username || !req.params.user_password) {
    res.status(400).send({
      message: 'username or password can not be empty!'

    })
    return
  }
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    })
    const hash = crypto.createHash('sha256').update(req.params.user_password).digest('hex')
    if (user.user_password === hash) {
      // crear token, guardarlo, etc, etc
      res.status(200).send({ message: 'ok', data: user, token: 'abcdeg' })
    } else {
      res.status(500).send({ message: 'Wrong password' })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
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
   
    var github_username = (await (await octokit.request('GET /user', {})).data.login)
    console.log(github_username);
    //verificar si el usuario ya existe
    var id_user;
    
    const existing_user=await User.findOne({
      where: {
        username: github_username
      }
    })
    if(existing_user==null){
      console.log('El usuario es nuevo')
      var user_person_name = (await (await octokit.request('GET /user', {})).data.name)
      var user_new = ({
        username: github_username,
        name: user_person_name,
        used_oauth: true
      })
      await User.create(user_new);
      user_new=await User.findOne({
        where: {
          username: github_username
        }
      });
      var jwt_token = createToken(user_new);
      res.status(200).send({message: 'Token ' + jwt_token })
    }else{
      console.log('Existe un usuario con este nombre')
      if(existing_user.used_oauth==true){
        console.log('Este usuario utiliza oauth')
        id_user=existing_user.id;
        var jwt_token = createToken(existing_user);
      res.status(200).send({message: 'Token ' + jwt_token })
        
      }else{
        //Para evitar que un usuario con un nombre igual a otro existente en la bd lo pise con el que esta usando oauth
        console.log('Este usuario no usa oauth')
        res.status(404).send({ message: 'No existe el usuario' })
        return
      }
    }
    res.status(200).send({message: ''})
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }

}

function createToken (user) {
  const token = jwt.sign({
    name: user.name,
    id: user,id
}, process.env.TOKEN_SECRET)
return token;
}
