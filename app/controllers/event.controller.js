const sequelize = require('../database/database.js')
const Event = sequelize.models.event
const User_community = require('./user_community.controller.js')
const User_event = require('./user_event.controller.js')

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.description || !req.body.date ||
    !req.body.time || !req.body.cityId ||
    !req.body.categoryId || !req.body.communityId || (req.body.state < 0 || req.body.state > 2)) {
    res.status(400).send({
      message: 'Event body time can not be empty!'
    })
    return
  }
  try {
    console.log(req.user.id + '   ---   ' + req.body.communityId)
    const mod = await User_community.getMod(req.user.id, req.body.communityId)
    if (mod) {
      console.log('es mod')
      const newEvent = await Event.create(req.body)
      if (newEvent) {
        res.status(201).send(newEvent)
      } else {
        res.status(502).send({ message: 'No se puede crear el evento' })
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
  if (!req.params.id) {
    res.status(400).send({
      message: 'Se necesita minimamente el id de evento '
    })
    return
  }
  const id = req.params.id
  try {
    const event = await Event.findByPk(id)
    if (event) {
      const mod = await User_community.getMod(req.user.id, event.communityId)
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
    } else {
      res.status(404).send({ message: 'El evento no existe' })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Error al actualizar el evento con id=' + id
    })
  }
}

exports.delete = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'Se necesita minimamente el id de comunidad y evento '
    })
    return
  }
  const id = req.params.id
  try {
    const event = await Event.findByPk(id)
    if (event) {
      const mod = await User_community.getMod(req.user.id, event.communityId)
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
    } else {
      res.status(404).send({ message: 'El evento no existe' })
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'Could not delete ciudad with id=' + id
    })
  }
}

exports.follow = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'Se necesita minimamente el id de comunidad y evento '
    })
    return
  }
  const id = req.params.id
  try {
    const event = await Event.findByPk(id)
    if (event) {
      const following = await User_event.following(req.user.id, id)
      console.log('following: ' + following)
      if (!following) { // no lo sigue
        const joined = await User_community.joined(req.user.id, event.communityId)
        console.log('joined: ' + following)
        if (joined) { // esta en la comunidad
          await User_event.follow(req, res)
        } else { // no esta en la comunidad
          await User_community.join(req, res, false, event.communityId)
          await User_event.follow(req, res)
        }
      } else { // lo sigue
        await User_event.unfollow(req, res)
      }
    } else {
      res.status(404).send({ message: 'El evento no existe' })
    }
    // llamadas al user event
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
