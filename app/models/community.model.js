module.exports = (sequelize, Sequelize) => {
  const community = sequelize.define("community", {
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
      details(communityId) {
        return {
          where: {
            id: communityId
          },
          include: {
            model: sequelize.models.comm_category,
            required: true
          }
        }
      },
      events(communityId) {
        return {
          where: {
            id: communityId
          },
          include: [
            {
              model: sequelize.models.event,
              required: true,
              include: [
                {
                  model: sequelize.models.community,
                  // as: 'community',
                  required: true
                },
                {
                  model: sequelize.models.event_category,
                  // as: 'category',
                  required: true
                },
                {
                  model: sequelize.models.city,
                  // as: 'city',
                  required: true,
                  include: {
                    model: sequelize.models.province,
                    required: true
                  }
                },
              ]
            },
            {
              model: sequelize.models.comm_category,
              required: true
            }
          ]
        }
      }
    }
  });
  return community;
};
