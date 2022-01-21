const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_insertTestDet = 'instertestdet';

const insertTestDet = sequelize.define('insertTestDet', {
  
id_hdr : {
    type: Sequelize.INTEGER, 
  },

  remark_det : {
    type: Sequelize.STRING, 
  },



}, {freezeTableName: true, timestamps: false, hasTrigger: true, table_insertTestDet });


module.exports = insertTestDet;