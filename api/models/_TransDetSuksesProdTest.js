const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

const table_TransDetSuksesProdTest = 'TransDetSuksesProdTest';

const TransDetSuksesProdTest = sequelize.define('ecomm_trans_hdr_test_trigger', {
      orderno : {
          type: Sequelize.STRING,  
        },
      orderno_group_trans : {
                type: Sequelize.STRING,  
              },
      prdcd : {
                type: Sequelize.STRING,  
              },
      prdnm : {
                type: Sequelize.STRING,  
              },
      qty : {
                type: Sequelize.INTEGER,  
              },
      bvr : {
                type: Sequelize.INTEGER,  
              },
      dpr : {
                type: Sequelize.INTEGER,  
              },
      pricecode : {
                type: Sequelize.STRING,  
              },
      sentTo : {
                type: Sequelize.STRING,  
              },
      ByrSisaSales : {
                type: Sequelize.STRING,  
              },
      cpr : {
                type: Sequelize.INTEGER,  
              },
      profit_d : {
                type: Sequelize.INTEGER,  
              },

}, {freezeTableName: true, timestamps: false, table_TransDetSuksesProdTest, hasTrigger: true });

module.exports = TransDetSuksesProdTest;