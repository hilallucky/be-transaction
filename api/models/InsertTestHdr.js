const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_insertTestHdr = 'inserttesthdr';

const InsertTestHdr = sequelize.define('insertTestHdr', {
  
remark : {
    type: Sequelize.STRING, 
  },

}, {freezeTableName: true, timestamps: false, hasTrigger: true, table_insertTestHdr });


module.exports = InsertTestHdr;