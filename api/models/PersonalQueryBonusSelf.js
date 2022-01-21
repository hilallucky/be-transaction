const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusSelf = 'queryBonusSelf';

const PersonalQueryBonusSelf = sequelize.define('V_HILAL_API_MEM_BONUS_SELF', {
    
    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    bonusmonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    bonusyear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    fullnm : {
        type: Sequelize.STRING, 
      },
    dist_address : {
        type: Sequelize.STRING, 
      },
    sponsorcode : {
        type: Sequelize.STRING, 
      },
    sp_name : {
        type: Sequelize.STRING, 
      },
    currentrank : {
        type: Sequelize.INTEGER, 
      },
    adjustedrank : {
        type: Sequelize.INTEGER, 
      },
    effectiverank : {
        type: Sequelize.INTEGER, 
      },
    pgbv : {
        type: Sequelize.INTEGER, 
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

}, {freezeTableName: true, timestamps: false, personalQueryBonusSelf });


module.exports = PersonalQueryBonusSelf;