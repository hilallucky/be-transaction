const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusDetail3 = 'queryBonusDetail3';

const PersonalQueryBonusDetail3 = sequelize.define('V_HILAL_API_MEM_BONUS_DETAIL', {
  
    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    bonusyear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false, 
      },
    bonusmonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false, 
      },
    sponsorcode : {
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
    planbincome : {
        type: Sequelize.INTEGER, 
      },
    gpincome : {
        type: Sequelize.INTEGER, 
      },
    ldbincome : {
        type: Sequelize.INTEGER, 
      },
    ldbtotalpoint : {
        type: Sequelize.INTEGER, 
      },
    ldbpointvalue : {
        type: Sequelize.INTEGER, 
      },
    sredincome : {
        type: Sequelize.INTEGER, 
      },
    crownincome : {
        type: Sequelize.INTEGER, 
      },
    caincome : {
        type: Sequelize.INTEGER, 
      },
    scaincome : {
        type: Sequelize.INTEGER, 
      },
    rcaincome : {
        type: Sequelize.INTEGER, 
      },
    chincome : {
        type: Sequelize.INTEGER, 
      },
    infinityincome : {
        type: Sequelize.INTEGER, 
      },
    gpsharing3income : {
        type: Sequelize.INTEGER, 
      },
    gpsharing3points : {
        type: Sequelize.INTEGER, 
      },
    netincome : {
        type: Sequelize.INTEGER, 
      },
    lastmonthyend : {
        type: Sequelize.INTEGER, 
      },
    currentyend : {
        type: Sequelize.INTEGER, 
      },
    accyend : {
        type: Sequelize.INTEGER, 
      },
    lastmonthoversea : {
        type: Sequelize.INTEGER, 
      },
    currentoversea : {
        type: Sequelize.INTEGER, 
      },
    accoversea : {
        type: Sequelize.INTEGER, 
      },
    capointvalue : {
        type: Sequelize.INTEGER, 
      },
    scapointvalue : {
        type: Sequelize.INTEGER, 
      },
    rcapointvalue : {
        type: Sequelize.INTEGER, 
      },
    chpointvalue : {
        type: Sequelize.INTEGER, 
      },
    addinfinityincome : {
        type: Sequelize.INTEGER, 
      },
    pspointvalue : {
        type: Sequelize.INTEGER, 
      },
    gpsharing1income : {
        type: Sequelize.INTEGER, 
      },
    gpsharing1points : {
        type: Sequelize.INTEGER, 
      },
    gpsharing2income : {
        type: Sequelize.INTEGER, 
      },
    gpsharing2points : {
        type: Sequelize.INTEGER, 
      },
    gps3pointvalue : {
        type: Sequelize.INTEGER, 
      },
    gps1pointvalue : {
        type: Sequelize.INTEGER, 
      },
    gps2pointvalue : {
        type: Sequelize.INTEGER, 
      },
    totaladjustedamt : {
        type: Sequelize.INTEGER, 
      },
    remark : {
        type: Sequelize.INTEGER, 
      },
    CAShare : {
        type: Sequelize.INTEGER, 
      },
    CHShare : {
        type: Sequelize.INTEGER, 
      },
    scashare : {
        type: Sequelize.INTEGER, 
      },
    crownshare : {
        type: Sequelize.INTEGER, 
      },
    rcashare : {
        type: Sequelize.INTEGER, 
      },
    psharingincome : {
        type: Sequelize.INTEGER, 
      },
    psharingpoints : {
        type: Sequelize.INTEGER, 
      },


}, {freezeTableName: true, timestamps: false, personalQueryBonusDetail3 });


module.exports = PersonalQueryBonusDetail3;