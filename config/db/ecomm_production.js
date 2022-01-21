const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

let database1;


switch (process.env.NODE_ENV) {
  case 'production':
    database1 = new Sequelize(
      connection.ecomm_production.database,
      connection.ecomm_production.username,
      connection.ecomm_production.password, {
        host: connection.ecomm_production.host,
        dialect: connection.ecomm_production.dialect,
        pool: {
          max: 10,
          min: 0,
          idle: 5000,
          acquire: 10000,
        },
      },
    );
    break;
  case 'testing':
    database = new Sequelize(
      connection.ecomm_production.database,
      connection.ecomm_production.username,
      connection.ecomm_production.password, {
        host: connection.ecomm_production.host,
        dialect: connection.ecomm_production.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  default:
     database1 = new Sequelize(
      connection.ecomm_production.database,
      connection.ecomm_production.username,
      connection.ecomm_production.password, {
        host: connection.ecomm_production.host,
        dialect: connection.ecomm_production.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 5000,
          acquire: 10000,
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    );
   
};


module.exports = database1;
