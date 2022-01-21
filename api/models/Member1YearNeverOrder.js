const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_member1yearneverorder = 'member1yearneverorder';

const Member1YearNeverOrder = sequelize.define('V_HILAL_API_MEMB_CHECK_DATA_NO_ORDER_YR', {
  
dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
  email : {
    type: Sequelize.STRING, 
  },
  fullnm : {
    type: Sequelize.STRING, 
  },


}, {freezeTableName: true, timestamps: false, table_member1yearneverorder });


module.exports = Member1YearNeverOrder;