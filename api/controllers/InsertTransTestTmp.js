const TransHeaderTmp = require('../models/TransHeaderTmp');
const TransDetPrdTmp = require('../models/TransDetPrdTmp');
const TransPayDateTmp = require('../models/TransPayDateTmp');
const TransShipAddrTmp = require('../models/TransShipAddrTmp');
const sequelize = require('../../config/db/database');


const InsertTransTempController = () => {

"use strict";
  const insert = async (req, res) => {
    let data = req.body;

    // console.log(body.length);

    data.forEach(function (item) {
      console.log(item.orderno);
     
  });

  };


const updateTransTmp = async (req, res) => {
    let { body } = req;
    let transaction

    try{
      let transHeaderTmp = await TransHeaderTmp.findOne({
                                        where: {orderno: body.orderno}, 
                                        attributes: ['orderno']
                                  })
      let transHeaderTmpObj = Object.assign(transHeaderTmp);

      let ordernox = transHeaderTmp.dataValues.orderno;
      let userloginx = transHeaderTmp.dataValues.userlogin;

      if(userloginx != body.userlogin){ //userlogin di data tidak sama dengan yang login
        return res.status(401).json({ msg: 'Not authorized user.' });
      }else{
        try{
          transaction = await sequelize.transaction();
          await TransHeaderTmp.update({
              bankaccno : body.bankaccno,
              token : body.token,
              id_memb : body.id_memb,
              nmmember : body.nmmember,
              // total_pay : body.total_pay,
              // total_bv : body.total_bv,
              // pricecode : body.pricecode,
              bonusmonth : body.bonusmonth,
              // datetrans : body.datetrans,
              idstk : body.idstk,
              nmstkk : body.nmstkk,
              status : body.status,
              // secno : body.secno,
              // flag_trx : body.flag_trx,
              // sentTo : body.sentTo,
              // SSRno : body.SSRno,
              // REGISTERno : body.REGISTERno,
              // CNno : body.CNno,
              // KWno : body.KWno,
              // IPno : body.IPno,
              // CNstatus : body.CNstatus,
              // KWstatus : body.KWstatus,
              // IPstatus : body.IPstatus,
              // dateKW : body.dateKW,
              // dateCN : body.dateCN,
              // dateIP : body.dateIP,
              // usrKW : body.usrKW,
              // eod_status : body.eod_status,
              // status_vt_pay : body.status_vt_pay,
              // status_vt_app_dt : body.status_vt_app_dt,
              // status_vt_reject_dt : body.status_vt_reject_dt,
              // payShip : body.payShip,
              // payAdm : body.payAdm,
              // CNPosteddt : body.CNPosteddt,
              // KWPosteddt : body.KWPosteddt,
              // IPPosteddt : body.IPPosteddt,
              // CNPrintStatus : body.CNPrintStatus,
              // KWPrintStatus : body.KWPrintStatus,
              // IPPrintStatus : body.IPPrintStatus,
              // is_umroh : body.is_umroh,
              bank_code_payment : body.bank_code_payment,
              // userlogin : body.userlogin,
              // payConnectivity : body.payConnectivity,
              // is_login : body.is_login,
              // totPayDP : body.totPayDP,
              // totPayCP : body.totPayCP,
              // profit_member : body.profit_member,
              // is_free_sip_from_member : body.is_free_sip_from_member,
              // free_ship_val : body.free_ship_val,
              // profit_member_after_deduct : body.profit_member_after_deduct,
              // id_lp : body.id_lp,
              // free_shipping : body.free_shipping,
              // discount_shipping : body.discount_shipping,
              // cashback_point : body.cashback_point,
              // no_hp_konfirmasi : body.no_hp_konfirmasi,
              whcd : body.whcd,
              whnm : body.whnm,
              // kode_pay : body.kode_pay,
              // kode_ref_bank : body.kode_ref_bank,
              // flag_payment : body.flag_payment,
              // date_expired : body.date_expired,
              // kode_unik : body.kode_unik,
              // flag_production : body.flag_production,
              // nom_pay : body.nom_pay,
              // is_cod : body.is_cod,
              is_ship : body.is_ship,
              is_pickup : body.is_pickup,
              pickup_date : body.pickup_date,
              print_count : body.print_count,
              conote_new : body.conote_new,
              pickup_datetime : body.pickup_datetime,
              // pay_insurrance : body.pay_insurrance,
              price_type : body.price_type,
              print_date : body.print_date,
              diskon_produk : body.diskon_produk,
              flag_sms_cod : body.flag_sms_cod,
              paycod_date : body.paycod_date,     
            }, 
            { where: {orderno: body.orderno }},
            {transaction}
          )
            await transaction.commit();
            // console.log('hasilnya = ' + transHeaderTmp.dataValues.orderno);
            return res.status(200).json({ status:'success', msg: 'Orderno = ' + body.orderno + ' updated successfully.'});
            
          }catch(err){
            return res.status(409).json({ msg: 'Orderno = ' + body.orderno + ' cannot updated.' });
          }
      }
    }catch(error){
        return res.status(400).json({ status:'failed', msg: "Orderno = " + body.orderno + ' not founded.' });
    }

  };


const deleteTransTmp = async (req, res) => {
    // const { orderno } = req.body;
    let { body } = req;
    let transaction

    try{
      let transHeaderTmp = await TransHeaderTmp.findOne({
                                        where: {orderno: body.orderno}, 
                                        attributes: ['orderno']
                                  })
      let transHeaderTmpObj = Object.assign(transHeaderTmp);
      
      let ordernox = transHeaderTmp.dataValues.orderno;
      let userloginx = transHeaderTmp.dataValues.userlogin;

      if(userloginx != body.userlogin){ //userlogin di data tidak sama dengan yang login
        return res.status(401).json({ msg: 'Not authorized user.' });
      }else{
        
        try {

          transaction = await sequelize.transaction();
          await TransHeaderTmp.destroy({
            where: {
                      orderno : body.orderno 
                    } 
          }, {transaction} ); 

          await TransDetPrdTmp.destroy({
            where: {
                      orderno : body.orderno 
                    }            
          }, {transaction} ); 


          await TransPayDateTmp.destroy({
            where: {
                      orderno : body.orderno 
                    } 
          }, {transaction} ); 

          await TransShipAddrTmp.destroy({
            where: {
                      orderno : body.orderno 
                    } 
          }, {transaction} ); 

          await transaction.commit(); 

          return res.status(200).json( { status:'success', message: "Orderno = " + body.orderno  + " deleted successfully." });     
        } catch (err) {
          return res.status(500).json( { status:'failed', message: 'Internal server error.' });
        }
      }
    }catch(error){
      return res.status(400).json({ status:'failed', msg: "Orderno = " + body.orderno + ' not founded.' });
    } 
};

  
const getRemark = async (req, res) => {
    const { id } = req.body;

   
      try {
        let hdr = await InsertTestHdr
          .findOne({
            raw: true,
            where: {
              id,
            },
          });

          let leadershipBonus = await insertTestDet
          .findOne({
            raw: true,
            where: {
              id_hdr: id,
            },
          });

          let initiativeBonus = await insertTestDet
          .findOne({
            raw: true,
            where: {
              id_hdr: id,
            },
          });

        let header = Object.assign(hdr,{leadershipBonus},{initiativeBonus});
       

         return res.status(200).json(header);     
      } catch (err) {
        console.log(err);
  
         return res.status(500).json( { status:'failed', message: 'Internal server error' });
      }
 
  };

  return {
    insert,
    getRemark,
    updateTransTmp,
    deleteTransTmp,
  };
};

module.exports = InsertTransTempController;
