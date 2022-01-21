const Sequelize = require('sequelize');
const path = require('path');

const connection = require('./connection');

let database;


switch (process.env.NODE_ENV) {
  case 'production':
    database = new Sequelize(
      connection.k_mart_conn.database,
      connection.k_mart_conn.username,
      connection.k_mart_conn.password, {
        host: connection.k_mart_conn.host,
        dialect: connection.k_mart_conn.dialect,
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
      connection.k_mart_conn.database,
      connection.k_mart_conn.username,
      connection.k_mart_conn.password, {
        host: connection.k_mart_conn.host,
        dialect: connection.k_mart_conn.dialect,
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
      connection.k_mart_conn.database,
      connection.k_mart_conn.username,
      connection.k_mart_conn.password, {
        host: connection.k_mart_conn.host,
        dialect: connection.k_mart_conn.dialect,
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
