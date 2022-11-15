module.exports = (sequelize, Sequelize) => {
  const community = sequelize.define('community', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    },
    description: {
      type: Sequelize.DataTypes.STRING
    }
  }, {
    scopes: {
      findAll: {
        include: {
          model: sequelize.models.comm_category,
          required: true,
          attributes: ['id', 'name', 'icon', 'iconColor']
        }
      },
      findOne: {
        include: {
          model: sequelize.models.comm_category,
          required: true,
          attributes: ['id', 'name', 'icon', 'iconColor']
        }
      },
      findByTerm (term) {
        const { Op } = require('sequelize')
        console.log('Term : ' + term)
        return {
          where: {
            [Op.or]: [
              {
                name: {
                  [Op.substring]: term
                }
              },
              {
                description: {
                  [Op.substring]: term
                }
              }
            ]
          },
          include: {
            model: sequelize.models.comm_category,
            required: true,
            attributes: ['id', 'name', 'icon', 'iconColor']
          }
        }
      },
      events: {
        include: [
          {
            model: sequelize.models.event,
            required: true,
            attributes: ['id', 'title', 'date', 'place', 'description', 'time', 'state'],
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
        ]

      }
    }
  })
  return community
}
