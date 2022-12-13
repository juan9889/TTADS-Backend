const sequelize = require('../database/database.js')
const Comm_Category = sequelize.models.comm_category

// Create and Save a new ciudad
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: 'name can not be empty!'
    })
    return
  }
  const comm_category = ({
    name: req.body.name,
    icon: req.body.icon,
    iconColor: req.body.iconColor
  })
  Comm_Category.create(comm_category)
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
  Comm_Category.findAll()
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
  const id = req.params.id
  Comm_Category.findByPk(id)
    .then(data => {
      if (data) {
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

// Update by the id in the request
exports.update = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id
  Comm_Category.update(req.body, {
    where: { id }
  })
    .then(num => {
      if (num === 1) {
        res.status(200).send({
          message: 'ciudad was updated successfully.'
        })
      } else {
        res.status(502).send({
          message: `Cannot update ciudad with id = ${id}.Maybe ciudad was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || 'Error updating ciudad with id=' + id
      })
    })
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

  Comm_Category.destroy({
    where: { id }
  })
    .then(num => {
      if (num === 1) {
        res.status(200).send({
          message: 'ciudad was deleted successfully!'
        })
      } else {
        res.status(502).send({
          message: `Cannot delete ciudad with id=${id}. Maybe ciudad was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || 'Could not delete ciudad with id=' + id
      })
    })
}

exports.findCommunities = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }

  const id = parseInt(req.params.id)
  Comm_Category.scope('communities').findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send(data)
      } else {
        //res.status(404).send({ message: 'Cannot find' })
        res.status(200).send(data)
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || 'Some error occurred while retrieving '
      })
    })
}
