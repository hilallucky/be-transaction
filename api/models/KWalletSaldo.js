const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const saldo_kwallet = 'saldo';

const KWallet = sequelize.define('V_HILAL_API_KWALLET_SALDO', { //va_cust_pay_bal

trcd : {
    type: Sequelize.STRING, 
  },
trdt : {
    type: Sequelize.DATE, 
  },
novac : {
    type: Sequelize.STRING, 
  },
dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
fullnm : {
    type: Sequelize.STRING, 
  },
idno : {
    type: Sequelize.STRING, 
  },
type : {
    type: Sequelize.STRING, 
  },
refno : {
    type: Sequelize.STRING, 
  },
amount : {
    type: Sequelize.INTEGER, 
  },
status : {
    type: Sequelize.STRING, 
  },
custtype : {
    type: Sequelize.STRING, 
  },
description : {
    type: Sequelize.STRING, 
  },
remarks : {
    type: Sequelize.STRING, 
  },


}, {freezeTableName: true, timestamps: false, saldo_kwallet });


module.exports = KWallet;