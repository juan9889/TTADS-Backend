const sequelize = require('../database/database.js')
const Community = sequelize.models.community
const user_community = require('./user_community.controller.js')

// Create and Save a new ciudad
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.description || !req.body.categoryId) {
    res.status(400).send({
      message: 'name description or categoryId can not be empty!'
    })
    return
  }
  const community = ({
    name: req.body.name,
    description: req.body.description,
    categoryId: req.body.categoryId
  })
  Community.create(community)
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

// Retrieve all ciudades from the database.
exports.findAll = (req, res) => {
  Community.scope({ method: ['find', req.user.id] }).findAll()
    .then(data => {
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: 'Cannot find' })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || 'Some error occurred while retrieving '
      })
    })
}

// Find a single ciudad with an id
exports.findOne = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = parseInt(req.params.id)
  Community.scope('find').findByPk(id)
    .then(data => {
      if (data) {
        console.log(data)
        res.status(200).send(data)
      } else {
        res.status(404).send({
          message: `Cannot find with id=${id}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || 'Error retrieving  with id=' + id
      })
    })
}

// Find communities by search term
exports.findByTerm = (req, res) => {
  if (!req.params.term) {
    res.status(400).send({
      message: 'search term empty'
    })
    return
  }
  const term = parseInt(req.params.term)
  console.log('Req parm :' + req.params.term)
  Community.scope({ method: ['findByTerm', term] }).findAll()
    .then(data => {
      if (data) {
        console.log(data)
        res.status(200).send(data)
      } else {
        res.status(404).send({
          message: 'Cannot find'
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || 'Error retrieving  with search term'
      })
    })
}

// Update by the id in the request
exports.update = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  // Si "joined" es 1, se crea la relación entre el usuario y la comunidad.
  // Si "joined" es -1, se elimina la relación entre el usuario y la comunidad.
  // Si "joined" es 0, se actualiza la comunidad.
  if (req.body.joined == 1) {
    user_community.create(req, res)
  } else if (req.body.joined == -1) {
    user_community.delete(req, res)
  } else {
    const id = req.params.id
    Community.update(req.body, {
      where: { id }
    })
      .then(num => {
        if (num === 1) {
          res.status(200).send({
            message: 'Community was updated successfully.'
          })
        } else {
          res.status(502).send({
            message: `Cannot update community with id = ${id}.Maybe community was not found or req.body is empty!`
          })
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.name + ': ' + err.message || 'Error updating community with id=' + id
        })
      })
  }
}

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id

  Community.destroy({
    where: { id }
  })
    .then(num => {
      if (num === 1) {
        res.status(200).send({
          message: 'Community was deleted successfully!'
        })
      } else {
        res.status(502).send({
          message: `Cannot delete Community with id=${id}. Maybe Community was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || 'Could not delete ciudad with id=' + id
      })
    })
}

exports.findEvents = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = parseInt(req.params.id)
  Community.scope({ method: ['events', req.user.id] }).findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: 'Cannot find' })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || 'Some error occurred while retrieving '
      })
    })
}
