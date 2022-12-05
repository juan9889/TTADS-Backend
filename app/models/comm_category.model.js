const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  const comm_category = sequelize.define('comm_category', {
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
  }, {
    scopes: {
      communities () {
        return {
          include: {
            model: sequelize.models.community,
            required: true,
            attributes: ['id', 'name'],
            include: {
              model: sequelize.models.comm_category,
              required: true,
              attributes: ['id', 'name', 'icon', 'iconColor']
            }
          }
        }
      }
    }
  }
  )
  return comm_category
}
