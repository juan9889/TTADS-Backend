const { Sequelize, Op } = require("sequelize");
const sequelize = require("../database/database.js");
const Province = sequelize.models.Province;

// Create and Save a new ciudad
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const provincia = {
    name: req.body.name
  };
  Province.create(provincia)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || "Some error occurred while creating "
      });
    });
};

// Retrieve all ciudades from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Province.findAll({ where: condition })
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

// Find a single ciudad with an id
exports.findOne = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "id can not be empty!"
    });
    return
  }
  const id = req.params.id;

  Province.findByPk(id)
    .then(data => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(404).send({
          message: `Cannot find with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || "Error retrieving  with id=" + id
      });
    });
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
