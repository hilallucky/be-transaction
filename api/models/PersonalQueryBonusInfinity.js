const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusInfinity = 'queryBonusInfinity';

const PersonalQueryBonusInfinity = sequelize.define('V_HILAL_API_MEM_BONUS_INFINITY', {
  
    bonusYear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    bonusMonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    distributorCode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    sponsor : {
        type: Sequelize.STRING, 
      },
    odistributorCode : {
        type: Sequelize.STRING, 
      },
    fullnm : {
        type: Sequelize.STRING, 
      },
    infinitybv : {
        type: Sequelize.INTEGER, 
      },
    bonusRate : {
        type: Sequelize.INTEGER, 
      },
    totalBonus : {
        type: Sequelize.INTEGER, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusInfinity });


module.exports = PersonalQueryBonusInfinity;