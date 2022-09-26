const { Sequelize, Op } = require("sequelize");
const sequelize = require("../database/database.js");
const Province = sequelize.models.province;
const City = sequelize.models.city;

// Create and Save a new provincia.
exports.create = async (req, res) => {
  try {
    if (req.body.name) {
      await Province.create({
        name: req.body.name
      });
    } else {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    res.status(201).send({ message: 'Created', data: req.body, status: 201 });
  } catch (error) {
    res.status(500).send({ message: error.name + error.message });
  }
};
exports.create = async (req, res) => {
  try {
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    await Province.create({ name: req.body.name });
    res.status(201).send({ message: 'Created', data: req.body, status: 201 });
  } catch (error) {
    res.status(500).send({ message: error.name + error.message });
  }
};


// Retrieve all ciudades from the database.
exports.findAll = async (req, res) => {
  try {
    const name = req.query.name;
    var province = await Province.findAll({ where: name ? { name: { [Op.like]: `%${name}%` } } : null });
    if (province) {
      console.log(province);
      res.status(200).send(province);
    } else {
      res.status(404).send({ message: 'Cannot find' });
    }
  } catch (error) {
    res.status(500).send({ message: error.name + error.message });
  }
};

// Find a single ciudad with an id
exports.findOne = async (req, res) => {
  try {
    if (!req.params.id) {
      res.status(400).send({
        message: "id can not be empty!"
      });
    }
    var province = await Province.findByPk(req.params.id);
    if (province) {
      res.status(200).send(province);
    } else {
      res.status(404).send({ message: `Cannot find with id=${req.params.id}.` });
    }
  } catch (error) {
    res.status(500).send({ message: error.name + error.message });
  }
};


// Update by the id in the request
exports.update = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "id can not be empty!"
    });
    return
  }
  const id = req.params.id;

  Province.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "provincia was updated successfully."
        });
      } else {
        res.status(404).send({
          message: `Cannot update provincia with id=${id}. Maybe provincia was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || "Error updating provincia with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "id can not be empty!"
    });
    return
  }
  const id = req.params.id;

  Province.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "The province was deleted successfully!"
        });
      } else {
        res.status(404).send({
          message: `Cannot delete provincia with id=${id}. Maybe provincia was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || "Could not delete provincia with id=" + id
      });
    });
};

exports.findCities = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "id can not be empty!"
    });
    return
  }

  const id = parseInt(req.params.id);
  Province.scope({ method: ['cities', id] }).findAll()
    .then(data => {
      if (data) {
        res.status(200).send(data);
      }
      else {
        res.status(404).send({ message: 'Cannot find' })
      }
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || "Some error occurred while retrieving "
      });
    });
};