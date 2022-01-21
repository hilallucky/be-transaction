const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusLevelDet = 'queryBonusLevelDet';

const PersonalQueryBonusLevelDet = sequelize.define('V_HILAL_API_MEM_BONUS_LVL_MEM', {
  
    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    bonusmonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    bonusyear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    distributorlevel : {
        type: Sequelize.INTEGER, 
      },
    addinfinityincome : {
        type: Sequelize.INTEGER, 
      },
    levelpbv : {
        type: Sequelize.INTEGER, 
      },
    levelrate : {
        type: Sequelize.INTEGER, 
      },
    levelincome : {
        type: Sequelize.INTEGER, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusLevelDet });


module.exports = PersonalQueryBonusLevelDet;