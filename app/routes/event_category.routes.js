module.exports = app => {
  const event_category = require('../controllers/event_category.controller.js')
  const isAuthenticated = require('../auth/authenticator.js')
  const admin = require('../auth/authorizator.js')
  const router = require('express').Router()

  // Create a new Tutorial
  router.post('/', isAuthenticated, admin, event_category.create)

  // Retrieve all Tutorials
  router.get('/', event_category.findAll)

  // Retrieve a single Tutorial with id
  router.get('/:id', event_category.findOne)

  // Update a Tutorial with id
  router.put('/:id', isAuthenticated, admin, event_category.update)

  // Delete a Tutorial with id
  router.delete('/:id', isAuthenticated, admin, event_category.delete)

  app.use('/api/eventcategory', router)
}
