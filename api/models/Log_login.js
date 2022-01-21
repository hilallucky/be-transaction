const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');
// const TransHeaderTmpDel = require('../models/TransHeaderTmpDel');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const log_login = 'log_login';

const Log_login = sequelize.define('log_login', {
      log_dfno : {
          type: Sequelize.STRING, 
              },
      log_date : {
                type: Sequelize.STRING, 
              },
      log_status : {
                type: Sequelize.STRING, 
              },
      log_ipaddress : {
                type: Sequelize.STRING, 
              },
      appsname : {
                type: Sequelize.STRING, 
              },


}, {freezeTableName: true, timestamps: false,  hasTrigger: true, log_login });


module.exports = Log_login;