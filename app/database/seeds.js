const sequelize = require('./database.js')
const misc = require('./mdiIcons.js')
const crypto = require('crypto')
const { faker } = require('@faker-js/faker')
const queryInterface = sequelize.getQueryInterface()

exports.fillData = async () => {
  try {
    console.log('\x1b[33m%s\x1b[0m', 'Verificando si la bd esta vacia...')
    const index_sum_result = await sequelize.query('select ((select count(*) from cities) + (select count(*) from provinces) + (select count(*) from communities) + (select count(*) from comm_categories) + (select count(*) from event_categories) + (select count(*) from events)) as result;', { raw: true })
    // console.log('\x1b[33m%s\x1b[0m', 'Row count : ' + index_sum_result[0][0].result)
    const index_sum = index_sum_result[0][0].result
    if (index_sum === 0) {
      // Provinces
      const provinces = [...Array(9)].map((procince) => (
        {
          name: faker.address.state(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      await queryInterface.bulkInsert('provinces', provinces, {})
      // Cities
      const cities = [...Array(25)].map((city) => (
        {
          name: faker.address.cityName(),
          provinceId: faker.random.numeric(1),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      await queryInterface.bulkInsert('cities', cities, {})
      // Users
      const users = [...Array(100)].map((user) => (
        {
          username: faker.internet.userName(),
          usedOauth: 0,
          password: crypto.createHash('sha256').update(faker.internet.password(8)).digest('hex'),
          name: faker.name.fullName(),
          mail: faker.internet.email(),
          admin: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          cityId: faker.datatype.number({ min: 1, max: cities.length })
        }
      ))
      await queryInterface.bulkInsert('users', users, {})
      /// //////////////////////////
      // Community categories
      const categoriesIcon = misc.getAllMaterialIconsList().map((icon) => ({ iconName: icon }))
      const categoriesIconColors = [
        { iconColor: 'success' }, { iconColor: 'pink' },
        { iconColor: 'info' }, { iconColor: 'warning' }, { iconColor: 'red' }
      ]
      const comm_categories = [...Array(5)].map((cat, index) => (
        {
          name: faker.animal.type(),
          icon: categoriesIcon[index].iconName,
          iconColor: categoriesIconColors[index].iconColor,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      await queryInterface.bulkInsert('comm_categories', comm_categories, {})
      // Communities
      const communities = [...Array(10)].map((community) => (
        {
          name: faker.animal.dog(),
          description: faker.lorem.sentences(1),
          categoryId: faker.datatype.number({ min: 1, max: comm_categories.length }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      await queryInterface.bulkInsert('communities', communities, {})
      /// //////////////////////////
      // Events categories
      const event_categories = [...Array(5)].map((cat, index) => (
        {
          name: faker.commerce.product(),
          icon: categoriesIcon[index].iconName,
          iconColor: categoriesIconColors[index].iconColor,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      await queryInterface.bulkInsert('event_categories', event_categories, {})
      // Events
      const events = [...Array(100)].map((event) => (
        {
          title: faker.commerce.productName(),
          place: faker.address.streetAddress(),
          description: faker.commerce.productDescription(),
          date: faker.date.future(),
          time: faker.random.numeric(1) + ':00',
          state: faker.datatype.number({ min: 0, max: 2 }),
          categoryId: faker.datatype.number({ min: 1, max: event_categories.length }),
          communityId: faker.datatype.number({ min: 1, max: communities.length }),
          cityId: faker.datatype.number({ min: 1, max: cities.length }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ))
      await queryInterface.bulkInsert('events', events, {})
      /// //////////////////////////
      // Event User
      const user_events = users.map((user, index) => (
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: index + 1,
          eventId: faker.datatype.number({ min: 1, max: events.length })
        }
      ))
      await queryInterface.bulkInsert('user_events', user_events, {})
      // Event community
      const user_communities = users.map((user, index) => (
        {
          mod: faker.datatype.number({ min: 0, max: 1 }),
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: index + 1,
          communityId: faker.datatype.number({ min: 1, max: communities.length })
        }
      ))
      await queryInterface.bulkInsert('user_communities', user_communities, {})
      console.log('\x1b[33m%s\x1b[0m', 'Datos de prueba creados.\n\n  PROCEDA\n\n')
    } else {
      console.log('\x1b[33m%s\x1b[0m', 'La base de datos tiene datos.\n\n PROCEDA\n\n')
    }
  } catch (err) {
    console.log('\x1b[31m%s\x1b[0m', '\n  Error al cargar los datos de prueba\n')
  }
}
// eslint-disable-next-line no-unused-vars
async function eventosCommunity () {
  // Community categories
  const comm_categoriesData = [
    { name: 'Musica', icon: 'guitar-acoustic', iconColor: 'success' },
    { name: 'Estudio', icon: 'school', iconColor: 'pink' },
    { name: 'Futbol', icon: 'soccer', iconColor: 'info' },
    { name: 'Bares', icon: 'glass-mug-variant', iconColor: 'warning' }
  ]
  const comm_categories = comm_categoriesData.map((cat) => (
    {
      name: cat.name,
      icon: cat.icon,
      iconColor: cat.iconColor,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ))
  await queryInterface.bulkInsert('comm_categories', comm_categories, {})
  // Communities
  const communitiesNames = [
    { name: 'Comision 101 ISI UTN', cat: 2 }, { name: 'Comision 301 ISI UTN', cat: 2 },
    { name: 'Partidos de futbol', cat: 3 }, { name: 'Conciertos Rosario', cat: 1 },
    { name: 'Eventos Bares Centro', cat: 4 }]
  const communities = communitiesNames.map((community) => (
    {
      name: community.name,
      description: faker.lorem.sentences(1),
      categoryId: community.cat,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ))
  await queryInterface.bulkInsert('communities', communities, {})
  /// //////////////////////////
  // Events categories
  const event_categoriesData = [
    { name: 'Reunion', icon: 'account-group', iconColor: 'success' },
    { name: 'Concierto', icon: 'stadium', iconColor: 'info' },
    { name: 'Partido', icon: 'basketball', iconColor: 'info' },
    { name: 'Fiesta', icon: 'glass-mug-variant', iconColor: 'warning' }
  ]
  const event_categories = event_categoriesData.map((cat) => (
    {
      name: cat.name,
      icon: cat.icon,
      iconColor: cat.iconColor,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ))
  await queryInterface.bulkInsert('event_categories', event_categories, {})
  // Events
  const eventsNames = [
    { name: 'Partido F5 el Lunes', cat: 3 },
    { name: 'Noche de karaoke', cat: 4 },
    { name: 'Clase repaso Parcial', cat: 1 },
    { name: 'Basquet 3v3', cat: 3 }]
  const events = eventsNames.map((event) => (
    {
      title: event.name,
      place: faker.address.streetAddress(),
      description: faker.lorem.sentences(2),
      date: faker.date.future(),
      time: faker.random.numeric(1) + ':00',
      state: faker.datatype.number({ min: 0, max: 2 }),
      categoryId: faker.datatype.number({ min: 1, max: event_categories.length }),
      communityId: faker.datatype.number({ min: 1, max: communities.length }),
      // cityId: faker.datatype.number({ min: 1, max: cities.length }),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ))
  await queryInterface.bulkInsert('events', events, {})
}
