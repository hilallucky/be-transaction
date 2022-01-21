const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

let database1;


switch (process.env.NODE_ENV) {
  case 'production':
      database1 = new Sequelize(
      connection.db_golf.database,
      connection.db_golf.username,
      connection.db_golf.password, {
        host: connection.db_golf.host,
        dialect: connection.db_golf.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  case 'testing':
    database = new Sequelize(
      connection.db_golf.database,
      connection.db_golf.username,
      connection.db_golf.password, {
        host: connection.db_golf.host,
        dialect: connection.db_golf.dialect,
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
      connection.db_golf.database,
      connection.db_golf.username,
      connection.db_golf.password, {
        host: connection.db_golf.host,
        dialect: connection.db_golf.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    );
   
};


module.exports = database1;
