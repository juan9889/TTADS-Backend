const { Sequelize, Op } = require("sequelize");
const sequelize = require("../database/database.js");
const City = sequelize.models.city;
const Province = sequelize.models.province;

exports.fillData = async() => {
    console.log('Verificando si la bd esta vacia...');
    index_sum_result=await sequelize.query('select ((select count(*) from cities) + (select count(*) from provinces) + (select count(*) from communities) + (select count(*) from comm_categories) + (select count(*) from event_categories) + (select count(*) from events)) as result;', { raw: true });
    console.log('Row count : '+index_sum_result[0][0].result);
    index_sum=index_sum_result[0][0].result;
    if(index_sum==0){
        console.log('La base de datos esta vacia, insertando datos de prueba...');
        console.log('Creando provincias...');
        provincia = {
            name: 'Santa Fe'
          };
        Province.create(provincia);
        provincia = {
            name: 'Buenos Aires'
          };
        Province.create(provincia);
        provincia = {
            name: 'La Pampa'
          };
        Province.create(provincia);
        provincia = {
            name: 'Cordoba'
          };
        Province.create(provincia);
        provincia = {
            name: 'Mendoza'
          };
        Province.create(provincia);
        console.log('Creando ciudades...');
        ciudad = ({
            name: 'Rosario',
            provinceId: 1
          });
        City.create(ciudad);
        ciudad = ({
            name: 'Rosario',
            provinceId: 1
          });
        City.create(ciudad);
        ciudad = ({
            name: 'Rio Tercero',
            provinceId: 4
          });
        City.create(ciudad);
        ciudad = ({
            name: 'San Rafael',
            provinceId: 5
          });
        City.create(ciudad);
        ciudad = ({
            name: 'San Lorenzo',
            provinceId: 1
          });
        City.create(ciudad);
        ciudad = ({
            name: 'Capitan Bermudez',
            provinceId: 1
          });
        City.create(ciudad);
    }else{
        console.log('La base de datos no esta vacia');
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

