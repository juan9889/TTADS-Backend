module.exports = (sequelize, Sequelize) => {
  const user_event = sequelize.define('user_event', {
    id: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    }
  })
  return user_event
}
