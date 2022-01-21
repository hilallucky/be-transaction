const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const mlmDataVoucher = 'dataMember';

const MLMDataVoucher = sequelize.define('tcvoucher', {

DistributorCode : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
VoucherNo : {
    type: Sequelize.STRING, 
  },
IssueDate : {
    type: Sequelize.STRING, 
  },
BonusMonth : {
    type: Sequelize.STRING, 
  },
BonusYear : {
    type: Sequelize.STRING, 
  },
ExpireDate : {
    type: Sequelize.STRING, 
  },
VoucherAmt : {
    type: Sequelize.STRING, 
  },
VoucherAmtCurr : {
    type: Sequelize.STRING, 
  },
CurrencyNote : {
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
voucherkey : {
    type: Sequelize.STRING, 
  },
status : {
    type: Sequelize.STRING, 
  },
claimstatus : {
    type: Sequelize.STRING, 
  },
vchtype : {
    type: Sequelize.STRING, 
  },
countrycode : {
    type: Sequelize.STRING, 
  },
is_print : {
    type: Sequelize.STRING, 
  },
claim_date : {
    type: Sequelize.STRING, 
  },
loccd : {
    type: Sequelize.STRING, 
  },
VoucherAmt_ORI : {
    type: Sequelize.STRING, 
  },
voucherkey_ori : {
    type: Sequelize.STRING, 
  },
remarks : {
    type: Sequelize.STRING, 
  },


}, {freezeTableName: true, timestamps: false, mlmDataVoucher });


module.exports = MLMDataVoucher;