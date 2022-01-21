const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

const bonusPeriod = 'bonusPeriod';

const BonusPeriod = sequelize.define('V_HILAL_MASTER_PERIOD', { 

    bnsperiod : {
        type: Sequelize.STRING, 
      },
    bnsperiod2 : {
        type: Sequelize.STRING, 
      },
    range : {
        type: Sequelize.STRING, 
      },
    endofdatebnsperiod : {
        type: Sequelize.STRING, 
      },
    date_now : {
        type: Sequelize.STRING, 
      },
    date_only_now : {
        type: Sequelize.STRING, 
      },
    bnsperiod_now_cod2 : {
        type: Sequelize.STRING, 
      },
    bnsperiod_now_cod : {
        type: Sequelize.STRING, 
      },
    bnsperiod_now : {
        type: Sequelize.STRING, 
      },
    bnsperiod_prev : {
        type: Sequelize.STRING, 
      },


}, {freezeTableName: true, timestamps: false, hasTrigger: false, bonusPeriod });


module.exports = BonusPeriod;