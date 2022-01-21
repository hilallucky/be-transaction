const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const voucherMLMDataBonus = 'dataMember';

const VoucherMLMDataBonus = sequelize.define('tcvoucher', {

DistributorCode : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
VoucherNo : {
    type: Sequelize.STRING, 
  },
IssueDate : {
    type: Sequelize.DATEONLY, 
  },
BonusMonth : {
    type: Sequelize.STRING, 
  },
BonusYear : {
    type: Sequelize.STRING, 
  },
ExpireDate : {
    type: Sequelize.DATEONLY, 
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
    type: Sequelize.DATEONLY, 
    // get() {
    //           return moment(this.getDataValue('createdt')).format('DD/MM/YYYY h:mm:ss');
    //       }
  },
updatenm : {
    type: Sequelize.STRING, 
  },
updatedt : {
    type: Sequelize.STRING, 
    // get() {
    //           return moment(this.getDataValue('createdt')).format('DD/MM/YYYY h:mm:ss');
    //       }
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
    type: Sequelize.DATEONLY, 
    // get() {
    //           return moment(this.getDataValue('createdt')).format('DD/MM/YYYY h:mm:ss');
    //       }
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


}, {freezeTableName: true, timestamps: false, voucherMLMDataBonus });


module.exports = VoucherMLMDataBonus;