module.exports = app => {
  const users = require('../controllers/user.controller.js')

  const router = require('express').Router()

  router.post('/', users.create)

  // router.get("/", provinces.findAll);

  // router.get("/:username", users.findOne);

  router.get('/login/:username/:user_password', users.login)

  // router.put("/:id", provinces.update);

  // router.delete("/:id", provinces.delete);

  router.get('/github/:access_token', users.getJwtFromOauthGithubToken)

  app.use('/api/users', router)
}
