module.exports = (sequelize, Sequelize) => {
  const Comm_Category = sequelize.define("Comm_Category", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    }
  });
  return Comm_Category;
};
