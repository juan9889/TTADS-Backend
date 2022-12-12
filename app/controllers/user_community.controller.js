const sequelize = require('../database/database.js')
const User_community = sequelize.models.user_community
const { Op } = require('sequelize')

exports.join = async (req, res, mod, communityId) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  } try {
    const user_community = ({
      mod, // Poner que solo el primer usuario sea mod.
      userId: req.user.id,
      communityId
    })
    const u_c = await User_community.create(user_community)
    if (u_c) {
      return true
    } else {
      return false
    }
  } catch (err) {
    res.status(500).send({
      message:
          err.name + ': ' + err.message || 'Some error occurred while creating '
    })
  }
}

// Crear una variable x que contenga el id del usuario que esta logeado.

exports.leave = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id

  User_community.destroy({
    // eliminar cuando el id del usuario es igual al id del usuario logeado.
    where: { communityId: id, userId: req.user.id }
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

exports.getMod = async (userId, communityId) => {
  if (!userId || !communityId) {
    throw new Error('Es necesario el id del usuario y el de comunidad')
  }
  try {
    const u_c = await User_community.findOne({
      where: {
        [Op.and]: [
          { userId },
          { communityId }
        ]
      }
    })
    if (u_c !== null) {
      if (u_c.mod === true) {
        return true
      } else {
        return false
      }
    } else {
      throw new Error('El usuario no esta en la comunidad')
    }
  } catch (err) {
    return err
  }
}

exports.joined = async (userId, communityId) => {
  if (!userId || !communityId) {
    throw new Error('Es necesario el id del usuario y el de comunidad')
  }
  try {
    const u_c = await User_community.findOne({
      where: {
        [Op.and]: [
          { userId },
          { communityId }
        ]
      }
    })
    if (u_c !== null) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return err
  }
}
