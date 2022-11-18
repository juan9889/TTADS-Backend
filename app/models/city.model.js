const { sequelize, Sequelize } = require('../database/database.js')

const city = sequelize.define('city', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.DataTypes.STRING
  }
})

module.exports = city
