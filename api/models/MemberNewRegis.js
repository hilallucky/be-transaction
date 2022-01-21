const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_newregis = 'newregis';

const MemberNewRegis = sequelize.define('V_HILAL_API_MEMB_NEWAPP', {
  
dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
  email : {
    type: Sequelize.STRING, 
  },
  fullnm : {
    type: Sequelize.STRING, 
  },
  birthdt : {
    type: Sequelize.STRING, 
  },


}, {freezeTableName: true, timestamps: false, table_newregis });


module.exports = MemberNewRegis;