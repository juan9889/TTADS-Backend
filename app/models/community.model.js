module.exports = (sequelize, Sequelize) => {
  const Community = sequelize.define("Community", {
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
  });
  return Community;
};
