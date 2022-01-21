const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_transpaydatetmp = 'transpaydettmp';

const TransPayDateTmp = sequelize.define('ecomm_trans_paydet_sgo', {

      orderno : {
          type: Sequelize.STRING, primaryKey: true, allowNull: false,
        },
      seqno : {
          type: Sequelize.STRING, 
        },
      paytype : {
          type: Sequelize.STRING, 
        },
      docno : {
          type: Sequelize.STRING, 
        },
      payamt : {
          type: Sequelize.STRING, 
        },
      deposit : {
          type: Sequelize.STRING, 
        },
      notes : {
          type: Sequelize.STRING, 
        },
      paystatus : {
          type: Sequelize.STRING, 
        },
      bank_code_payment : {
          type: Sequelize.STRING, 
        },
      charge_admin : {
          type: Sequelize.STRING, 
        },
      expired_pay_time : {
          type: Sequelize.STRING, 
        },


}, {freezeTableName: true, timestamps: false, table_transpaydatetmp });


module.exports = TransPayDateTmp;