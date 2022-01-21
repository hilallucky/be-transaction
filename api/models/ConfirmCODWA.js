const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

const confirmCOD = 'dataCODConfirm';

const ConfirmCODWA = sequelize.define('ecomm_trans_cod_confirm', {

orderno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
reply : {
    type: Sequelize.STRING, 
  },
date : {
    type: Sequelize.STRING, 
  },
param : {
    type: Sequelize.STRING, 
  },
messageId : {
    type: Sequelize.STRING, 
  },
from : {
    type: Sequelize.STRING, 
  },


}, {freezeTableName: true, timestamps: false, confirmCOD });


module.exports = ConfirmCODWA;