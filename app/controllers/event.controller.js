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
    const mod = User_community.getMod(req.user.id, req.body.communityId)
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

exports.findAll = async (req, res) => {
  const data = await Event.scope({ method: ['find', req.user.id] }).findAll()
  try {
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).send({
        message: 'Cannot find with.'
      })
    }
  } catch (err) {
    res.status(500).send({
      message:
          err.name + ': ' + err.message || 'Error retrieving'
    })
  }
}

exports.findOne = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = parseInt(req.params.id)
  try {
    // eslint-disable-next-line prefer-const, no-var
    var data = await Event.scope({ method: ['find', req.user.id] }).findByPk(id)
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).send({
        message: `Cannot find with id=${id}.`
      })
    }
  } catch (err) {
    res.status(500).send({
      message:
          err.name + ': ' + err.message || 'Error retrieving  with id=' + id
    })
  }
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
    const mod = await User_community.getMod(req.user.id, req.body.communityId)
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
    const mod = await User_community.getMod(req.user.id, req.body.communityId)
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
    const following = await User_event.following(req.user.id, id)
    if (!following) { // no lo sigue
      const joined = await User_community.joined(req.user.id, req.body.communityId)
      if (joined) { // esta en la comunidad
        await follow()
      } else { // no esta en la comunidad
        // UNIRSE A LA COMUNIDAD const join = await User_community.create(req, res)
        await follow()
      }
    } else { // lo sigue
      await unfollow()
    }

    // llamadas al user event
    async function unfollow () {
      const unfollow = await User_event.unfollow(req, res)
      if (unfollow) {
        res.status(200).send({ message: 'User left the event successfully!' })
      } else {
        res.status(502).send({ message: `Cannot left the event with id=${id}. Maybe Event was not found!` })
      }
    }
    async function follow () {
      const follow = await User_event.follow(req, res)
      if (follow) {
        res.status(200).send({ message: 'Siguendo al evento' })
      } else {
        res.status(502).send({ message: `No se puede seguir al evento con id=${id}.` })
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Server error al seguir al evento id=' + id
    })
  }
}

// unfollow all
exports.followers = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'Se necesita minimamente el id del evento '
    })
    return
  }
  const id = req.params.id
  try {
    const followers = await User_event.followers(id)
    if (followers) {
      if (followers === -1) {
        res.status(200).send({ followers: 0 })
      } else {
        res.status(200).send({ followers })
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
