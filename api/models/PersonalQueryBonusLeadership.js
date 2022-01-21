const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusLeadership = 'queryBonusLeadership';

const PersonalQueryBonusLeadership = sequelize.define('V_HILAL_API_MEM_BONUS_LEADERSHIP', {
  
    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },

    odistributorcode : {
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
    effectiverank : {
        type: Sequelize.INTEGER, 
      },
    pgbv : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv1 : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv2 : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv3 : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv4 : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv5 : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv6 : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv7 : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv8 : {
        type: Sequelize.INTEGER, 
      },
    incomepgbv9 : {
        type: Sequelize.INTEGER, 
      },
    totalpgbv : {
        type: Sequelize.INTEGER, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusLeadership });


module.exports = PersonalQueryBonusLeadership;