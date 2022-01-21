const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

let database;


switch (process.env.NODE_ENV) {
  case 'production':
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password, {
        host: connection.development.host,
        dialect: connection.development.dialect,
        pool: {
          max: 10, //5,
          min: 0,
          idle: 60000, //10000 
          acquire: 60000
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
          max: 10, //5,
          min: 0,
          idle: 60000, //10000 
          acquire: 60000
        },
      },
    );
    break;
  default:
    database = new Sequelize(
      connection.development.database,
      connection.development.username,
      connection.development.password, {
        host: connection.development.host,
        dialect: connection.development.dialect,
        dialectOptions: { connectTimeout: isDevEnv ? 15000 : 5000 }
        pool: {
          max: 10, //5,
          min: 0,
          idle: 60000, //10000 
          acquire: 60000
        },
        storage: path.join(process.cwd(), 'db', 'database.sqlite'),
      },
    );
   
};


module.exports = database;
