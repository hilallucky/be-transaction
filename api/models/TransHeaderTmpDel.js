const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_transheadertmpdel = 'transheadertmpdel';

const TransHeaderTmpDel = sequelize.define('ecomm_trans_hdr_sgo_del', {
      id : {
      type: Sequelize.INTEGER, 
      },     
      orderno : {
          type: Sequelize.STRING, primaryKey: true, allowNull: false,
        },
      bankaccno : {
          type: Sequelize.STRING, 
        },
      token : {
          type: Sequelize.STRING, 
        },
      id_memb : {
          type: Sequelize.STRING, allowNull: false,
        },
      nmmember : {
          type: Sequelize.STRING, 
        },
      total_pay : {
          type: Sequelize.INTEGER, 
        },
      total_bv : {
          type: Sequelize.INTEGER, 
        },
      pricecode : {
          type: Sequelize.STRING, 
        },
      bonusmonth : {
          type: Sequelize.STRING, 
        },
      datetrans : {
          type: Sequelize.STRING, 
        },
      idstk : {
          type: Sequelize.STRING, 
        },
      nmstkk : {
          type: Sequelize.STRING, 
        },
      status : {
          type: Sequelize.STRING, 
        },
      secno : {
          type: Sequelize.STRING, 
        },
      flag_trx : {
          type: Sequelize.STRING, 
        },
      sentTo : {
          type: Sequelize.STRING, 
        },
      SSRno : {
          type: Sequelize.STRING, 
        },
      REGISTERno : {
          type: Sequelize.STRING, 
        },
      CNno : {
          type: Sequelize.STRING, 
        },
      KWno : {
          type: Sequelize.STRING, 
        },
      IPno : {
          type: Sequelize.STRING, 
        },
      CNstatus : {
          type: Sequelize.STRING, 
        },
      KWstatus : {
          type: Sequelize.STRING, 
        },
      IPstatus : {
          type: Sequelize.STRING, 
        },
      dateKW : {
          type: Sequelize.STRING, 
        },
      dateCN : {
          type: Sequelize.STRING, 
        },
      dateIP : {
          type: Sequelize.STRING, 
        },
      usrKW : {
          type: Sequelize.STRING, 
        },
      eod_status : {
          type: Sequelize.STRING, 
        },
      status_vt_pay : {
          type: Sequelize.STRING, 
        },
      status_vt_app_dt : {
          type: Sequelize.STRING, 
        },
      status_vt_reject_dt : {
          type: Sequelize.STRING, 
        },
      payShip : {
          type: Sequelize.STRING, 
        },
      payAdm : {
          type: Sequelize.STRING, 
        },
      CNPosteddt : {
          type: Sequelize.STRING, 
        },
      KWPosteddt : {
          type: Sequelize.STRING, 
        },
      IPPosteddt : {
          type: Sequelize.STRING, 
        },
      CNPrintStatus : {
          type: Sequelize.STRING, 
        },
      KWPrintStatus : {
          type: Sequelize.STRING, 
        },
      IPPrintStatus : {
          type: Sequelize.STRING, 
        },
      is_umroh : {
          type: Sequelize.STRING, 
        },
      bank_code_payment : {
          type: Sequelize.INTEGER, 
        },
      userlogin : {
          type: Sequelize.STRING, 
        },
      payConnectivity : {
          type: Sequelize.STRING, 
        },
      is_login : {
          type: Sequelize.STRING, 
        },
      totPayDP : {
          type: Sequelize.STRING, 
        },
      totPayCP : {
          type: Sequelize.STRING, 
        },
      profit_member : {
          type: Sequelize.STRING, 
        },
      is_free_sip_from_member : {
          type: Sequelize.STRING, 
        },
      free_ship_val : {
          type: Sequelize.STRING, 
        },
      profit_member_after_deduct : {
          type: Sequelize.STRING, 
        },
      id_lp : {
          type: Sequelize.STRING, 
        },
      free_shipping : {
          type: Sequelize.STRING, 
        },
      discount_shipping : {
          type: Sequelize.STRING, 
        },
      cashback_point : {
          type: Sequelize.STRING, 
        },
      no_hp_konfirmasi : {
          type: Sequelize.STRING, 
        },
      whcd : {
          type: Sequelize.STRING, 
        },
      whnm : {
          type: Sequelize.STRING, 
        },
      kode_pay : {
          type: Sequelize.STRING, 
        },
      kode_ref_bank : {
          type: Sequelize.STRING, 
        },
      flag_payment : {
          type: Sequelize.STRING, 
        },
      date_expired : {
          type: Sequelize.STRING, 
        },
      kode_unik : {
          type: Sequelize.STRING, 
        },
      flag_production : {
          type: Sequelize.STRING, 
        },
      nom_pay : {
          type: Sequelize.STRING, 
        },
      is_cod : {
          type: Sequelize.STRING, 
        },
      is_ship : {
          type: Sequelize.STRING, 
        },
      is_pickup : {
          type: Sequelize.STRING, 
        },
      pickup_date : {
          type: Sequelize.STRING, 
        },
      print_count : {
          type: Sequelize.STRING, 
        },
      conote_new : {
          type: Sequelize.STRING, 
        },
      pickup_datetime : {
          type: Sequelize.STRING, 
        },
      pay_insurrance : {
          type: Sequelize.STRING, 
        },
      price_type : {
          type: Sequelize.STRING, 
        },
      print_date : {
          type: Sequelize.STRING, 
        },
      diskon_produk : {
          type: Sequelize.STRING, 
        },
      flag_sms_cod : {
          type: Sequelize.STRING, 
        },
      paycod_date : {
          type: Sequelize.STRING, 
        },


}, {freezeTableName: true, timestamps: false, table_transheadertmpdel });


module.exports = TransHeaderTmpDel;