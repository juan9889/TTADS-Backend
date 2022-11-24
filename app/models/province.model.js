const { sequelize, Sequelize } = require('../database/database.js')

const province = sequelize.define('province', {
  id: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.DataTypes.STRING
  }
}, {
  scopes: {
    cities () {
      return {
        include: {
          model: sequelize.models.city,
          required: true,
          include: {
            model: sequelize.models.province,
            required: true
          }
        }
      }
    }
  }
})
module.exports = province
