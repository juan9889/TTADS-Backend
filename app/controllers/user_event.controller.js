const sequelize = require('../database/database.js')
const User_event = sequelize.models.user_event
const { Op } = require('sequelize')

exports.follow = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  try {
    const user_event = ({
      userId: req.user.id,
      eventId: req.params.id
    })
    const newU_e = await User_event.create(user_event)
    if (newU_e) {
      res.status(200).send({ message: 'Siguendo al evento' })
    } else {
      res.status(502).send({ message: `No se puede seguir al evento con id=${req.params.id}.` })
    }
  } catch (err) {
    return err
  }
}
exports.unfollow = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  try {
    const u_e = await User_event.destroy({
      where: {
        userId: req.user.id,
        eventId: req.params.id
      }
    })
    if (u_e) {
      res.status(200).send({ message: 'User left the event successfully!' })
    } else {
      res.status(502).send({ message: `Cannot left the event with id=${req.params.id}. Maybe Event was not found!` })
    }
  } catch (err) {
    return err
  }
}
exports.following = async (userId, eventId) => {
  if (!userId || !eventId) {
    throw new Error('Es necesario el id del usuario y el del evento.')
  }
  try {
    const u_e = await User_event.findOne({
      where: {
        [Op.and]: [
          { userId },
          { eventId }
        ]
      }
    })
    if (u_e) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return err
  }
}

exports.followers = async (eventId) => {
  if (!eventId) {
    throw new Error('Es necesario el id del usuario y el de comunidad')
  }
  try {
    const u_e = await User_event.count({
      where: {
        eventId
      }
    })
    if (u_e) {
      return u_e
    } else {
      return -1
    }
  } catch (err) {
    return err
  }
}
