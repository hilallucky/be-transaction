const Sequelize = require('sequelize');
const sequelize = require('../../config/db/rds_mysql');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_test = 'test';

const test = sequelize.define('test', {

  	firstname : {
    type: Sequelize.STRING, 
  },
  	lastname : {
    type: Sequelize.STRING, 
  },
  email : {
    type: Sequelize.STRING, 
  },
  reg_date : {
    type: Sequelize.DATE, 
  },




}, {freezeTableName: true, timestamps: false,  table_test });


module.exports = test;