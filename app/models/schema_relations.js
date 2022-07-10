function applySchemaRelations(sequelize) {
	const { city, province } = sequelize.models;

	province.hasMany(city);
	city.belongsTo(province);
}

module.exports = { applySchemaRelations };