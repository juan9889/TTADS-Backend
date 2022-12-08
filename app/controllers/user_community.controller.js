const sequelize = require('../database/database.js')
const User_community = sequelize.models.user_community

exports.create = (req, res) => {
  // Validate request
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const user_community = ({
    mod: false, // Poner que solo el primer usuario sea mod.
    userId: 1111111111,
    communityId: req.body.communityId
  })
  User_community.create(user_community)
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || 'Some error occurred while creating '
      })
    })
}

// Crear una variable x que contenga el id del usuario que esta logeado.

exports.delete = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id

  User_community.destroy({
    where: { id }
  })
    .then(num => {
      if (num === 1) {
        res.status(200).send({
          message: 'User left the community successfully!'
        })
      } else {
        res.status(502).send({
          message: `Cannot left the community with id=${id}. Maybe Community was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || 'User could not leave the community with id=' + id
      })
    })
}
