const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusSales = 'queryBonusSales';

const PersonalQueryBonusSales = sequelize.define('V_HILAL_API_MEM_BONUS_SALES', {
  
    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    bonusyear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    bonusmonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    bnsperiod : {
        type: Sequelize.DATE, 
      },
    trcd : {
        type: Sequelize.STRING, 
      },
    ndp : {
        type: Sequelize.INTEGER, 
      },
    nbv : {
        type: Sequelize.INTEGER, 
      },
    transdate : {
        type: Sequelize.DATE, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusSales });


module.exports = PersonalQueryBonusSales;