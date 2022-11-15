module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.DataTypes.STRING
    },
    password: {
      type: Sequelize.DataTypes.STRING
    },
    name: {
      type: Sequelize.DataTypes.STRING
    },
    mail: {
      type: Sequelize.DataTypes.STRING
    }
  })
  return user
}
