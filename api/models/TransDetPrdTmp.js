const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_transdetprdtmp = 'transdetprdtmp';

const TransDetPrdTmp = sequelize.define('ecomm_trans_det_prd_sgo', {

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
      orderno_group_trans : {
          type: Sequelize.STRING,
        }, 
      prdcd_package : {
          type: Sequelize.STRING, 
        },
      prdcd_original : {
          type: Sequelize.STRING,
        }, 
        

}, {freezeTableName: true, timestamps: false,  hasTrigger: true, table_transdetprdtmp });


module.exports = TransDetPrdTmp;