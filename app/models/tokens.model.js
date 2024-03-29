const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const token = sequelize.define('token', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    accessToken: {
      type: Sequelize.DataTypes.STRING
    },
    userId: {
      type: Sequelize.DataTypes.INTEGER
    }

  })

  return token
}
