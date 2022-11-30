const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const event_category = sequelize.define('event_category', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    },
    icon: {
      type: Sequelize.DataTypes.STRING
    },
    iconColor: {
      type: Sequelize.DataTypes.STRING
    }
  })
  return event_category
}
