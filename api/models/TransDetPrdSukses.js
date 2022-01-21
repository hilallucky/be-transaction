const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_transdetprd = 'transdetprd';

const TransDetPrdSukses = sequelize.define('ecomm_trans_det_prd', {

       orderno : {
          type: Sequelize.STRING,  primaryKey: true, allowNull: false,
        },
      prdcd : {
          type: Sequelize.STRING, 
        },
      prdnm : {
          type: Sequelize.STRING, 
        },
      qty : {
          type: Sequelize.STRING, 
        },
      bvr : {
          type: Sequelize.STRING, 
        },
      dpr : {
          type: Sequelize.STRING, 
        },
      pricecode : {
          type: Sequelize.STRING, 
        },
      sentTo : {
          type: Sequelize.STRING, 
        },
      ByrSisaSales : {
          type: Sequelize.STRING, 
        },
      cpr : {
          type: Sequelize.STRING, 
        },
      profit_d : {
          type: Sequelize.STRING, 
        },




}, {freezeTableName: true, timestamps: false,  hasTrigger: true, table_transdetprd });


module.exports = TransDetPrdSukses;