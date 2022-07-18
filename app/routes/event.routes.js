module.exports = app => {
  const event = require("../controllers/event.controller.js");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", event.create);

  // Retrieve all Tutorials
  router.get("/", event.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", event.findOne);

  // Update a Tutorial with id
  router.put("/:id", event.update);

  // Delete a Tutorial with id
  router.delete("/:id", event.delete); 

  // Retrieve a single Tutorial with id
  router.get("/:id/details", event.GetDetails);

  app.use('/api/events', router);
};
