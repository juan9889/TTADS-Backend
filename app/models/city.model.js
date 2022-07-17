module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("City", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.DataTypes.STRING
    }
  });
  return City;
};
