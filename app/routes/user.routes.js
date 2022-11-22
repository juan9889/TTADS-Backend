
const isAuthenticated = require('../auth/authenticator.js')
const userModel = require('../models/user.model')

module.exports = app => {
  const users = require('../controllers/user.controller.js')

  const router = require('express').Router()

  router.post('/', users.create)

  // router.get("/", provinces.findAll);

  // router.get("/:username", users.findOne);

  router.post('/login', users.login)

  // router.put("/:id", provinces.update);
  router.get('/me', isAuthenticated, async (req, res) => {
    console.log('llego a metodo')
    try {
      const user = await userModel.findOne({
        where: {
          id: req.user.id
        }
      })
      if (!user) {
        return res.json({ message: 'No user found' })
      }
      return res.json({ data: user })
    } catch (error) {
      return res.json({ error })
    }
  })
  // router.delete("/:id", provinces.delete);
  router.get('/esaut', isAuthenticated, async (req, res) => {
    try {
      const user = await userModel.findOne()
      if (!user) {
        return res.json({ message: 'No user found' })
      }
      return res.json({ user })
    } catch (error) {
      return res.json({ error })
    }
  })

  router.get('/github/:access_token', users.getJwtFromOauthGithubToken)

  app.use('/api/users', router)
}
