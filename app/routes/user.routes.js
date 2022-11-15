module.exports = app => {
  const users = require('../controllers/user.controller.js')

  const router = require('express').Router()

  // Create a new Tutorial
  router.post('/', users.create)

  // Retrieve all Tutorials
  // router.get("/", provinces.findAll);

  // Retrieve a single Tutorial with id
  // router.get("/:username", users.findOne);

  router.get('/login/:username/:user_password', users.login)

  // Update a Tutorial with id
  // router.put("/:id", provinces.update);

  // Delete a Tutorial with id
  // router.delete("/:id", provinces.delete);

  // Retrieve a single Tutorial with id
  // router.get("/:id/cities", provinces.findCities);

  app.use('/api/users', router)
}
