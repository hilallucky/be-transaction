const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');
// const TransHeaderTmpDel = require('../models/TransHeaderTmpDel');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_transheadersukses = 'transheadersukses';

const TransHeaderSukses = sequelize.define('ecomm_trans_hdr', {
      // id : {
      //     type: Sequelize.INTEGER, 
      //   }, 
      orderno : {
          type: Sequelize.STRING,primaryKey: true, allowNull: false,
        },
      bankaccno : {
          type: Sequelize.STRING, 
        },
      token : {
          type: Sequelize.STRING, 
        },
      id_memb : {
          type: Sequelize.STRING, 
        },
      nmmember : {
          type: Sequelize.STRING, 
        },
      total_pay : {
          type: Sequelize.INTEGER, 
        },
      total_pay_all : {
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
      // REGISTERno : {
      //     type: Sequelize.STRING, allowNull: false, validate: {
      //         isUniqueRegisterNo: function(value, next) {
      //             TransHeaderSukses.findOne({
      //                 where: {REGISTERno: value},
      //                 attributes: ['REGISTERno']
      //             })
      //                 .done(function(error, user) {
      //                     if (error)
      //                         return next({message: 'REGISTERno is already in use'});
      //                     next();
      //                 });
      //         }
      //     }
      //   },
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
      is_pickup : {
          type: Sequelize.STRING, 
        },
      pickup_date : {
          type: Sequelize.STRING, 
        },
      is_ship : {
          type: Sequelize.STRING, 
        },
      pickup_number : {
          type: Sequelize.STRING, 
        },
      bank_code_payment : {
          type: Sequelize.STRING, 
        },
      payConnectivity : {
          type: Sequelize.STRING, 
        },
      DOno : {
          type: Sequelize.STRING, 
        },
      print_count : {
          type: Sequelize.STRING, 
        },
      pickup_datetime : {
          type: Sequelize.STRING, 
        },
      // conote_new : {
      //     type: Sequelize.STRING,  allowNull: false, validate: {
      //         isUniqueConoteTmp: function(value, next) {

      //             TransHeaderTmp.findOne({
      //                 where: {conote_new: value, sentTo : '2'}, //if sent to address
      //                 attributes: ['conote_new', 'sentTo']
      //             })
      //                 .done(function(error, user) {
      //                     if (error)
      //                         return next({message: 'Airwaybill already used before!'});
      //                        //return next.status(401).json({message: 'Airwaybill already used before!'});
      //                       next();
      //                 });

      //         },

      //         isUniqueConoteTmpDel: function(value, next) {

      //             TransHeaderTmpDel.findOne({
      //                 where: {conote_new: value, sentTo : '2'}, //if sent to address
      //                 attributes: ['conote_new', 'sentTo']
      //             })
      //                 .done(function(error, user) {
      //                     if (error)
      //                         return next({message: 'Airwaybill already used & deleted before!'});
      //                       next();
      //                 });
      //         },

      //     }
      
      conote_new : {
          type: Sequelize.STRING, 
        },        
      promoPrintStatus : {
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
      delivery_status : {
          type: Sequelize.STRING, 
        },
      cashback_point : {
          type: Sequelize.STRING, 
        },
      order_taken : {
          type: Sequelize.STRING, 
        },
      taken_by : {
          type: Sequelize.STRING, 
        },
      print_date : {
          type: Sequelize.STRING, 
        },
      no_hp_konfirmasi : {
          type: Sequelize.STRING, 
        },
      date_in : {
          type: Sequelize.STRING, 
        },
      whcd : {
          type: Sequelize.STRING, 
        },
      whnm : {
          type: Sequelize.STRING, 
        },
      is_vcr_prod : {
          type: Sequelize.STRING, 
        },
      is_vcr_cash : {
          type: Sequelize.STRING, 
        },
      is_vcr_free_ongkir : {
          type: Sequelize.STRING, 
        },
      vcr_prod_list : {
          type: Sequelize.STRING, 
        },
      vcr_cash_list : {
          type: Sequelize.STRING, 
        },
      vcr_free_ongkir_list : {
          type: Sequelize.STRING, 
        },
      is_cod : {
          type: Sequelize.STRING, 
        },
      pay_insurrance : {
          type: Sequelize.STRING, 
        },
      price_type : {
          type: Sequelize.STRING, 
        },
      flag_generated : {
          type: Sequelize.STRING, 
        },
      end_point : {
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
      appname : {
          type: Sequelize.STRING, 
        },
      trxtype : {
          type: Sequelize.STRING, 
        },
      group_trans_hdr : {
          type: Sequelize.STRING, 
        },
      is_dropshipper : {
          type: Sequelize.STRING, 
        },
      dropshipper_name : {
          type: Sequelize.STRING, 
        },
      confirmeddate : {
          type: Sequelize.STRING, 
        },
      confirmstatus : {
          type: Sequelize.STRING, 
        },
      remarks : {
          type: Sequelize.STRING, 
        },
      confirmedby : {
          type: Sequelize.STRING, 
        },
      is_cvoucher : {
          type: Sequelize.STRING, 
        },
      is_pvoucher : {
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
      reff_code: {
          type: Sequelize.STRING,
        }, 

}, {freezeTableName: true, timestamps: false,  hasTrigger: true, table_transheadersukses });


module.exports = TransHeaderSukses;