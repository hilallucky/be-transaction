const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

let database1;


switch (process.env.NODE_ENV) {
  case 'production':
    database = new Sequelize(
      connection.production.database,
      connection.production.username,
      connection.production.password, {
        host: connection.production.host,
        dialect: connection.production.dialect,
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
      connection.testing.database,
      connection.testing.username,
      connection.testing.password, {
        host: connection.testing.host,
        dialect: connection.testing.dialect,
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
      connection.klink_mysql.database,
      connection.klink_mysql.username,
      connection.klink_mysql.password, {
        host: connection.klink_mysql.host,
        dialect: connection.klink_mysql.dialect,
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
