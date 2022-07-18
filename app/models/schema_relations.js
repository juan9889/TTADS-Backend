function applySchemaRelations(sequelize) {
	const { City, Province, Comm_Category, Event_Category, Community, Event } = sequelize.models;
	//city province
	Province.hasMany(City, {
		foreignKey: 'provinceId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	City.belongsTo(Province, {
		foreignKey: 'provinceId',
		targetId: 'id',
	});
	//community community_category
	Comm_Category.hasMany(Community, {
		foreignKey: 'categoryId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	Community.belongsTo(Comm_Category, {
		foreignKey: 'categoryId',
		targetId: 'id'
	});
	//event event_category
	Event_Category.hasMany(Event, {
		foreignKey: 'categoryId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	Event.belongsTo(Event_Category, {
		foreignKey: 'categoryId',
		targetId: 'id'
	});
	//event community
	Community.hasMany(Event, {
		foreignKey: 'communityId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	Event.belongsTo(Community, {
		foreignKey: 'communityId',
		targetId: 'id'
	});
	//Event City
	City.hasMany(Event, {
		foreignKey: 'cityId',
		sourceKey: 'id',
		onDelete: 'RESTRICT'
	});
	Event.belongsTo(City, {
		foreignKey: 'cityId',
		targetId: 'id'
	})

}

module.exports = { applySchemaRelations };