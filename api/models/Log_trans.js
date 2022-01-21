const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');
// const TransHeaderTmpDel = require('../models/TransHeaderTmpDel');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const log_trans = 'log_trans';

const Log_trans = sequelize.define('log_trans', {
      log_dfno : {
          type: Sequelize.STRING, 
        },
      log_date : {
                type: Sequelize.STRING, 
              },
      log_trcd : {
                type: Sequelize.STRING, 
              },
      log_sento : {
                type: Sequelize.STRING, 
              },
      log_totaldp_sales : {
                type: Sequelize.STRING, 
              },
      log_totaldp_pay : {
                type: Sequelize.STRING, 
              },
      log_status_trx : {
                type: Sequelize.STRING, 
              },
      log_usrlogin : {
                type: Sequelize.STRING, 
              },
      trans_status : {
                type: Sequelize.STRING, 
              },
      apps_name : {
                type: Sequelize.STRING, 
              },
      log_ipaddress : {
                type: Sequelize.STRING, 
              },
      confirmURL : {
                type: Sequelize.STRING, 
              },


}, {freezeTableName: true, timestamps: false,  hasTrigger: true, log_trans });


module.exports = Log_trans;