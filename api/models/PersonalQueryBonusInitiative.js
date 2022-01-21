const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusInitiative = 'queryBonusInitiative';

const PersonalQueryBonusInitiative = sequelize.define('V_HILAL_API_MEM_BONUS_INITIATIVE', {
  
    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    bonusmonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    bonusyear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    ODistributorCode : {
        type: Sequelize.STRING, 
      },
    fullnm : {
        type: Sequelize.STRING, 
      },
    BonusBV : {
        type: Sequelize.INTEGER, 
      },
    BonusRate : {
        type: Sequelize.INTEGER, 
      },
    TotalBonus : {
        type: Sequelize.INTEGER, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusInitiative });


module.exports = PersonalQueryBonusInitiative;