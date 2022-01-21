
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_custpaydet = 'klink_mlm2010_custpaydet';

const Klink_mlm2010_custpaydet = sequelize.define('custpaydet', {
    trcd : {
          type: Sequelize.STRING,  allowNull: false,
        },
    type : {
              type: Sequelize.STRING,  
            },
    trtype : {
              type: Sequelize.STRING,  
            },
    bankacccd : {
              type: Sequelize.STRING,  
            },
    bankacccd2 : {
              type: Sequelize.STRING,  
            },
    refno : {
              type: Sequelize.STRING,  
            },
    description : {
              type: Sequelize.STRING,  
            },
    amount : {
              type: Sequelize.INTEGER,  
            },
    etdt : {
              type: Sequelize.STRING,  
            },
    trdt : {
              type: Sequelize.STRING,  
            },
    status : {
              type: Sequelize.STRING,  
            },
    dfno : {
              type: Sequelize.STRING,  
            },
    createnm : {
              type: Sequelize.STRING,  
            },
    createdt : {
              type: Sequelize.STRING,  
            },
    updatenm : {
              type: Sequelize.STRING,  
            },
    updatedt : {
              type: Sequelize.STRING,  
            },
    effect : {
              type: Sequelize.STRING,  
            },
    source_ip : {
              type: Sequelize.STRING,  
            },
    bankname : {
              type: Sequelize.STRING,  
            },
    bankaccno : {
              type: Sequelize.STRING,  
            },
    bankaccnm : {
              type: Sequelize.STRING,  
            },
    bankcity : {
              type: Sequelize.STRING,  
            },
    bankbranch : {
              type: Sequelize.STRING,  
            },
    bankcountry : {
              type: Sequelize.STRING,  
            },
    bankid : {
              type: Sequelize.STRING,  
            },
    custtype : {
              type: Sequelize.STRING,  
            },
    description2 : {
              type: Sequelize.STRING,  
            },
    description3 : {
              type: Sequelize.STRING,  
            },
    post_chasier : {
              type: Sequelize.STRING,  
            },
    postdt_chasier : {
              type: Sequelize.STRING,  
            },
    post_finance : {
              type: Sequelize.STRING,  
            },
    postdt_finance : {
              type: Sequelize.STRING,  
            },
    post_acct : {
              type: Sequelize.STRING,  
            },
    postdt_acct : {
              type: Sequelize.STRING,  
            },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_custpaydet, hasTrigger: false });

module.exports = Klink_mlm2010_custpaydet;