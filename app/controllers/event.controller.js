const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const Event = sequelize.models.event



// Create and Save a new ciudad
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.description || !req.body.date
    || !req.body.time || !req.body.cityId
    || !req.body.categoryId || !req.body.communityId) {
    res.status(400).send({
      message: "title, description, date, time can not be empty!"
    });
    return
  }
  console.log(req.body.date)
  const event = ({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    state: req.body.state,
    time: req.body.time,
    cityId: req.body.cityId,
    categoryId: req.body.categoryId,
    communityId: req.body.communityId
  });
  Event.create(event)
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
  Event.findAll({ where: condition })
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
  Event.findByPk(id)
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
  Event.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Event was updated successfully."
        });
      } else {
        res.status(502).send({
          message: err.name + ': ' + err.message || `Cannot update Event with id = ${id}.Maybe Event was not found or req.body is empty!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || "Error updating ciudad with id=" + id
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

  Event.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "Event was deleted successfully!"
        });
      } else {
        res.status(502).send({
          message: err.name + ': ' + err.message || `Cannot delete Event with id=${id}. Maybe Event was not found!`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.name + ': ' + err.message || "Could not delete ciudad with id=" + id
      });
    });
};

exports.GetDetails = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "id can not be empty!"
    });
    return
  }
  const id = parseInt(req.params.id);
  Event.scope({ method: ['details',id]}).findAll()
    .then(data => {
      if (data) {
        console.log(data)
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
}