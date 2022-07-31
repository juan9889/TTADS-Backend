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
  },{
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
          include: {
            model: sequelize.models.event,
            required: true
          }
        }
      }
    }
  });
  return community;
};
