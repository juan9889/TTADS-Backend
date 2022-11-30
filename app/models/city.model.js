const Sequelize = require('sequelize')

module.exports = (sequelize) => {
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
  return city
}
