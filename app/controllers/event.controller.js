const sequelize = require('../database/database.js')
const Event = sequelize.models.event
const User_community = require('./user_community.controller.js')
const User_event = require('./user_event.controller.js')

exports.create = async (req, res) => {
  // Validate request
  if (!req.params.id || !req.body.title || !req.body.description || !req.body.date ||
    !req.body.time || !req.body.cityId ||
    !req.body.categoryId || !req.body.communityId || !req.body.state) {
    res.status(400).send({
      message: 'Event body time can not be empty!'
    })
    return
  }
  try {
    const cId = req.body.communityId
    const uId = req.user.id
    const mod = User_community.mod(uId, cId)
    if (mod === true) {
      const newEvent = await Event.create(req.body)
      if (newEvent) {
        res.status(201).send(newEvent)
      } else {
        res.status(502).send({ message: `No se puede crear el evento con id = ${req.params.id}` })
      }
    } else {
      res.status(401).send({ message: 'El usuario no es moderador de la comunidad.' })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Some error occurred while creating'
    })
  }
}

exports.findAll = (req, res) => {
  Event.scope('find').findAll()
    .then(data => {
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(404).send({
          message: 'Cannot find with.'
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || 'Error retrieving'
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
  Event.scope('find').findByPk(id)
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

exports.update = async (req, res) => {
  if (!req.params.id || !req.body.communityId) {
    res.status(400).send({
      message: 'Se necesita minimamente el id de comunidad y evento '
    })
    return
  }
  const id = req.params.id
  try {
    const cId = req.body.communityId
    const uId = req.user.id
    const mod = await User_community.mod(uId, cId)
    if (mod === true) {
      const updatedEvent = await Event.update(req.body, {
        where: { id }
      })
      if (updatedEvent) {
        res.status(200).send({
          message: 'Event was updated successfully.'
        })
      } else {
        res.status(502).send({ message: `No se puede actualizar el evento con id = ${id}` })
      }
    } else {
      res.status(401).send({ message: 'El usuario no es moderador de la comunidad.' })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Error al actualizar el evento con id=' + id
    })
  }
}

exports.delete = async (req, res) => {
  if (!req.params.id || !req.body.communityId) {
    res.status(400).send({
      message: 'Se necesita minimamente el id de comunidad y evento '
    })
    return
  }
  const id = req.params.id
  try {
    const cId = req.body.communityId
    const uId = req.user.id
    const mod = await User_community.mod(uId, cId)
    if (mod === true) {
      const delate = await Event.destroy({ where: { id } })
      if (delate) {
        res.status(200).send({ message: 'Event was deleted successfully!' })
      } else {
        res.status(502).send({ message: `Cannot delete Event with id=${id}.` })
      }
    } else {
      res.status(401).send({ message: 'El usuario no es moderador de la comunidad.' })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Could not delete ciudad with id=' + id
    })
  }
}

exports.follow = async (req, res) => {
  if (!req.params.id || !req.body.communityId) {
    res.status(400).send({
      message: 'Se necesita minimamente el id de comunidad y evento '
    })
    return
  }
  const id = req.params.id
  try {
    const uId = req.user.id
    const following = await User_event.following(uId, id)
    if (!following) { // no lo sigue
      const follow = await User_event.create(req, res)
      if (follow) {
        res.status(200).send({ message: 'Siguendo al evento' })
      } else {
        res.status(502).send({ message: `No se puede seguir al evento con id=${id}.` })
      }
    } else { // lo sigue
      const unfollow = await User_event.delete(req, res)
      if (unfollow) {
        res.status(200).send({ message: 'User left the event successfully!' })
      } else {
        res.status(502).send({ message: `Cannot left the event with id=${id}. Maybe Event was not found!` })
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Server error al seguir al evento id=' + id
    })
  }
}

exports.followers = async (req, res) => {
  if (!req.params.id || !req.body.communityId) {
    res.status(400).send({
      message: 'Se necesita minimamente el id de comunidad y evento '
    })
    return
  }
  const id = req.params.id
  try {
    const uId = req.user.id
    const following = await User_event.following(uId, id)
    if (following) {
      if (following === -1) {
        res.status(200).send(0)
      } else {
        res.status(200).send(following)
      }
    } else {
      res.status(502).send({ message: `Error con los seguidores del evento con id=${id}.` })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Server error al contar los seguidores del evento id=' + id
    })
  }
}
