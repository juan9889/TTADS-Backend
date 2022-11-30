const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const user_community = sequelize.define('user_community', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    mod: {
      type: Sequelize.DataTypes.BOOLEAN
    }
  })
  return user_community
}
