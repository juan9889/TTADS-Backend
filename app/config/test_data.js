const sequelize = require('../database/database.js')
const City = sequelize.models.city
const Province = sequelize.models.province
const Comm_Category = sequelize.models.comm_category
const Community = sequelize.models.community
const Event_Category = sequelize.models.event_category
const Event = sequelize.models.event

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
    return
  }
  const provincia = {
    name: req.body.name
  }
  Province.create(provincia)
    .then(data => {
      res.status(201).send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.name + ': ' + err.message || 'Some error occurred while creating '
      })
    })
}

exports.fillData = async () => {
  console.log('Verificando si la bd esta vacia...')
  const index_sum_result = await sequelize.query('select ((select count(*) from cities) + (select count(*) from provinces) + (select count(*) from communities) + (select count(*) from comm_categories) + (select count(*) from event_categories) + (select count(*) from events)) as result;', { raw: true })
  console.log('Row count : ' + index_sum_result[0][0].result)
  const index_sum = index_sum_result[0][0].result
  if (index_sum === 0) {
    console.log('La base de datos esta vacia, insertando datos de prueba...')
    console.log('Creando provincias...')
    provincia = {
      name: 'Santa Fe'
    }
    await Province.create(provincia)
    provincia = {
      name: 'Buenos Aires'
    }
    await Province.create(provincia)
    provincia = {
      name: 'La Pampa'
    }
    await Province.create(provincia)
    provincia = {
      name: 'Cordoba'
    }
    await Province.create(provincia)
    provincia = {
      name: 'Mendoza'
    }
    await Province.create(provincia)
    console.log('Creando ciudades...')
    ciudad = ({
      name: 'Venado Tuerto',
      provinceId: 1
    })
    await City.create(ciudad)
    ciudad = ({
      name: 'Rosario',
      provinceId: 1
    })
    await City.create(ciudad)
    ciudad = ({
      name: 'Rio Tercero',
      provinceId: 4
    })
    await City.create(ciudad)
    ciudad = ({
      name: 'San Rafael',
      provinceId: 5
    })
    await City.create(ciudad)
    ciudad = ({
      name: 'San Lorenzo',
      provinceId: 1
    })
    await City.create(ciudad)
    ciudad = ({
      name: 'Capitan Bermudez',
      provinceId: 1
    })
    await City.create(ciudad)
    console.log('Creando categorias de comunidades...')
    comm_category = ({
      name: 'Estudio',
      icon: 'school',
      iconColor: 'pink'
    })
    await Comm_Category.create(comm_category)
    comm_category = ({
      name: 'Fulbo',
      icon: 'soccer',
      iconColor: 'info'
    })
    await Comm_Category.create(comm_category)
    comm_category = ({
      name: 'Birrita',
      icon: 'glass-mug-variant',
      iconColor: 'warning'
    })
    await Comm_Category.create(comm_category)
    comm_category = ({
      name: 'Musica',
      icon: 'guitar-acoustic',
      iconColor: 'success'
    })
    await Comm_Category.create(comm_category)
    console.log('Creando comunidades...')
    community = ({
      name: 'Comision 101 ISI UTN',
      description: 'Comunidad de estudiantes de la comision 101 de la utn rosario',
      categoryId: 1
    })
    await Community.create(community)
    community = ({
      name: 'Comision 102 ISI UTN',
      description: 'Comunidad de estudiantes de la comision 102 de la utn rosario',
      categoryId: 1
    })
    await Community.create(community)
    community = ({
      name: 'Partidos de futbol',
      description: 'Organizamos partidos de futbol',
      categoryId: 2
    })
    await Community.create(community)
    community = ({
      name: 'Conciertos rosario',
      description: 'Aca vas a mantenerte actualizado sobre los proximos recitales de bandas que nadie conoce',
      categoryId: 4
    })
    await Community.create(community)
    community = ({
      name: 'Juntadas para bares',
      description: 'Organizamos salidas grupales a distintos bares',
      categoryId: 3
    })
    await Community.create(community)
    console.log('Creando categorias de eventos...')
    event_category = ({
      name: 'Sesion de estudio',
      icon: 'school',
      iconColor: 'primary'
    })
    await Event_Category.create(event_category)
    event_category = ({
      name: 'Reunion',
      icon: 'account-group',
      iconColor: 'success'
    })
    await Event_Category.create(event_category)
    event_category = ({
      name: 'Concierto',
      icon: 'stadium',
      iconColor: 'info'
    })
    await Event_Category.create(event_category)
    event_category = ({
      name: 'Partido de futbol',
      icon: 'soccer',
      iconColor: 'info'
    })
    await Event_Category.create(event_category)
    console.log('Creando eventos...')
    event_crear = ({
      title: 'Partido el lunes',
      place: 'Cancha de futbol 5 de av. rondeau',
      description: 'El que pierde paga la coca',
      date: Date.now(),
      state: 'Pendiente',
      time: '23:00',
      cityId: 2,
      categoryId: 4,
      communityId: 3
    })
    await Event.create(event_crear)
    event_crear = ({
      title: 'Noche de karaoke',
      place: 'Bar en calle cordoba 2342',
      description: 'Nos juntamos el viernes a la noche para una noche de karaoke',
      date: Date.now(),
      state: 'Pendiente',
      time: '23:00',
      cityId: 2,
      categoryId: 2,
      communityId: 5
    })
    await Event.create(event_crear)
    event_crear = ({
      title: 'Repaso para el parcial',
      place: 'Bar de la facu',
      description: 'Nos juntamos a repasar para el parcial de mañana',
      date: Date.now(),
      state: 'Pendiente',
      time: '23:00',
      cityId: 2,
      categoryId: 1,
      communityId: 1
    })
    await Event.create(event_crear)
    console.log('Datos de prueba creados')
  } else {
    console.log('La base de datos no esta vacia')
  }
}
function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
