const { Sequelize, Op, QueryTypes } = require("sequelize");
const sequelize = require("../database/database.js");
const Event = sequelize.models.Event
const City = sequelize.models.City;
const Category = sequelize.models.Event_Category;



// Create and Save a new ciudad
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title || !req.body.description || !req.body.date
    || !req.body.time || !req.body.place || !req.body.cityId
    || !req.body.categoryId || !req.body.communityId) {
    res.status(400).send({
      message: "title, description, date, time and place can not be empty!"
    });
    return
  }
  const event = ({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    time: req.body.time,
    place: req.body.place,
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
  City.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "ciudad was updated successfully."
        });
      } else {
        res.status(502).send({
          message: err.name + ': ' + err.message || `Cannot update ciudad with id = ${id}.Maybe ciudad was not found or req.body is empty!`
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

  City.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send({
          message: "ciudad was deleted successfully!"
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

exports.GetDetails = (req, res) => {
  if (!req.params.id) {
    res.status(400).send({
      message: "id can not be empty!"
    });
    return
  }
  const id = parseInt(req.params.id );
  const query = 'SELECT e.id, e.title,e.description, e.cityId, ci.name "City", e.date, e.time ,e.communityId, c.name "community",e.categoryId,ec.name "category" FROM events e inner join communities c on e.communityId = c.id inner join event_categories ec on e.categoryId = ec.id inner join cities ci on e.cityId = ci.id  where e.id = :id'
  sequelize.query(query, {
    type: QueryTypes.SELECT,
    replacements: {id: id}
  })
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