function applySchemaRelations (sequelize) {
  const { city, province, comm_category, event_category, community, event } = sequelize.models
  // city province
  province.hasMany(city, {
    foreignKey: 'provinceId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  city.belongsTo(province, {
    foreignKey: 'provinceId',
    targetId: 'id'
  })
  // community community_category
  comm_category.hasMany(community, {
    foreignKey: 'categoryId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  community.belongsTo(comm_category, {
    foreignKey: 'categoryId',
    targetId: 'id'
  })
  // event event_category
  event_category.hasMany(event, {
    foreignKey: 'categoryId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  event.belongsTo(event_category, {
    foreignKey: 'categoryId',
    targetId: 'id'
  })
  // event community
  community.hasMany(event, {
    foreignKey: 'communityId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  event.belongsTo(community, {
    foreignKey: 'communityId',
    targetId: 'id'
  })
  // event city
  city.hasMany(event, {
    foreignKey: 'cityId',
    sourceKey: 'id',
    onDelete: 'RESTRICT'
  })
  event.belongsTo(city, {
    foreignKey: 'cityId',
    targetId: 'id'
  })
}

module.exports = { applySchemaRelations }
