module.exports = (sequelize, Sequelize) => {
  const comm_category = sequelize.define("comm_category", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    }
  }, {
    scopes: {
      communities(categoryId) {
        return {
          where: {
            id: categoryId
          },
          include: {
            model: sequelize.models.community,
            required: true,
            include: {
              model: sequelize.models.comm_category,
              required: true
            }
          }
        }
      }
    }
  }
  );
  return comm_category;
};
