const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const voucherMLMData = 'voucherMLMData';

const VoucherMLMData = sequelize.define('V_HILAL_API_MEMB_CHECK_DATA', {

dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
fullnm : {
    type: Sequelize.STRING, 
  },

idno : {
    type: Sequelize.STRING, 
  },

sfno : {
    type: Sequelize.STRING, 
  },

sfno_reg : {
    type: Sequelize.STRING, 
  },
date_now :{
    type: Sequelize.STRING, 
  },

birthdt : {
    type: Sequelize.STRING, 
  },

bd_now : {
    type: Sequelize.STRING, 
  },

bd_exp_date : {
    type: Sequelize.STRING, 
  },

first_trans : {
    type: Sequelize.STRING, 
  },

last_trans : {
    type: Sequelize.STRING, 
  },

last_trans_orderno : {
    type: Sequelize.STRING, 
  },
memb_age : {
    type: Sequelize.INTEGER, 
  },
dayfromlatesttrans : {
    type: Sequelize.INTEGER, 
  },
yearfromlatesttrans : {
    type: Sequelize.INTEGER, 
  },
flag_yearago : {
    type: Sequelize.STRING, 
  },

}, {freezeTableName: true, timestamps: false, voucherMLMData });


module.exports = VoucherMLMData;