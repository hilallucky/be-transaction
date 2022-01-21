const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_checkHbd = 'checkHbd';

const BirthdayNotification = sequelize.define('V_HILAL_API_MEMB_CHECK_DATA2', {
  
dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
  email : {
    type: Sequelize.STRING, 
  },
  fullnm : {
    type: Sequelize.STRING, 
  },


}, {freezeTableName: true, timestamps: false, table_checkHbd });


module.exports = BirthdayNotification;