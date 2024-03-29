const sequelize = require('../database/database.js')
const Province = sequelize.models.province

// Create and Save a new provincia.
exports.create = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send({
        message: 'Content can not be empty!'
      })
      return
    };
    await Province.create({ name: req.body.name })
    res.status(201).send({ message: 'Created', data: req.body, status: 201 })
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

// Retrieve all ciudades from the database.
exports.findAll = async (req, res) => {
  try {
    const provinces = await Province.findAll()
    if (provinces) {
      res.status(200).send(provinces)
    } else {
      res.status(404).send({ message: 'Cannot find' })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

// Find a single ciudad with an id
exports.findOne = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({
        message: 'id can not be empty!'
      })
    }
    const id = parseInt(req.params.id)
    const province = await Province.findByPk(id)
    if (province) {
      res.status(200).send(province)
    } else {
      res.status(404).send({ message: `Cannot find with id=${req.params.id}.` })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

// Update by the id in the request
exports.update = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ message: 'id can not be empty!' })
      return
    };
    const id = req.params.id
    const province = await Province.update(req.body, { where: { id } })
    if (province === 1) {
      res.status(200).send(req.body)
    } else {
      res.status(404).send({ message: `Cannot update provincia with id=${id}. Maybe provincia was not found or req.body is empty!` })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ message: 'id can not be empty!' })
      return
    };
    const id = req.params.id
    const province = await Province.destroy({ where: { id } })
    if (province === 1) {
      res.status(200).send({ message: 'The province was deleted successfully!' })
    } else {
      res.status(404).send({ message: `Cannot delete provincia with id=${id}. Maybe provincia was not found!` })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}

exports.findCities = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({ message: 'id can not be empty!' })
      return
    };
    const id = parseInt(req.params.id)
    const cities = await Province.scope('cities').findByPk(id)
    if (cities) {
      res.status(200).send(cities)
    } else {
      res.status(404).send({ message: `Cannot find cities in the province with id=${id}.` })
    }
  } catch (error) {
    res.status(500).send({ message: error.name + ': ' + error.message })
  }
}
