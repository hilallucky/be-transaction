const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_transpaydate = 'transpaydet';

const TransPayDateSukses = sequelize.define('ecomm_trans_paydet', {

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


}, {freezeTableName: true, timestamps: false, hasTrigger: true, table_transpaydate });


module.exports = TransPayDateSukses;