module.exports = app => {
  const Communities = require("../controllers/community.controller.js");

  var router = require("express").Router();

  // Create a new comunity
  router.post("/", Communities.create);

  // Retrieve all communities
  router.get("/", Communities.findAll);

  // Retrieve all that match search term in name or description
  router.get("/search/:term", Communities.findByTerm);

  // Retrieve a single community with id
  router.get("/:id", Communities.findOne);

  // Update a community with id
  router.put("/:id", Communities.update);

  // Delete a community with id
  router.delete("/:id", Communities.delete); 

  router.get("/:id/events", Communities.findEvents);

  app.use('/api/communities', router);
};
