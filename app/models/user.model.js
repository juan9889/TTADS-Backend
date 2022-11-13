module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("user", {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.DataTypes.STRING
    },
    user_password: {
      type: Sequelize.DataTypes.STRING
    }
    

  });
  return user;
};
