const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');
const TransHeaderTmp = require('../models/TransHeaderTmp');
const {internalError, logSuccess, logError} = require('../services/logger');

const TransHeaderTmpController = () => {

  const addHeaderTmp = async (req, res) => {
    let { body } = req;

    
      try {
        let insert = await TransHeaderTmp.create({
          id : body.id,
          orderno : body.orderno,
          bankaccno : body.bankaccno,
          token : body.token,
          id_memb : body.id_memb,
          nmmember : body.nmmember,
          total_pay : body.total_pay,
          total_bv : body.total_bv,
          pricecode : body.pricecode,
          bonusmonth : body.bonusmonth,
          datetrans : body.datetrans,
          idstk : body.idstk,
          nmstkk : body.nmstkk,
          status : body.status,
          secno : body.secno,
          flag_trx : body.flag_trx,
          sentTo : body.sentTo,
          SSRno : body.SSRno,
          REGISTERno : body.REGISTERno,
          CNno : body.CNno,
          KWno : body.KWno,
          IPno : body.IPno,
          CNstatus : body.CNstatus,
          KWstatus : body.KWstatus,
          IPstatus : body.IPstatus,
          dateKW : body.dateKW,
          dateCN : body.dateCN,
          dateIP : body.dateIP,
          usrKW : body.usrKW,
          eod_status : body.eod_status,
          status_vt_pay : body.status_vt_pay,
          status_vt_app_dt : body.status_vt_app_dt,
          status_vt_reject_dt : body.status_vt_reject_dt,
          payShip : body.payShip,
          payAdm : body.payAdm,
          CNPosteddt : body.CNPosteddt,
          KWPosteddt : body.KWPosteddt,
          IPPosteddt : body.IPPosteddt,
          CNPrintStatus : body.CNPrintStatus,
          KWPrintStatus : body.KWPrintStatus,
          IPPrintStatus : body.IPPrintStatus,
          is_umroh : body.is_umroh,
          bank_code_payment : body.bank_code_payment,
          userlogin : body.userlogin,
          payConnectivity : body.payConnectivity,
          is_login : body.is_login,
          totPayDP : body.totPayDP,
          totPayCP : body.totPayCP,
          profit_member : body.profit_member,
          is_free_sip_from_member : body.is_free_sip_from_member,
          free_ship_val : body.free_ship_val,
          profit_member_after_deduct : body.profit_member_after_deduct,
          id_lp : body.id_lp,
          free_shipping : body.free_shipping,
          discount_shipping : body.discount_shipping,
          cashback_point : body.cashback_point,
          no_hp_konfirmasi : body.no_hp_konfirmasi,
          whcd : body.whcd,
          whnm : body.whnm,
          kode_pay : body.kode_pay,
          kode_ref_bank : body.kode_ref_bank,
          flag_payment : body.flag_payment,
          date_expired : body.date_expired,
          kode_unik : body.kode_unik,
          flag_production : body.flag_production,
          nom_pay : body.nom_pay,
          is_cod : body.is_cod,
          is_ship : body.is_ship,
          is_pickup : body.is_pickup,
          pickup_date : body.pickup_date,
          print_count : body.print_count,
          conote_new : body.conote_new,
          pickup_datetime : body.pickup_datetime,
          pay_insurrance : body.pay_insurrance,
          price_type : body.price_type,
          print_date : body.print_date,
         
        });
        return res.status(200).json( {status: 'sukses', insert});  
      } catch (err) {
        console.log(err);
        if(err.parent.number == 2627)
        {
            return res.status(409).json({ status: 'gagal', pesan: 'MemberId telah terdaftar' });
        }
        else{
            return res.status(500).json({ pesan: 'Internal server error' });
        }  
      }

  };

const getHeaderTmp= async (req, res) => {
    try {
      let header = await TransHeaderTmp.findAll(
        {
          limit :25,
        }
        );

      return res.status(200).json( header );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const getDataTransTmp= async (req, res) => {

    const { orderno, tel_hp } = req.body;

    let sqlHeaderTelHP = "";
    if (!req.body.tel_hp) {
        sqlHeaderTelHP = sqlHeaderTelHP;
    }else{
       sqlHeaderTelHP = " AND b.tel_hp1 = '" + tel_hp + "'  ";
    }

    try {

      let sqlHeader = "SELECT a.orderno, a.conote_new, a.datetrans, a.bank_code_payment, c.bankDesc, c.bankCode, " + 
                      "       a.id_lp, a.is_cod, a.confirmstatus, a.status, a.confirmeddate, " +
                      "       a.confirmedby, a.remarks, a.print_count, a.print_date, b.receiver_name, " +
                      "       b.prov_code, b.kab_code, b.kec_code, b.kel_code, b.post_code, b.addr1, b.tel_hp1, " +
                      "       b.tel_hp2, b.conoteJNE, b.service_type_id, b.service_type_name, b.total_item, b.total_weight, " + 
                      "       a.is_free_sip_from_member, a.free_shipping, a.free_ship_val, " +
                      "       a.profit_member_after_deduct as profit_member_after_deduct_ori, A.profit_member, " +
                      "        CASE " +
                      "             WHEN A.id_lp='CUST' AND a.is_free_sip_from_member = '0' THEN a.profit_member " +
                      "             WHEN A.id_lp='CUST' AND A.is_free_sip_from_member = '1' AND (A.payShip > A.profit_member) THEN 0 " +
                      "             WHEN A.id_lp='CUST' AND A.is_free_sip_from_member = '1' AND (A.payShip = A.profit_member) THEN 0 " +
                      "             WHEN A.id_lp='CUST' AND A.is_free_sip_from_member = '1' AND (A.payShip < A.profit_member) THEN a.profit_member_after_deduct " +
                      "             WHEN A.id_lp='CUST' AND LEFT(a.token, 2) IN ('EB') AND a.id_lp = 'CUST' THEN a.profit_member " +
                      "             ELSE 0 " +
                      "       END AS profit_member_after_deduct, " +
                      "        CASE " +
                      "             WHEN A.id_lp='CUST' AND a.is_free_sip_from_member = '0' THEN a.totPayCP + A.payShip + a.payAdm + A.pay_insurrance " +
                      "             WHEN A.id_lp='CUST' AND A.is_free_sip_from_member = '1' AND (A.profit_member >= A.payShip) AND A.appname = 'promo1111' THEN (a.totPayCP - 0) + a.payAdm + A.pay_insurrance  " +
                      "             WHEN A.id_lp='CUST' AND A.is_free_sip_from_member = '1' AND (A.profit_member >= A.payShip) AND A.appname <> 'promo1111' THEN (a.totPayCP - A.payShip) + a.payAdm + A.pay_insurrance  " +
                      "             WHEN A.id_lp='CUST' AND A.is_free_sip_from_member = '1' AND (A.payShip < A.profit_member) AND A.appname <> 'promo1111' THEN a.totPayCP + A.payShip + a.payAdm + A.pay_insurrance  " +
                      "             WHEN A.id_lp='CUST' AND A.is_free_sip_from_member = '1' AND (A.payShip < A.profit_member) AND A.appname = 'promo1111' THEN a.totPayCP + a.payAdm + A.pay_insurrance  " +
                      "             WHEN A.id_lp='CUST' AND LEFT(a.token, 2) IN ('EB') AND (A.profit_member >= A.payShip) THEN (a.totPayCP - A.payShip) + a.payAdm + A.pay_insurrance  " +
                      "             WHEN A.id_lp='CUST' AND LEFT(a.token, 2) IN ('EB') AND (A.payShip < A.profit_member) THEN a.totPayCP + A.payShip + a.payAdm + A.pay_insurrance  " +
                      "             WHEN A.id_lp!='CUST' THEN a.totPayDP + A.payShip + a.payAdm + A.pay_insurrance  " +
                      "             ELSE 0 " +
                      "       END AS total_pay_bill, " +
                      "       a.totPayCP, a.totPayDP, a.payship, a.payAdm, A.pay_insurrance, b.total_pay_net " +
                      " FROM ecomm_trans_hdr_sgo a " + 
                      "       INNER JOIN ecomm_trans_shipaddr_sgo b ON a.orderno = b.orderno " +
                      "       INNER JOIN ecomm_bank c ON a.bank_code_payment = c.id " + 
                      " WHERE a.orderno = '" + orderno + "' " + sqlHeaderTelHP ;
      let dataHeader = await sequelize.query(sqlHeader);


      let sqlDetail = "SELECT a.orderno, a.prdcd, a.prdnm, a.qty, a.bvr, a.dpr, a.pricecode, a.sentTo, a.ByrSisaSales, a.cpr, a.profit_d " +
                      " FROM ecomm_trans_det_prd_sgo a " + 
                      "       INNER JOIN ecomm_trans_shipaddr_sgo b ON a.orderno = b.orderno " +
                      " WHERE a.orderno = '" + orderno + "' " + sqlHeaderTelHP ;
      let dataDetail = await sequelize.query(sqlDetail);

      let sqlPayment = "SELECT d.orderno, d.payamt, d.paytype, d.docno, d.charge_admin, d.expired_pay_time " +
                      " FROM ecomm_trans_paydet_sgo d " + 
                      " WHERE d.orderno = '" + orderno + "' ";
      let dataPayment = await sequelize.query(sqlPayment);

      if ((dataHeader[0] == null && dataDetail[0] == null && dataPayment[0] == null) || (dataHeader[0] == '' && dataDetail[0] == '' && dataPayment[0] == '')) {
          return logError(req, res, 400, "Record not founded.");
        }else{
          let dataHeaderX = dataHeader[0];
          let dataDetailX = dataDetail[0];
          let dataPaymentX = dataPayment[0];
          return logSuccess(req, res, 200, {dataHeaderX, dataDetailX, dataPaymentX}, 'success' )
        }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  return {
    addHeaderTmp,
    getHeaderTmp,
    getDataTransTmp
  };
};

module.exports = TransHeaderTmpController;
