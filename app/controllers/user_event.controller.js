const sequelize = require('../database/database.js')
const User_event = sequelize.models.user_event

exports.create = (req, res) => {
  if (!req.params.id) { // No sé cual es la diferencia entre req.params.id y req.body.id
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const user_event = ({
    userId: 1111111111,
    eventId: req.body.eventId
  })
  User_event.create(user_event)
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

exports.delete = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: 'id can not be empty!'
    })
    return
  }
  const id = req.params.id
  User_event.destroy({
    where: { id }
  })
    .then(num => {
      if (num === 1) {
        res.status(200).send({
          message: 'User left the event successfully!'
        })
      } else {
        res.status(502).send({
          message: `Cannot left the event with id=${id}. Maybe Event was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || 'User could not leave the event with id=' + id
      })
    })
}
