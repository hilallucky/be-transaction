const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_memberneverorder = 'memberneverorder';

const MemberNeverOrder = sequelize.define('V_HILAL_API_MEMB_CHECK_DATA_NO_ORDER', {
  
dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
  email : {
    type: Sequelize.STRING, 
  },
  fullnm : {
    type: Sequelize.STRING, 
  },


}, {freezeTableName: true, timestamps: false, table_memberneverorder });


module.exports = MemberNeverOrder;