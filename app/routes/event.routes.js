const isAuthenticated = require('../auth/authenticator.js')
module.exports = app => {
  const event = require('../controllers/event.controller.js')
  const router = require('express').Router()

  router.post('/', isAuthenticated, event.create)

  router.post('/:id/follow', isAuthenticated, event.follow)

  router.put('/:id', isAuthenticated, event.update)

  router.delete('/:id', isAuthenticated, event.delete)

  router.get('/', isAuthenticated, event.findAll)

  router.get('/:id', isAuthenticated, event.findOne)

  app.use('/api/events', router)
}
