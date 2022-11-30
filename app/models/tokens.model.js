const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const token = sequelize.define('token', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    access_token: {
      type: Sequelize.DataTypes.STRING
    },
    user_id: {
      type: Sequelize.DataTypes.INTEGER
    }

  })
  return token
}
