module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("ciudad", {
      nombre: {
        type: Sequelize.STRING
      }
    });
    return Tutorial;
  };
  