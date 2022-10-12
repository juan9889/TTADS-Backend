const { Sequelize, Op } = require("sequelize");
const crypto = require('crypto');
const sequelize = require("../database/database.js");
const User = sequelize.models.user;



// Create and Save a new user
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.user_password) {
    res.status(400).send({
      message: "user or password can not be empty!"
    });
    return
  }
  const user = ({
    username: req.body.username,
    user_password: req.body.user_password
  });
  try{
  const existing = await User.findAll({
    where: {
      username: user.username
    }
  })
  console.log(existing);
  if(existing.length>0){
   res.status(505).send({ message: 'Already exists' });
   return
  }else{
  hash =  crypto.createHash('sha256').update(user.user_password).digest('hex');
  console.log(hash);
  user.user_password=hash;
  User.create(user);
  res.status(201).send({ message: 'Created', data: req.body, status: 201 });
  }
  }catch(error){
    res.status(500).send({ message: error.name + ': ' + error.message });
  }
};



// Find a single user with username
exports.findOne = async (req, res) => {
  if (!req.params.username) {
    res.status(400).send({
      message: "username can not be empty!"
    });
    return
  }
  console.log('GET');
  const username_query = req.params.username;
  try{
    const user = await User.findOne({
      where: {
        username: username_query
      }
    });
    res.status(200).send(user);
  }catch(error){
    res.status(500).send({ message: error.name + ': ' + error.message });
  }
};

exports.login = async (req, res) => {
  if (!req.params.username||!req.params.user_password) {
    res.status(400).send({
      message: "username or password can not be empty!"
      
    });
    return
  }
  try{
    const user = await User.findOne({
      where: {
        username: req.params.username
      }
    });
    hash = crypto.createHash('sha256').update(req.params.user_password).digest('hex');
    if(user.user_password==hash){
      //crear token, guardarlo, etc, etc
      res.status(200).send({ message: 'Wrong password', data:user, token:'abcdeg' });
    }else{
      res.status(500).send({ message: 'Wrong password' });
    }
  }catch(error){
    res.status(500).send({ message: error.name + ': ' + error.message });
  }
};



