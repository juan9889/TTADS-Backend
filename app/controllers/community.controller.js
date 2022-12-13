const sequelize = require('../database/database.js')
const Community = sequelize.models.community
const User_community = require('./user_community.controller.js')

exports.create = async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.categoryId) {
    res.status(400).send({
      message: 'name description or categoryId can not be empty!'
    })
    return
  }
  try {
    const newCommunity = await Community.create(req.body)
    if (newCommunity) {
      const newU_c = await User_community.join(req, res, true, newCommunity.id)
      if (newU_c) {
        res.status(201).send(newCommunity)
      } else {
        await Community.destroy({ where: { id: newCommunity.id } })
        res.status(502).send({ message: 'No se puede crear el la comunidad' })
      }
    } else {
      res.status(502).send({ message: 'No se puede crear el la comunidad' })
    }
  } catch (err) {
    res.status(500).send({
      message:
          err.name + ': ' + err.message || 'Some error occurred while creating '
    })
  }
}

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

exports.findOne = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = parseInt(req.params.id)
  Community.scope({ method: ['find', req.user.id] }).findByPk(id)
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

exports.update = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id
  try {
    const mod = await User_community.getMod(req.user.id, req.params.id)
    if (mod === true) {
      const community = await Community.update(req.body, { where: { id } })
      if (community) {
        res.status(200).send({
          message: 'Community was updated successfully.'
        })
      } else {
        res.status(502).send({
          message: `Cannot update community with id = ${id}.Maybe community was not found or req.body is empty!`
        })
      }
    } else {
      res.status(401).send({ message: 'El usuario no es moderador de la comunidad.' })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Error updating community with id=' + id
    })
  }
}

exports.join = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id
  try {
    const community = Community.findByPk(id)
    if (community) {
      const joined = await User_community.joined(req.user.id, id)
      if (joined) { // esta en la comunidad
        await User_community.leave(req, res)
        return
      } else { // no esta en la comunidad
        await User_community.join(req, res, false, id)
        return
      }
    } else {
      res.status(404).send({ message: 'La comunidad no existe' })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Server error al seguir al evento id=' + id
    })
  }
}

exports.delete = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id
  try {
    const mod = await User_community.getMod(req.user.id, req.params.id)
    if (mod === true) {
      const community = await Community.destroy({ where: { id } })

      if (community) {
        res.status(200).send({
          message: 'Community was deleted successfully!'
        })
      } else {
        res.status(502).send({
          message: `Cannot delete Community with id=${id}. Maybe Community was not found!`
        })
      }
    } else {
      res.status(401).send({ message: 'El usuario no es moderador de la comunidad.' })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Error updating community with id=' + id
    })
  }
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
