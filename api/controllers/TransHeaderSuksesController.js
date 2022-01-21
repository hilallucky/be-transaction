const TransHeaderSukses = require('../models/TransHeaderSukses');

const TransHeaderSuksesController = () => {

  const addHeaderSukses = async (req, res) => {
    let { body } = req;
      try {
        let insert = await TransHeaderSukses.create({
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
          is_pickup : body.is_pickup,
          pickup_date : body.pickup_date,
          is_ship : body.is_ship,
          pickup_number : body.pickup_number,
          bank_code_payment : body.bank_code_payment,
          payConnectivity : body.payConnectivity,
          DOno : body.DOno,
          print_count : body.print_count,
          pickup_datetime : body.pickup_datetime,
          conote_new : body.conote_new,
          promoPrintStatus : body.promoPrintStatus,
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
          delivery_status : body.delivery_status,
          cashback_point : body.cashback_point,
          order_taken : body.order_taken,
          taken_by : body.taken_by,
          print_date : body.print_date,
          no_hp_konfirmasi : body.no_hp_konfirmasi,
          date_in : body.date_in,
          whcd : body.whcd,
          whnm : body.whnm,
          is_vcr_prod : body.is_vcr_prod,
          is_vcr_cash : body.is_vcr_cash,
          is_vcr_free_ongkir : body.is_vcr_free_ongkir,
          vcr_prod_list : body.vcr_prod_list,
          vcr_cash_list : body.vcr_cash_list,
          vcr_free_ongkir_list : body.vcr_free_ongkir_list,
          is_cod : body.is_cod,
          pay_insurrance : body.pay_insurrance,
          price_type : body.price_type,
          flag_generated : body.flag_generated,
          end_point : body.end_point,

         
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

const getHeaderSukses= async (req, res) => {
    try {
      let header = await TransHeaderSukses.findAll(
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



  return {
    addHeaderSukses,
    getHeaderSukses,
  };
};

module.exports = TransHeaderSuksesController;
