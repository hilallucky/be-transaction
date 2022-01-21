const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusDownline = 'queryBonusDownline';

const PersonalQueryBonusDownline = sequelize.define('V_HILAL_API_MEM_BONUS_DOWNLINE', {

    sponsorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    
    bonusmonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    
    bonusyear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    
    distributorcode : {
        type: Sequelize.DATE, 
      },
    fullnm : {
        type: Sequelize.STRING, 
      },
    currentrank : {
        type: Sequelize.INTEGER, 
      },
    adjustedrank : {
        type: Sequelize.INTEGER, 
      },
    effectiverank : {
        type: Sequelize.DATE, 
      },
    ppv : {
        type: Sequelize.INTEGER, 
      },
    pgpv : {
        type: Sequelize.INTEGER, 
      },
    gpv : {
        type: Sequelize.INTEGER, 
      },
    AccPGPV : {
        type: Sequelize.INTEGER, 
      },
    pbv : {
        type: Sequelize.INTEGER, 
      },
    gbv : {
        type: Sequelize.INTEGER, 
      },
    pbvb : {
        type: Sequelize.INTEGER, 
      },
    gbvb : {
        type: Sequelize.INTEGER, 
      },
    pgbv : {
        type: Sequelize.INTEGER, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusDownline });


module.exports = PersonalQueryBonusDownline;