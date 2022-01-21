const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personal_bv = 'check_bv';

const PersonalQueryBV = sequelize.define('V_HILAL_API_PERS_BV', {

year : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },

month : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },

dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
ppv : {
    type: Sequelize.INTEGER, 
  },
pobv : {
    type: Sequelize.INTEGER, 
  },
pgpv : {
    type: Sequelize.INTEGER, 
  },

}, {freezeTableName: true, timestamps: false, personal_bv });


module.exports = PersonalQueryBV;