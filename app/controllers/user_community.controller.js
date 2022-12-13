const sequelize = require('../database/database.js')
const User_community = sequelize.models.user_community
const Community = sequelize.models.community
const ThisU_c = require('./user_community.controller.js')

const { Op } = require('sequelize')

exports.join = async (req, res, mod, communityId) => {
  if (!mod) { // si mod = true es porque se esta creando la comunidad
    if (!req.params.id) {
      res.status(400).send({
        message: 'id can not be empty!'
      })
      return
    }
  } try {
    const user_community = ({
      mod, // Poner que solo el primer usuario sea mod.
      userId: req.user.id,
      communityId
    })
    const u_c = await User_community.create(user_community)
    if (u_c) {
      if (!mod) {
        res.status(200).send({ message: 'Unido a la comunidad' })
      }
      return true
    } else {
      if (!mod) {
        res.status(502).send({ message: `No se puede unir a la comunidad con id=${req.params.id}.` })
      }
      return false
    }
  } catch (err) {
    res.status(500).send({
      message:
          err.name + ': ' + err.message || 'Some error occurred while creating '
    })
  }
}

exports.leave = async (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id
  try {
    const mod = await ThisU_c.getMod(req.user.id, id)
    console.log('\n\n\n get mod: ' + JSON.stringify(mod))
    if (mod) {
      const newMod = await User_community.findOne({ where: { [Op.and]: [{ communityId: id }, { userId: { [Op.ne]: req.user.id } }] } })
      console.log('\n\n\n newMod: ' + JSON.stringify(newMod))
      if (newMod) {
        const makeMod = await ThisU_c.makeMod(newMod.id, id)
        if (makeMod) {
          const u_c = await User_community.destroy({ where: { communityId: id, userId: req.user.id } })
          if (u_c) {
            res.status(200).send({ message: 'User left the community successfully! New Mod' })
          } else {
            res.status(502).send({
              message: `Cannot left the community with id=${id}. Maybe Community was not found!`
            })
          }
        } else {
          res.status(502).send({
            message: `Cannot left the community with id=${id}. Maybe Community was not found!`
          })
        }
      } else {
        const community = await Community.destroy({ where: { id } })
        if (community) {
          res.status(200).send({ message: 'User left the community successfully! Community destroy' })
        } else {
          res.status(502).send({
            message: `Cannot left the community with id=${id}. Maybe Community was not found!`
          })
        }
      }
    } else {
      const u_c = await User_community.destroy({ where: { communityId: id, userId: req.user.id } })
      if (u_c) {
        res.status(200).send({ message: 'User left the community successfully!' })
      } else {
        res.status(502).send({
          message: `Cannot left the community with id=${id}. Maybe Community was not found!`
        })
      }
    }
  } catch (err) {
    res.status(500).send({
      message: err.name + ': ' + err.message || 'User could not leave the community with id=' + id
    })
  }
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

exports.makeMod = async (userId, communityId) => {
  if (!userId || !communityId) {
    throw new Error('Es necesario el id del usuario y el de comunidad')
  }
  try {
    const u_c = await User_community.update(
      { mod: true }, { where: { [Op.and]: [{ userId }, { communityId }] } }
    )
    if (u_c) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return err
  }
}
