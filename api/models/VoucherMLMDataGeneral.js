const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const voucherMLMDataGeneral = 'dataVoucherMember';

const VoucherMLMDataGeneral = sequelize.define('voucher_trans', {

      vcode : {
          type: Sequelize.STRING, 
        },
      vdescription : {
          type: Sequelize.STRING, 
        },
      dfno : {
          type: Sequelize.STRING, 
        },
      fullnm : {
          type: Sequelize.STRING, 
        },
      vtype : {
          type: Sequelize.STRING, 
        },
      vdisc : {
          type: Sequelize.STRING, 
        },
      vdiscrate : {
          type: Sequelize.STRING, 
        },
      vstatus : {
          type: Sequelize.STRING, 
        },
      expireddate : {
          type: Sequelize.STRING, 
        },
      bv_avaliable : {
          type: Sequelize.STRING, 
        },
      qtyprd : {
          type: Sequelize.STRING, 
        },
      productcode : {
          type: Sequelize.STRING, 
        },


}, {freezeTableName: true, timestamps: false, voucherMLMDataGeneral });


module.exports = VoucherMLMDataGeneral;