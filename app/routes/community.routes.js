const isAuthenticated = require('../auth/authenticator.js')
module.exports = app => {
  const Communities = require('../controllers/community.controller.js')

  const router = require('express').Router()

  // Create a new comunity
  router.post('/', isAuthenticated, Communities.create)

  router.post('/:id/join', isAuthenticated, Communities.join)

  router.delete('/:id', isAuthenticated, Communities.delete)

  router.get('/', isAuthenticated, Communities.findAll)

  router.put('/:id', isAuthenticated, Communities.update)

  router.get('/search/:term', isAuthenticated, Communities.findByTerm)

  router.get('/:id', isAuthenticated, Communities.findOne)

  router.get('/:id/events', isAuthenticated, Communities.findEvents)

  app.use('/api/communities', router)
}
