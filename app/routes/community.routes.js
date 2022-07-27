module.exports = app => {
  const Communities = require("../controllers/city.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", Communities.create);

  // Retrieve all Tutorials
  router.get("/", Communities.findAll);

  // Retrieve a single Tutorial with id
  router.get("/:id", Communities.findOne);

  // Update a Tutorial with id
  router.put("/:id", Communities.update);

  // Delete a Tutorial with id
  router.delete("/:id", Communities.delete); 

  router.get("/:id/events", Communities.findCommunityEvents);

  router.get("/:id/details", Communities.GetDetails);

  app.use('/api/communities', router);
};
