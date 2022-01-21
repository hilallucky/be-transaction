const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusUnilevel = 'queryBonusUnilevel';

const PersonalQueryBonusUnilevel = sequelize.define('V_HILAL_API_MEM_BONUS_UNILEVEL', {
  
    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },

    sponsorname : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },

    odistributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },

    fullnm : {
        type: Sequelize.STRING, 
      },
    bonusmonth : {
        type: Sequelize.INTEGER, 
      },
    bonusyear : {
        type: Sequelize.INTEGER, 
      },
    pbv : {
        type: Sequelize.INTEGER, 
      },
    incomepbv1 : {
        type: Sequelize.INTEGER, 
      },
    incomepbv2 : {
        type: Sequelize.INTEGER, 
      },
    incomepbv3 : {
        type: Sequelize.INTEGER, 
      },
    incomepbv4 : {
        type: Sequelize.INTEGER, 
      },
    incomepbv5 : {
        type: Sequelize.INTEGER, 
      },
    incomepbv6 : {
        type: Sequelize.INTEGER, 
      },
    incomepbv7 : {
        type: Sequelize.INTEGER, 
      },
    incomepbv8 : {
        type: Sequelize.INTEGER, 
      },
    incomepbv9 : {
        type: Sequelize.INTEGER, 
      },
    totalpbv : {
        type: Sequelize.INTEGER, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusUnilevel });


module.exports = PersonalQueryBonusUnilevel;