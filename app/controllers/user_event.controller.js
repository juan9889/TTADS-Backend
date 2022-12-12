const sequelize = require('../database/database.js')
const User_event = sequelize.models.user_event
const User_community = require('./user_community.controller.js')
const { Op } = require('sequelize')

exports.follow = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  try {
    const joined = await User_community.joined(req.user.id, req.body.communityId)
    if (joined) {
      const user_event = ({
        userId: req.user.id,
        eventId: req.params.id
      })
      const newU_e = await User_event.create(user_event)
      if (newU_e) {
        return true
      } else {
        return false
      }
    } else {
      res.status(401).send({ message: 'El usuario no esta en la comunidad.' })
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
    const joined = await User_community.joined(req.user.id, req.body.communityId)
    if (joined) {
      const u_e = await User_event.destroy({
        where: {
          userId: req.user.id,
          eventId: req.params.id
        }
      })
      if (u_e) {
        return true
      } else {
        return false
      }
    } else {
      res.status(401).send({ message: 'El usuario no esta en la comunidad.' })
    }
  } catch (err) {
    return err
  }
}
exports.following = async (userId, eventId) => {
  if (!userId || !eventId) {
    throw new Error('Es necesario el id del usuario y el de comunidad')
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
