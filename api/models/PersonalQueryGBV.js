const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personal_gbv = 'check_gbv';

const PersonalQueryGBV = sequelize.define('V_HILAL_API_PERS_GROUPBV', {
dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
fullnm : {
    type: Sequelize.STRING, 
  },
sfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
sp_name : {
    type: Sequelize.STRING, 
  },
jointdt : {
    type: Sequelize.STRING, 
  },
level : {
    type: Sequelize.STRING, 
  },
ranknm : {
    type: Sequelize.STRING, 
  },
shortnm : {
    type: Sequelize.STRING, 
  },
ppv : {
    type: Sequelize.INTEGER, 
  },
popv : {
    type: Sequelize.INTEGER, 
  },
pgpv : {
    type: Sequelize.INTEGER, 
  },

year : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },

month : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },

}, {freezeTableName: true, timestamps: false, personal_gbv });


module.exports = PersonalQueryGBV;