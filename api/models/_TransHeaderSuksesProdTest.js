const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

const table_TransHeaderSuksesProdTest = 'TransHeaderSuksesProdTest';

const TransHeaderSuksesProdTest = sequelize.define('ecomm_trans_hdr_test_trigger', {
      id : {
          type: Sequelize.INTEGER,  allowNull: false,
        },
      orderno : {
                type: Sequelize.STRING, primaryKey: true, allowNull: false,
              },
      orderno_group_trans : {
                type: Sequelize.STRING,  
              },
      group_trans_hdr : {
                type: Sequelize.STRING,  
              },
      bankaccno : {
                type: Sequelize.STRING,  allowNull: false,
              },
      token : {
                type: Sequelize.STRING,  allowNull: false,
              },
      id_memb : {
                type: Sequelize.STRING,  allowNull: false,
              },
      nmmember : {
                type: Sequelize.STRING,  
              },
      total_pay : {
                type: Sequelize.INTEGER,  allowNull: false,
              },
      total_pay_all : {
                type: Sequelize.INTEGER,  allowNull: false,
              },
      total_bv : {
                type: Sequelize.INTEGER,  allowNull: false,
              },
      pricecode : {
                type: Sequelize.STRING,  allowNull: false,
              },
      bonusmonth : {
                type: Sequelize.STRING,  allowNull: false,
              },
      datetrans : {
                type: Sequelize.STRING,  
              },
      idstk : {
                type: Sequelize.STRING,  allowNull: false,
              },
      nmstkk : {
                type: Sequelize.STRING,  
              },
      status : {
                type: Sequelize.STRING,  allowNull: false,
              },
      secno : {
                type: Sequelize.STRING,  allowNull: false,
              },
      flag_trx : {
                type: Sequelize.STRING,  allowNull: false,
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
                type: Sequelize.INTEGER,  
              },
      payAdm : {
                type: Sequelize.INTEGER,  
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
                type: Sequelize.INTEGER,  
              },
      payConnectivity : {
                type: Sequelize.INTEGER,  
              },
      DOno : {
                type: Sequelize.STRING,  
              },
      print_count : {
                type: Sequelize.INTEGER,  
              },
      pickup_datetime : {
                type: Sequelize.STRING,  
              },
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
                type: Sequelize.INTEGER,  
              },
      totPayCP : {
                type: Sequelize.INTEGER,  
              },
      profit_member : {
                type: Sequelize.INTEGER,  
              },
      is_free_sip_from_member : {
                type: Sequelize.STRING,  
              },
      free_ship_val : {
                type: Sequelize.INTEGER,  
              },
      profit_member_after_deduct : {
                type: Sequelize.INTEGER,  
              },
      id_lp : {
                type: Sequelize.STRING,  
              },
      free_shipping : {
                type: Sequelize.STRING,  
              },
      discount_shipping : {
                type: Sequelize.INTEGER,  
              },
      delivery_status : {
                type: Sequelize.STRING,  
              },
      cashback_point : {
                type: Sequelize.INTEGER,  
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
      is_vcr_free_ongkir : {
                type: Sequelize.STRING,  
              },
      vcr_free_ongkir_list : {
                type: Sequelize.STRING,  
              },
      is_cod : {
                type: Sequelize.STRING,  
              },
      pay_insurrance : {
                type: Sequelize.INTEGER,  
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
                type: Sequelize.INTEGER,  
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
      vcr_cash_list : {
                type: Sequelize.STRING,  
              },
      vcr_prod_list : {
                type: Sequelize.STRING,  
              },
      nom_cvoucher : {
                type: Sequelize.INTEGER,  
              },
      nom_pvoucher : {
                type: Sequelize.INTEGER,  
              },
      is_vcr_cash : {
                type: Sequelize.STRING,  
              },
      is_vcr_prod : {
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
                type: Sequelize.INTEGER,  
              },
      is_delivery : {
                type: Sequelize.STRING,  
              },
      date_conote : {
                type: Sequelize.STRING,  
              },
      printby : {
                type: Sequelize.STRING,  
              },
      ship_stk : {
                type: Sequelize.STRING,  
              },
      status_promo_vch : {
                type: Sequelize.STRING,  
              },
      status_promo_prd : {
                type: Sequelize.STRING,  
              },
      seqno : {
                type: Sequelize.INTEGER,  
              },
      tot_nom_ip_cash : {
                type: Sequelize.INTEGER,  
              },
      tot_nom_ip_cashvcr : {
                type: Sequelize.INTEGER,  
              },
      tot_nom_ip_prodvcr : {
                type: Sequelize.INTEGER,  
              },
      tot_nom_payAdm : {
                type: Sequelize.INTEGER,  
              },
      tot_nom_profit_member_new : {
                type: Sequelize.INTEGER,  
              },
      tot_nom_bv_sum : {
                type: Sequelize.INTEGER,  
              },

}, {freezeTableName: true, timestamps: false, table_TransHeaderSuksesProdTest, hasTrigger: true });

module.exports = TransHeaderSuksesProdTest;