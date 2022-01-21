const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

let database;


switch (process.env.NODE_ENV) {
  case 'production':
     database = new Sequelize(
      connection.klink_mlm2010.database,
      connection.klink_mlm2010.username,
      connection.klink_mlm2010.password, {
        host: connection.klink_mlm2010.host,
        dialect: connection.klink_mlm2010.dialect,
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
      connection.klink_mlm2010.database,
      connection.klink_mlm2010.username,
      connection.klink_mlm2010.password, {
        host: connection.klink_mlm2010.host,
        dialect: connection.klink_mlm2010.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      },
    );
    break;
  default:
    database = new Sequelize(
      connection.klink_mlm2010.database,
      connection.klink_mlm2010.username,
      connection.klink_mlm2010.password, {
        host: connection.klink_mlm2010.host,
        dialect: connection.klink_mlm2010.dialect,
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    );
   
};


module.exports = database;
