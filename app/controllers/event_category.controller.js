const { Sequelize, Op } = require("sequelize");
const sequelize = require("../database/database.js");
const Event_Category = sequelize.models.event_category;

// Create and Save a new ciudad
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return
  }
  const event_category = ({
    name: req.body.name
  });
  Event_Category.create(event_category)
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
  Event_Category.findAll({ where: condition })
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
  Event_Category.findByPk(id)
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
        message:
          err.name + ': ' + err.message || "Error retrieving  with id=" + id
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
  Event_Category.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "category was updated successfully."
        });
      } else {
        res.status(502).send({
          message: err.name + ': ' + err.message || `Cannot update with id = ${id}.Maybe ciudad was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || "Error updating with id=" + id
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

  Event_Category.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "category was deleted successfully!"
        });
      } else {
        res.status(502).send({
          message: err.name + ': ' + err.message || `Cannot delete ciudad with id=${id}. Maybe ciudad was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || "Could not delete ciudad with id=" + id
      });
    });
};
