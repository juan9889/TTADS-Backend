const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const event = sequelize.define('event', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.DataTypes.STRING
    },
    place: {
      type: Sequelize.DataTypes.STRING
    },
    description: {
      type: Sequelize.DataTypes.STRING
    },
    date: {
      type: Sequelize.DataTypes.DATEONLY
    },
    time: {
      type: Sequelize.DataTypes.TIME
    },
    state: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    scopes: {
      find () {
        return {
          include: [
            {
              model: sequelize.models.community,
              required: true,
              attributes: ['id', 'name']
            },
            {
              model: sequelize.models.event_category,
              required: true,
              attributes: ['id', 'name', 'icon', 'iconColor']
            },
            {
              model: sequelize.models.city,
              required: true,
              attributes: ['id', 'name'],
              include: {
                model: sequelize.models.province,
                required: true,
                attributes: ['id', 'name']
              }
            }
          ]
        }
      }
    }
  })
  return event
}
