const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusLeadershipSumm = 'queryBonusLeadershipSumm';

const PersonalQueryBonusLeadershipSumm = sequelize.define('V_HILAL_API_MEM_BONUS_LEADERSHIP_SUMM', {
  
    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },

    fullnm : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    bonusmonth : {
        type: Sequelize.INTEGER, 
      },
    bonusyear : {
        type: Sequelize.INTEGER, 
      },
    distributorlevel : {
        type: Sequelize.INTEGER, 
      },
    levelpgbv : {
        type: Sequelize.INTEGER, 
      },
    levelrate : {
        type: Sequelize.INTEGER, 
      },
    levelincome : {
        type: Sequelize.INTEGER, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusLeadershipSumm });


module.exports = PersonalQueryBonusLeadershipSumm;