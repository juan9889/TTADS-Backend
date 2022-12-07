const ctrl = require('../controllers/user.controller.js');
const sequelize = require('../database/database.js')
const User = sequelize.models.user
require('dotenv').config()
test('prueba el login', () => {
    const user = {
        id: 1,
        name: 'Juan',
        isAdmin: true
    }
  expect(ctrl.createToken(user).length).toBeGreaterThan(3);
});