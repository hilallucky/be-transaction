const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const saldo_kwallet_upd = 'saldo_upd';

const KWalletSaldoUpd = sequelize.define('va_cust_pay_det', { //va_cust_pay_bal

trcd : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false, 
  },
trtype : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
effect : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
etdt : {
    type: Sequelize.STRING, 
  },
trdt : {
    type: Sequelize.STRING, 
  },
custtype : {
    type: Sequelize.STRING, 
  },
applyto : {
    type: Sequelize.STRING, 
  },
bankCode : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
bankDesc : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
novac : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false, 
  },
dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
docno : {
    type: Sequelize.STRING, 
  },
refno : {
    type: Sequelize.STRING, 
  },
amount : {
    type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
  },
createdt : {
    type: Sequelize.STRING, 
  },
createnm : {
    type: Sequelize.STRING, 
  },
updatedt : {
    type: Sequelize.STRING, 
  },
updatenm : {
    type: Sequelize.STRING, 
  },
postedflag : {
    type: Sequelize.STRING, 
  },
posteddt : {
    type: Sequelize.STRING, 
  },
coa : {
    type: Sequelize.STRING, 
  },
rq_uuid : {
    type: Sequelize.STRING, 
  },
tipe_dk : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
effect_acc : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false, 
  },
tipe_dk_acc : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false, 
  },


}, {freezeTableName: true, timestamps: false, hasTrigger: true, saldo_kwallet_upd });


module.exports = KWalletSaldoUpd;