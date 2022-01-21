const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const personalTransQueryHdr = 'personalTransQueryHdr';

const PersonalTransQueryHdr = sequelize.define('V_HILAL_API_TRANS_ALL', {
      orderno : {
                type: Sequelize.STRING, primaryKey: true, allowNull: false,
              },
      transdt : {
                type: Sequelize.STRING, 
              },
      dfno : {
                type: Sequelize.STRING, primaryKey: true, allowNull: false,
              },
      fullnm : {
                type: Sequelize.STRING, 
              },
      bnsperiod : {
                type: Sequelize.STRING, 
              },
      pricecode : {
                type: Sequelize.STRING, 
              },
      pricedesc : {
                type: Sequelize.STRING, 
              },
      tbv : {
                type: Sequelize.INTEGER, 
              },
      tdp : {
                type: Sequelize.INTEGER, 
              },
      trxType : {
                type: Sequelize.STRING, 
              },
      transType : {
                type: Sequelize.STRING, 
              },
      appname : {
                type: Sequelize.STRING, 
              },


}, {freezeTableName: true, timestamps: false,   personalTransQueryHdr });


module.exports = PersonalTransQueryHdr;