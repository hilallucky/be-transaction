const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusDetail = 'queryBonusDetail';

const PersonalQueryBonusDetail = sequelize.define('V_HILAL_API_MEM_BONUS_DETAIL_MEMB', {

    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    dfno : {
        type: Sequelize.STRING, 
      },
    fullnm : {
        type: Sequelize.STRING, 
      },
    bonusmonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    bonusyear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },
    addr1 : {
        type: Sequelize.STRING, 
      },
    addr2 : {
        type: Sequelize.STRING, 
      },
    addr3 : {
        type: Sequelize.STRING, 
      },
    sponsorcode : {
        type: Sequelize.STRING, 
      },
    sp_nm : {
        type: Sequelize.STRING, 
      },
    currentrank : {
        type: Sequelize.INTEGER, 
      },
    ranknm_curr : {
        type: Sequelize.STRING, 
      },
    shortnm_prev : {
        type: Sequelize.STRING, 
      },
    perc_prev : {
        type: Sequelize.INTEGER, 
      },
    adjustedrank : {
        type: Sequelize.INTEGER, 
      },
    ranknm_adj : {
        type: Sequelize.STRING, 
      },
    shortnm_adjust : {
        type: Sequelize.STRING, 
      },
    perc_adj : {
        type: Sequelize.INTEGER, 
      },
    effectiverank : {
        type: Sequelize.INTEGER, 
      },
    ranknm_eff : {
        type: Sequelize.STRING, 
      },
    shortnm_eff : {
        type: Sequelize.STRING, 
      },
    perc_eff : {
        type: Sequelize.INTEGER, 
      },



}, {freezeTableName: true, timestamps: false, personalQueryBonusDetail });


module.exports = PersonalQueryBonusDetail;