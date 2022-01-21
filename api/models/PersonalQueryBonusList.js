const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusList = 'queryBonuslist';

const PersonalQueryBonusList = sequelize.define('V_HILAL_API_MEM_BONUS_NETT', {

distributorcode : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
fullnm : {
    type: Sequelize.STRING, 
  },

bonusyear : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },

bonusmonth : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },

netincome : {
    type: Sequelize.INTEGER, 
  },
totBonus : {
    type: Sequelize.INTEGER, 
  },
tax : {
    type: Sequelize.INTEGER, 
  },
ar_total : {
    type: Sequelize.INTEGER, 
  },
totBonus_Nett : {
    type: Sequelize.INTEGER, 
  },

}, {freezeTableName: true, timestamps: false, personalQueryBonusList });


module.exports = PersonalQueryBonusList;