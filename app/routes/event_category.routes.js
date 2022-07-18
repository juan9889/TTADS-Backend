module.exports = app => {
  const event_category = require("../controllers/event_category.controller.js");
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", event_category.create);

  // Retrieve all Tutorials
  router.get("/", event_category.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", event_category.findOne);

  // Update a Tutorial with id
  router.put("/:id", event_category.update);

  // Delete a Tutorial with id
  router.delete("/:id", event_category.delete);

  app.use('/api/eventcategory', router);
};
