const TransHeaderTmp = require("../models/TransHeaderTmp");
const TransDetPrdTmp = require("../models/TransDetPrdTmp");
const TransPayDateTmp = require("../models/TransPayDateTmp");
const TransShipAddrTmp = require("../models/TransShipAddrTmp");
const Log_login = require("../models/Log_login");
const Log_trans = require("../models/Log_trans");
const sequelize = require("../../config/db/database");
const {
  internalError,
  logSuccess,
  logError,
  logReturn,
  logOrderError,
  logOrderTempSuccess,
} = require("../services/logger");
const MiscController = require("../controllers/MiscController");
const ProductControllerKnet = require("../controllers/ProductControllerKnet");

const InsertTransTempController = () => {
  "use strict";
  const insertTransTmp = async (req, res) => {
    let { body } = req;

    // console.log(body.length);

    if (body.length > 0) {
      var headerTemp = [];
      var detPrdTemp = [];
      var payTemp = [];
      var shippAddrTemp = [];
      var log_login = [];
      var log_trans = [];

      let secnoX = randomSecNo();

      for (let i = 0; i < body.length; i++) {
        //START set variable header temp
        headerTemp.push({
          //id : body[i].id,
          orderno: body[i].orderno,
          bankaccno: body[i].bankaccno,
          token: body[i].token,
          id_memb: body[i].id_memb,
          nmmember: body[i].nmmember,
          total_pay: body[i].total_pay,
          total_bv: body[i].total_bv,
          pricecode: body[i].pricecode,
          bonusmonth: body[i].bonusmonth,
          datetrans: body[i].datetrans,
          idstk: body[i].idstk,
          nmstkk: body[i].nmstkk,
          status: body[i].status,
          secno: secnoX, //secno : body[i].secno,
          flag_trx: body[i].flag_trx,
          sentTo: body[i].sentTo,
          SSRno: body[i].SSRno,
          REGISTERno: body[i].REGISTERno,
          CNno: body[i].CNno,
          KWno: body[i].KWno,
          IPno: body[i].IPno,
          CNstatus: body[i].CNstatus,
          KWstatus: body[i].KWstatus,
          IPstatus: body[i].IPstatus,
          dateKW: body[i].dateKW,
          dateCN: body[i].dateCN,
          dateIP: body[i].dateIP,
          usrKW: body[i].usrKW,
          eod_status: body[i].eod_status,
          status_vt_pay: body[i].status_vt_pay,
          status_vt_app_dt: body[i].status_vt_app_dt,
          status_vt_reject_dt: body[i].status_vt_reject_dt,
          payShip: body[i].payShip,
          payAdm: body[i].payAdm,
          CNPosteddt: body[i].CNPosteddt,
          KWPosteddt: body[i].KWPosteddt,
          IPPosteddt: body[i].IPPosteddt,
          CNPrintStatus: body[i].CNPrintStatus,
          KWPrintStatus: body[i].KWPrintStatus,
          IPPrintStatus: body[i].IPPrintStatus,
          is_umroh: body[i].is_umroh,
          bank_code_payment: body[i].bank_code_payment,
          userlogin: body[i].userlogin,
          payConnectivity: body[i].payConnectivity,
          is_login: body[i].is_login,
          totPayDP: body[i].totPayDP,
          totPayCP: body[i].totPayCP,
          profit_member: body[i].profit_member,
          is_free_sip_from_member: body[i].is_free_sip_from_member,
          free_ship_val: body[i].free_ship_val,
          profit_member_after_deduct: body[i].profit_member_after_deduct,
          id_lp: body[i].id_lp,
          free_shipping: body[i].free_shipping,
          discount_shipping: body[i].discount_shipping,
          cashback_point: body[i].cashback_point,
          no_hp_konfirmasi: body[i].no_hp_konfirmasi,
          whcd: body[i].whcd,
          whnm: body[i].whnm,
          kode_pay: body[i].kode_pay,
          kode_ref_bank: body[i].kode_ref_bank,
          flag_payment: body[i].flag_payment,
          date_expired: body[i].date_expired,
          kode_unik: body[i].kode_unik,
          flag_production: body[i].flag_production,
          nom_pay: body[i].nom_pay,
          is_cod: body[i].is_cod,
          is_ship: body[i].is_ship,
          is_pickup: body[i].is_pickup,
          pickup_date: body[i].pickup_date,
          print_count: body[i].print_count,
          conote_new: body[i].conote_new,
          pickup_datetime: body[i].pickup_datetime,
          pay_insurrance: body[i].pay_insurrance,
          price_type: body[i].price_type,
          print_date: body[i].print_date,
          diskon_produk: body[i].diskon_produk,
          flag_sms_cod: body[i].flag_sms_cod,
          paycod_date: body[i].paycod_date,
          appname: body[i].appname,
          trxtype: body[i].trxtype,
          group_trans_hdr: body[i].group_trans_hdr,
          is_dropshipper: body[i].is_dropshipper,
          dropshipper_name: body[i].dropshipper_name,
          // confirmeddate
          // confirmstatus
          // remarks
          // confirmedby
        });
        //END set variable header temp

        for (let j = 0; j < body[i].detail.length; j++) {
          //detail product
          let detail = body[i].detail[j];
          //console.log(detail);
          detPrdTemp.push({
            orderno: body[i].orderno,
            prdcd: detail.prdcd,
            prdnm: detail.prdnm,
            qty: detail.qty,
            bvr: detail.bvr,
            dpr: detail.dpr,
            pricecode: body[i].pricecode,
            sentTo: body[i].sentTo,
            ByrSisaSales: detail.ByrSisaSales,
            cpr: detail.cpr,
            profit_d: detail.profit_d,
          });
          //console.log(detPrdTemp);
        }

        for (let j = 0; j < body[i].payment.length; j++) {
          //detail payment
          let payment = body[i].payment[j];
          //console.log(payment);

          payTemp.push({
            orderno: body[i].orderno,
            seqno: payment.seqno,
            paytype: payment.paytype,
            docno: payment.docno,
            payamt: payment.payamt,
            deposit: payment.deposit,
            notes: payment.notes,
            paystatus: payment.paystatus,
            bank_code_payment: payment.bank_code_payment,
            charge_admin: payment.charge_admin,
          });
          //console.log(payTemp);
        }

        for (let j = 0; j < body[i].shippAddr.length; j++) {
          //detail payment
          let shippAddr = body[i].shippAddr[j];
          //console.log(payment);

          shippAddrTemp.push({
            orderno: body[i].orderno,
            idstk: body[i].idstk,
            prov_code: shippAddr.prov_code,
            kab_code: shippAddr.kab_code,
            kec_code: shippAddr.kec_code,
            kel_code: shippAddr.kel_code,
            post_code: shippAddr.post_code,
            addr1: shippAddr.addr1,
            addr2: shippAddr.addr2,
            addr3: shippAddr.addr3,
            email: shippAddr.email,
            tel_hp1: shippAddr.tel_hp1,
            tel_hp2: shippAddr.tel_hp2,
            conoteJNE: shippAddr.conoteJNE,
            service_type_id: shippAddr.service_type_id,
            service_type_name: shippAddr.service_type_name,
            flag_send_conote: shippAddr.flag_send_conote,
            total_item: shippAddr.total_item,
            total_weight: shippAddr.total_weight,
            total_pay_net: shippAddr.total_pay_net,
            receiver_name: shippAddr.receiver_name,
            stockist_name: shippAddr.stockist_name,
            kabupaten_name: shippAddr.kabupaten_name,
            province_name: shippAddr.province_name,
            sender_address: shippAddr.sender_address,
            dest_address: shippAddr.dest_address,
            jne_branch: shippAddr.jne_branch,
            shipper_telhp: shippAddr.shipper_telhp,
            cargo_id: shippAddr.cargo_id,
            lat_dest: shippAddr.lat_dest,
            long_dest: shippAddr.long_dest,
            whcd: body[i].whcd,
            whnm: body[i].whnm,
            id_address: shippAddr.id_address,
          });
          //console.log(payTemp);
        }

        //START set variable log_login
        log_login.push({
          log_dfno: body[i].id_memb,
          log_date: body[i].datetrans,
          log_status: "1",
          log_ipaddress: body[i].ip_address,
          appsname: body[i].appname,
        });
        //END set variable log_login

        //START set variable log_trans
        log_trans.push({
          log_dfno: body[i].id_memb,
          log_date: body[i].datetrans,
          log_trcd: body[i].orderno,
          log_sento: body[i].sentTo,
          log_totaldp_sales: body[i].totPayDP,
          log_totaldp_pay: body[i].total_pay,
          log_status_trx: body[i].status_trx,
          log_usrlogin: body[i].userlogin,
          trans_status: body[i].status_trx,
          apps_name: body[i].appname,
          log_ipaddress: body[i].ip_address,
        });
        //END set variable log_trans
      }
    }

    let transaction;
    try {
      transaction = await sequelize.transaction();
      await TransHeaderTmp.bulkCreate(
        //insert header temp from array data
        headerTemp,
        { transaction },
        { validate: true }
      );

      await TransDetPrdTmp.bulkCreate(
        //insert detail product temp from array data
        detPrdTemp,
        { transaction }
      );

      await TransPayDateTmp.bulkCreate(
        //insert detail payment temp from array data
        payTemp,
        { transaction }
      );

      await TransShipAddrTmp.bulkCreate(
        //insert detail shipping address temp from array data
        shippAddrTemp,
        { transaction }
      );

      let login = await Log_login.bulkCreate(
        //insert detail shipping address temp from array data
        log_login,
        { transaction }
      );

      let trans = await Log_trans.bulkCreate(
        //insert detail shipping address temp from array data
        log_trans,
        { transaction }
      );

      await transaction.commit();
      logSuccess(req, res, 200, { login: login, trans: trans });
    } catch (err) {
      await transaction.rollback();

      if (err.name == "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({
            status: "conflict",
            message: "Orderno is already registered",
          });
      }
      if (err.name == "AggregateError") {
        return res
          .status(409)
          .json({
            status: "conflict",
            message: err[0].errors.errors[0].message,
          });
      } else {
        console.log(err);
        internalError(req, res, err);
      }
    }
  };

  const updateTransTmp = async (req, res) => {
    let { body } = req;
    let transaction;

    try {
      let transHeaderTmp = await TransHeaderTmp.findOne({
        where: { orderno: body.orderno },
        attributes: ["orderno"],
      });
      let transHeaderTmpObj = Object.assign(transHeaderTmp);

      let ordernox = transHeaderTmp.dataValues.orderno;
      let userloginx = transHeaderTmp.dataValues.userlogin;

      if (userloginx != body.userlogin) {
        //userlogin di data tidak sama dengan yang login
        return res.status(401).json({ msg: "Not authorized user." });
      } else {
        try {
          transaction = await sequelize.transaction();
          await TransHeaderTmp.update(
            {
              bankaccno: body.bankaccno,
              token: body.token,
              id_memb: body.id_memb,
              nmmember: body.nmmember,
              // total_pay : body.total_pay,
              // total_bv : body.total_bv,
              // pricecode : body.pricecode,
              bonusmonth: body.bonusmonth,
              // datetrans : body.datetrans,
              idstk: body.idstk,
              nmstkk: body.nmstkk,
              status: body.status,
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
              bank_code_payment: body.bank_code_payment,
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
              whcd: body.whcd,
              whnm: body.whnm,
              // kode_pay : body.kode_pay,
              // kode_ref_bank : body.kode_ref_bank,
              // flag_payment : body.flag_payment,
              // date_expired : body.date_expired,
              // kode_unik : body.kode_unik,
              // flag_production : body.flag_production,
              // nom_pay : body.nom_pay,
              // is_cod : body.is_cod,
              is_ship: body.is_ship,
              is_pickup: body.is_pickup,
              pickup_date: body.pickup_date,
              print_count: body.print_count,
              conote_new: body.conote_new,
              pickup_datetime: body.pickup_datetime,
              // pay_insurrance : body.pay_insurrance,
              price_type: body.price_type,
              print_date: body.print_date,
              diskon_produk: body.diskon_produk,
              flag_sms_cod: body.flag_sms_cod,
              paycod_date: body.paycod_date,
            },
            { where: { orderno: body.orderno } },
            { transaction }
          );
          await transaction.commit();
          // console.log('hasilnya = ' + transHeaderTmp.dataValues.orderno);
          return res
            .status(200)
            .json({
              status: "success",
              msg: "Orderno = " + body.orderno + " updated successfully.",
            });
        } catch (err) {
          return res
            .status(409)
            .json({ msg: "Orderno = " + body.orderno + " cannot updated." });
        }
      }
    } catch (error) {
      return res
        .status(400)
        .json({
          status: "failed",
          msg: "Orderno = " + body.orderno + " not founded.",
        });
    }
  };

  const deleteTransTmp = async (req, res) => {
    // const { orderno } = req.body;
    let { body } = req;
    let transaction;

    try {
      let transHeaderTmp = await TransHeaderTmp.findOne({
        where: { orderno: body.orderno },
        attributes: ["orderno"],
      });
      let transHeaderTmpObj = Object.assign(transHeaderTmp);

      let ordernox = transHeaderTmp.dataValues.orderno;
      let userloginx = transHeaderTmp.dataValues.userlogin;

      if (userloginx != body.userlogin) {
        //userlogin di data tidak sama dengan yang login
        return res.status(401).json({ msg: "Not authorized user." });
      } else {
        try {
          transaction = await sequelize.transaction();
          await TransHeaderTmp.destroy(
            {
              where: {
                orderno: body.orderno,
              },
            },
            { transaction }
          );

          await TransDetPrdTmp.destroy(
            {
              where: {
                orderno: body.orderno,
              },
            },
            { transaction }
          );

          await TransPayDateTmp.destroy(
            {
              where: {
                orderno: body.orderno,
              },
            },
            { transaction }
          );

          await TransShipAddrTmp.destroy(
            {
              where: {
                orderno: body.orderno,
              },
            },
            { transaction }
          );

          await transaction.commit();

          return res
            .status(200)
            .json({
              status: "success",
              message: "Orderno = " + body.orderno + " deleted successfully.",
            });
        } catch (err) {
          return res
            .status(500)
            .json({ status: "failed", message: "Internal server error." });
        }
      }
    } catch (error) {
      return res
        .status(400)
        .json({
          status: "failed",
          msg: "Orderno = " + body.orderno + " not founded.",
        });
    }
  };

  const getRemark = async (req, res) => {
    const { id } = req.body;

    try {
      let hdr = await InsertTestHdr.findOne({
        raw: true,
        where: {
          id,
        },
      });

      let leadershipBonus = await insertTestDet.findOne({
        raw: true,
        where: {
          id_hdr: id,
        },
      });

      let initiativeBonus = await insertTestDet.findOne({
        raw: true,
        where: {
          id_hdr: id,
        },
      });

      let header = Object.assign(hdr, { leadershipBonus }, { initiativeBonus });

      return res.status(200).json(header);
    } catch (err) {
      console.log(err);

      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error" });
    }
  };

  //Random number untuk security no
  function randomSecNo() {
    let rndNo1 = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    let rndNo2 = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    let rndNo3 = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    let rndNo4 = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    let rndNo5 = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    let rndNo6 = Math.floor(Math.random() * (9 - 0 + 1) + 0);
    let rndNo =
      rndNo1 +
      "" +
      rndNo2 +
      "" +
      rndNo3 +
      "" +
      rndNo4 +
      "" +
      rndNo5 +
      "" +
      rndNo6;
    // console.log(rndNo);
    return rndNo;
    //res.status(200).json( rndNo );
  }

  //Hitung keuntungan langsung

  function keuntunganLgsg(c_price, d_price, ongkir, is_freongkir) {
    let untung;

    if (is_freongkir == "1") {
      //jika ongkir ditanggung penjual, maka untung = (c_price - d_price) - ongkir
      untung = c_price - d_price - ongkir;
      console.log("untung = " + untung);
      if (untung < ongkir) {
        //jika untung lebih kecil dari ongkir, maka tidak bisa dilanjutkan
        // process.exit();
        return 0; //'Batas free ongkir tidak mencukupi';
      } else {
        return untung;
      }
    } else if (is_freongkir == "0") {
      //jika ongkir ditanggung konsumen maka  untung = (c_price - d_price)
      // console.log("masuk else");
      untung = c_price - d_price;
      return untung;
    }
  }



  const checkTransTmpByOrder = async (req, res) => {
    let { body } = req;
    let TransHeaderProd = require('../models/TransHeaderSukses');
    let ordernoTmp = "Orderno Temporary Not Founded", ordernoSukses = "Orderno Production Not Founded",
        orderTmpStat = "Error", orderSuksesStat = "Error";
    let errorx = 0;

    try {
      //Temporary Transaction
      let transHeaderTmp = await TransHeaderTmp.findOne({
        where: { orderno: body.orderno },
        attributes: ["orderno"],
      });
      let transHeaderTmpObj = Object.assign(transHeaderTmp);

      ordernoTmp = transHeaderTmp.dataValues.orderno;
      orderTmpStat = "success"
      console.log('ordernoTmp == '+ordernoTmp);
    } catch (error) {
      errorx = 1;
    }

    try {
      //Production Transaction
      let transHeaderSukses = await TransHeaderProd.findOne({
        where: { token: body.orderno },
        attributes: ["token"],
      });
      let transHeaderSuksesObj = Object.assign(transHeaderSukses);

      ordernoSukses = transHeaderSukses.dataValues.token;
      orderSuksesStat = "success"
    } catch (error) {
      errorx = errorx + 1;
    }
    console.log('ordernoProd == '+ordernoSukses);

    return res.status(200).json({status: "success", dataTemp:{ordernoTmp:ordernoTmp, statusOrder:orderTmpStat}, dataProd:{ordernoProd:ordernoSukses, statusOrder:orderSuksesStat}});

  };



  //Start API For Landingpage or digitalbrain.co.id
  const insertTransTmpLP = async (req, res) => {
    let { body } = req;
    let err = "";

    // //==============================================================================================
    // //START Check Validasi isi product sebelum masuk ke dalam table
    // let validatePrd
    // validatePrd = await ProductControllerKnet().cekProductByParamArr(body);
    // console.log(validatePrd);
    // console.log("validatePrd.errCount = " + validatePrd.data.errCount);
    // if(validatePrd.data.errCount >= 1){ // jika hasilnya 1, maka ada error
    //     let msg = "Illegal product(s)/shipping data. " + validatePrd.msg;
    //     return logOrderError(req, res, 409, msg, err);
    // }else if(validatePrd.data.errCount == 0){ // jika hasilnya 0, maka lanjutkan
    //   //tampung untuk compare BV, Harga Dist, Harga Konsumen
    //   var dataResponse = validatePrd.data.resDet;
    //   // console.log("Masuk ke else if");
    //   // let pricecodeVal = dataResponse[0].pricecode;
    //   // let ordernoValidate = dataResponse[0].orderno;
    //   // let totalBVValidate = dataResponse[0].totalBV;
    //   // let totalDPValidate = dataResponse[0].totalDP;
    //   // let totalCPValidate = dataResponse[0].totalCP;
    // }
    // //END Check Validasi isi product sebelum masuk ke dalam table
    // //==============================================================================================

    // console.log(body.length);

    if (body.length > 0) {
      var headerTemp = [];
      var detPrdTemp = [];
      var payTemp = [];
      var shippAddrTemp = [];
      var log_login = [];
      var log_trans = [];
      var ordernoxx;
      var is_codxx;
      var bank_code_paymentxx;
      var pricecode;

      let secnoX = randomSecNo();

      for (let i = 0; i < body.length; i++) {
        //==============================================================================================
        //START cek keuntungan langsung
        let untLgsg = keuntunganLgsg(
          body[i].totPayCP,
          body[i].totPayDP,
          body[i].payShip,
          body[i].is_free_sip_from_member
        );
        //END cek keuntungan langsung
        //==============================================================================================

        // //==============================================================================================
        // //START CEK BV, Harga Dist, Harga Konsumen. Apakah sudah sesuai atau belum dengan database
        // let pricecodeVal = dataResponse[i].pricecode;
        // let ordernoValidate = dataResponse[i].orderno;
        // let totalBVValidate = dataResponse[i].grdtotalBV;
        // let totalDPValidate = dataResponse[i].grdtotalDP;
        // let totalCPValidate = dataResponse[i].grdtotalCP;

        // // console.log("==========================================================================");
        // // console.log("CHECK STARTED");
        // // console.log("ordernoValidate != body[i].orderno = " + ordernoValidate + " != " + body[i].orderno);
        // // console.log("pricecodeVal != body[i].pricecode = " + pricecodeVal + " != " + body[i].pricecode);
        // // console.log("totalBVValidate != body[i].total_bv = " + totalBVValidate + " != " + body[i].total_bv);
        // // console.log("totalDPValidate != body[i].totPayDP = " + totalDPValidate + " != " + body[i].totPayDP);
        // // console.log("totalCPValidate != body[i].totPayCP = " + totalCPValidate + " != " + body[i].totPayCP);
        // // console.log("CHECK ENDED");
        // // console.log("==========================================================================");
        // if(ordernoValidate != body[i].orderno || pricecodeVal != body[i].pricecode || 
        //    totalBVValidate != body[i].total_bv || totalDPValidate != body[i].totPayDP || 
        //    totalCPValidate < body[i].totPayCP){
        //   let msg = "Invalidate data header/detail for orderno = " + body[i].orderno;
        //   return logOrderError(req, res, 409, msg, err);
        // }
        // //END CEK BV, Harga Dist, Harga Konsumen. Apakah sudah sesuai atau belum dengan database
        // //==============================================================================================

        let id_membUpper = body[i].id_memb.toUpperCase();
        let userloginUpper = body[i].userlogin.toUpperCase();
        let idstk = body[i].idstk;
        let nmstkk = body[i].nmstkk;
        let price_typex = body[i].price_type, 
            id_lpx = body[i].id_lp, 
            free_ship_valx = body[i].free_ship_val, 
            is_free_sip_from_memberx = body[i].is_free_sip_from_member;

        ordernoxx = body[i].orderno;
        if(body[i].appname == "digitalbrain.co.id"){
          ordernoxx = "EC" + body[i].orderno;  
        }

        if((price_typex !== null || price_typex !== undefined) && (body[i].appname.includes('app.k-mart')) && (id_lpx == 'CUST')){
          price_typex = '1'; 

          if(is_free_sip_from_memberx == '0'){
            free_ship_valx = 0;
          }

        }
        
        is_codxx = body[i].is_cod;
        bank_code_paymentxx = body[i].bank_code_payment;

        pricecode = body[i].pricecode;
        if (pricecode == "12W3") {
          pricecode = "12W4";
        } else if ((pricecode == "12E4")) {
          pricecode = "12E4";
        }

        if (idstk == "") {
          idstk = "BID06";
        }

        if (nmstkk == "") {
          nmstkk = "BID06 - PT. K-LINK NUSANTARA";
        }

        //Start cek kode bank
        let paytype1 = "";
        for (let jj = 0; jj < 1; jj++) {
          //detail payment
          let payment1 = body[i].payment[jj];
          paytype1 = payment1.paytype;
        }

        let bank_id;
        let bank_code;
        let bankCode;
        let charge_admin;

        //jika non cod, maka cek bank_code_payment = ikuti yang ada, jika COD maka bank_code_payment = 40
        if (is_codxx == "0" && body[i].appname == "digitalbrain.co.id") {
          // console.log("is_codxx == 0 " + is_codxx);
          bankCode = await MiscController().getBankCode(body[i].bank_code_payment, paytype1);
          bank_id = bankCode[0].id;
          bank_code = bankCode[0].bankCode;
          charge_admin = bankCode[0].charge_admin; //untuk pembanding apakah biaya admin sesuai dengan database atau tidak, jika nanti tidak sesuai maka return Error
        } else if (is_codxx == "1") {
          // console.log("is_codxx == 1 " + is_codxx);
          bank_id = "40";
          bank_code = "COD";
          charge_admin = 0;
        }

        //==============================================================================================
        // START CEK BIAYA ADMIN jika tidak sesuai DENGAN DATA YG ADA DI DB maka return Error
        if(body[i].payAdm < charge_admin){

          //=================START 2021-05-21 TAMBAHAN UNTUK MARS=================
          //jika non cod, maka cek bank_code_payment = ikuti yang ada, jika COD maka bank_code_payment = 40
          if (is_codxx == "0") {
            // console.log("is_codxx == 0 " + is_codxx);
            bankCode = await MiscController().getBankCodeMars(body[i].bank_code_payment, paytype1, body[i].appname);
            console.log("Mars :== " + bankCode[0]);
            bank_id = bankCode[0].id;
            bank_code = bankCode[0].bankCode;
            charge_admin = bankCode[0].charge_admin; //untuk pembanding apakah biaya admin sesuai dengan database atau tidak, jika nanti tidak sesuai maka return Error
          } else if (is_codxx == "1") {
            // console.log("is_codxx == 1 " + is_codxx);
            bank_id = "40";
            bank_code = "COD";
            charge_admin = 0;
          }
          //=================END 2021-05-21 TAMBAHAN UNTUK MARS=================

          if(body[i].payAdm < charge_admin){
            let msg = "Illegal Bank/Charge Admin for orderno = " + body[i].orderno;
            // return logOrderError(req, res, 409, msg, err);ordernoxx
            console.log("body[i].payAdm " + body[i].payAdm);
            console.log("charge_admin = " + charge_admin);
            return res.status(400).json({status:'failed', msg: msg, data: null});
          }
          
        }
        // END CEK BIAYA ADMIN jika tidak sesuai DENGAN DATA YG ADA DI DB maka return Error
        //==============================================================================================


        console.log('test');
        let bonusmth = body[i].bonusmonth;
        let bmonth = "";
        let byear = "";
        let bonusperiod;
        let reslt = bonusmth.split("/");
        for (let ii = 0; ii < bonusmth.length; ii++) {
          if (ii == 0 && reslt[0].length == 1) {
            bmonth = "0" + reslt[0];
          } else {
            bmonth = reslt[0];
          }

          if (ii == 1) {
            byear = reslt[1];
          }

          bonusperiod = bmonth + "/" + byear;
        }

        let seqno, is_cvoucher, is_pvoucher, vcr_cash_list, api_date, ip_call_api, 
            tot_nom_ip_cash, tot_nom_ip_cashvcr, tot_nom_ip_prodvcr, tot_nom_payAdm, 
            tot_nom_profit_member_new, tot_nom_bv_sum, nom_cvoucher, nom_pvoucher, 
            is_member, reff_code;

        if (body[i].seqno) {seqno = body[i].seqno;}
        if (body[i].is_cvoucher) {is_cvoucher = body[i].is_cvoucher;}
        if (body[i].is_pvoucher) {is_pvoucher = body[i].is_pvoucher;}
        if (body[i].vcr_cash_list) {vcr_cash_list = body[i].vcr_cash_list;}
        if (body[i].api_date) {api_date = body[i].api_date;}
        if (body[i].ip_call_api) {ip_call_api = body[i].ip_call_api;}

        if (body[i].tot_nom_ip_cash) {tot_nom_ip_cash = body[i].tot_nom_ip_cash;}
        if (body[i].tot_nom_ip_cashvcr) {tot_nom_ip_cashvcr = body[i].tot_nom_ip_cashvcr;}
        if (body[i].tot_nom_ip_prodvcr) {tot_nom_ip_prodvcr = body[i].tot_nom_ip_prodvcr;}
        if (body[i].tot_nom_payAdm) {tot_nom_payAdm = body[i].tot_nom_payAdm;}

        if (body[i].tot_nom_profit_member_new) {tot_nom_profit_member_new = body[i].tot_nom_profit_member_new;}
        if (body[i].tot_nom_bv_sum) {tot_nom_bv_sum = body[i].tot_nom_bv_sum;}
        if (body[i].nom_cvoucher) {nom_cvoucher = body[i].nom_cvoucher;}
        if (body[i].nom_pvoucher) {nom_pvoucher = body[i].nom_pvoucher;}
        if (body[i].is_member) {is_member = body[i].is_member;}
        if (body[i].reff_code) {reff_code = body[i].reff_code;}

        console.log("bonusperiod = " + bonusperiod);
        // console.log('bank_id = ' +bank_id)
        //End cek kode bank

        //START set variable header temp
        headerTemp.push({
          //id : body[i].id,
          orderno: ordernoxx, //'EC' + body[i].orderno,
          bankaccno: body[i].bankaccno,
          token: body[i].orderno, //token : body[i].token,
          id_memb: id_membUpper, //body[i].id_memb,
          nmmember: body[i].nmmember,
          total_pay: body[i].totPayDP,
          total_pay_all: body[i].total_pay,
          total_bv: body[i].total_bv,
          pricecode: pricecode, //body[i].pricecode,
          bonusmonth: bonusperiod, //body[i].bonusmonth,
          datetrans: body[i].datetrans,
          idstk: idstk, //body[i].idstk,
          nmstkk: nmstkk, //body[i].nmstkk,
          status: body[i].status,
          secno: secnoX, //secno : body[i].secno,
          flag_trx: body[i].flag_trx,
          sentTo: body[i].sentTo,
          // SSRno : body[i].SSRno,
          // REGISTERno : body[i].REGISTERno,
          // CNno : body[i].CNno,
          // KWno : body[i].KWno,
          // IPno : body[i].IPno,
          // CNstatus : body[i].CNstatus,
          // KWstatus : body[i].KWstatus,
          // IPstatus : body[i].IPstatus,
          // dateKW : body[i].dateKW,
          // dateCN : body[i].dateCN,
          // dateIP : body[i].dateIP,
          // usrKW : body[i].usrKW,
          // eod_status : body[i].eod_status,
          // status_vt_pay : body[i].status_vt_pay,
          // status_vt_app_dt : body[i].status_vt_app_dt,
          // status_vt_reject_dt : body[i].status_vt_reject_dt,
          payShip: body[i].payShip,
          payAdm: body[i].payAdm,
          // CNPosteddt : body[i].CNPosteddt,
          // KWPosteddt : body[i].KWPosteddt,
          // IPPosteddt : body[i].IPPosteddt,
          // CNPrintStatus : body[i].CNPrintStatus,
          // KWPrintStatus : body[i].KWPrintStatus,
          // IPPrintStatus : body[i].IPPrintStatus,
          // is_umroh : body[i].is_umroh,
          bank_code_payment: bank_id,
          userlogin: userloginUpper, //body[i].userlogin,
          // payConnectivity : body[i].payConnectivity,
          is_login: body[i].is_login,
          totPayDP: body[i].totPayDP,
          totPayCP: body[i].totPayCP,
          profit_member: untLgsg, //body[i].profit_member,
          is_free_sip_from_member: body[i].is_free_sip_from_member,
          free_ship_val: free_ship_valx, //body[i].free_ship_val,
          profit_member_after_deduct: untLgsg, //body[i].profit_member_after_deduct,
          id_lp: body[i].id_lp,
          free_shipping: body[i].free_shipping,
          discount_shipping: body[i].discount_shipping,
          // cashback_point : body[i].cashback_point,
          no_hp_konfirmasi: body[i].no_hp_konfirmasi,
          whcd: body[i].whcd,
          whnm: body[i].whnm,
          kode_pay: body[i].kode_pay,
          kode_ref_bank: body[i].kode_ref_bank,
          flag_payment: body[i].flag_payment,
          date_expired: body[i].date_expired,
          kode_unik: body[i].kode_unik,
          flag_production: body[i].flag_production,
          nom_pay: body[i].nom_pay,
          is_cod: body[i].is_cod,
          // is_ship : body[i].is_ship,
          // is_pickup : body[i].is_pickup,
          // pickup_date : body[i].pickup_date,
          // print_count : body[i].print_count,
          conote_new: body[i].conote_new,
          // pickup_datetime : body[i].pickup_datetime,
          pay_insurrance: body[i].pay_insurrance,
          price_type: price_typex, //body[i].price_type, // 0=distributor, 1=consument
          // print_date : body[i].print_date,
          // diskon_produk : body[i].diskon_produk,
          // flag_sms_cod : body[i].flag_sms_cod,
          // paycod_date : body[i].paycod_date,
          appname: body[i].appname,
          trxtype: body[i].trxtype, //1=transaction no voucher, 2=registermember, 3=umroh, 4=transaction with voucher
          group_trans_hdr: body[i].group_trans_hdr,
          is_dropshipper: body[i].is_dropshipper,
          dropshipper_name: body[i].dropshipper_name,
          // confirmeddate
          // confirmstatus
          // remarks
          // confirmedby
          seqno: seqno,
          is_cvoucher: is_cvoucher,
          is_pvoucher: is_pvoucher,
          vcr_cash_list: vcr_cash_list,
          api_date: api_date,
          ip_call_api: ip_call_api,
          tot_nom_ip_cash: tot_nom_ip_cash,
          tot_nom_ip_cashvcr: tot_nom_ip_cashvcr,
          tot_nom_ip_prodvcr: tot_nom_ip_prodvcr,
          tot_nom_payAdm: tot_nom_payAdm,
          tot_nom_profit_member_new: tot_nom_profit_member_new,
          tot_nom_bv_sum: tot_nom_bv_sum,
          nom_cvoucher: nom_cvoucher,
          nom_pvoucher: nom_pvoucher,
          is_member: is_member,
          reff_code: reff_code,
        });
        //END set variable header temp
        
        for (let j = 0; j < body[i].detail.length; j++) {
          //detail product
          let prdcd_package, prdcd_original;

          let detail = body[i].detail[j];

          if (detail.prdcd_package) {prdcd_package = detail.prdcd_package;}
          if (detail.prdcd_original) {prdcd_original = detail.prdcd_original;}
        
          //console.log(detail);
          detPrdTemp.push({
            orderno: ordernoxx, //'EC' + body[i].orderno,
            prdcd: detail.prdcd,
            prdnm: detail.prdnm,
            qty: detail.qty,
            bvr: detail.bvr,
            dpr: detail.dpr,
            pricecode: pricecode, //body[i].pricecode,
            sentTo: body[i].sentTo,
            ByrSisaSales: detail.ByrSisaSales,
            cpr: detail.cpr,
            profit_d: detail.profit_d,
            prdcd_package: detail.prdcd_package,
            prdcd_original: detail.prdcd_original,
          });

          //console.log(detPrdTemp);
        }

        for (let j = 0; j < body[i].payment.length; j++) {
          //detail payment
          let payment = body[i].payment[j];
          // console.log(payment);

          // //Start cek kode bank
          // console.log('payment = ' +payment.bank_code_payment)

          let bank_id, bank_code, bankCode, expired_pay_time, remarks;
          if (payment.expired_pay_time) {expired_pay_time = payment.expired_pay_time;}
          if (payment.remarks) {remarks = payment.remarks;}

          //jika non cod, maka cek bank_code_payment = ikuti yang ada, jika COD maka bank_code_payment = 40
          if (is_codxx == "0") {
            console.log("is_codxx == 0 " + is_codxx);
            bankCode = await MiscController().getBankCode(
              payment.bank_code_payment,
              payment.paytype
            );
            console.log('bankCode = ' +bankCode)
            bank_id = bankCode[0].id;
            bank_code = bankCode[0].bankCode;
          } else if (is_codxx == "1") {
            console.log("is_codxx == 1 " + is_codxx);
            bank_id = "40";
            bank_code = "COD";

            bankCode = await MiscController().getBankCode(
              payment.bank_code_payment,
              payment.paytype
            );
            bank_id = bankCode[0].id;
            bank_code = bankCode[0].bankCode;

          }
          //End cek kode bank

            // console.log("masuk ke ada ya");

            payTemp.push({
              orderno: ordernoxx, //'EC' + body[i].orderno,
              seqno: payment.seqno,
              paytype: payment.paytype,
              docno: payment.docno,
              payamt: payment.payamt,
              deposit: payment.deposit,
              notes: payment.notes,
              paystatus: payment.paystatus,
              bank_code_payment: bank_id, //payment.bank_code_payment,
              charge_admin: payment.charge_admin,
              expired_pay_time: expired_pay_time,
              remarks: remarks,
            });

          //console.log(payTemp);
        }

        for (let j = 0; j < body[i].shippAddr.length; j++) {
          //detail payment
          let shippAddr = body[i].shippAddr[j];
          //console.log(payment);

          //Start cek kode shipper
          // console.log('service_type_id = ' +shippAddr.service_type_id)
          let shipperCode = await MiscController().getShipperCode(
            shippAddr.service_type_id
          );
          let shipper_id = shipperCode[0].shipper_id;
          //End cek kode shipper

          shippAddrTemp.push({
            orderno: ordernoxx, //'EC' + body[i].orderno,
            idstk: body[i].idstk,
            prov_code: shippAddr.province_name, //shippAddr.prov_code,
            kab_code: shippAddr.kabupaten_name, //shippAddr.kab_code,
            kec_code: shippAddr.kec_code,
            kel_code: shippAddr.kel_code,
            post_code: shippAddr.post_code,
            addr1: shippAddr.addr1,
            addr2: shippAddr.addr2,
            addr3: shippAddr.addr3,
            email: shippAddr.email,
            tel_hp1: shippAddr.tel_hp1,
            tel_hp2: shippAddr.tel_hp2,
            conoteJNE: body[i].conote_new, //shippAddr.conoteJNE,
            service_type_id: shippAddr.service_type_id,
            service_type_name: shippAddr.service_type_name,
            flag_send_conote: shippAddr.flag_send_conote,
            total_item: shippAddr.total_item,
            total_weight: shippAddr.total_weight,
            total_pay_net: shippAddr.total_pay_net,
            receiver_name: shippAddr.receiver_name,
            stockist_name: body[i].nmstkk, //shippAddr.stockist_name,
            kabupaten_name: shippAddr.kabupaten_name,
            province_name: shippAddr.province_name,
            sender_address: shippAddr.sender_address,
            dest_address: shippAddr.dest_address,
            jne_branch: shippAddr.jne_branch,
            shipper_telhp: shippAddr.shipper_telhp,
            cargo_id: shipper_id, //shippAddr.cargo_id,
            lat_dest: shippAddr.lat_dest,
            long_dest: shippAddr.long_dest,
            whcd: body[i].whcd,
            whnm: body[i].whnm,
            id_address: shippAddr.id_address,
          });
          //console.log(payTemp);
        }

        //START set variable log_login
        log_login.push({
          log_dfno: body[i].id_memb,
          log_date: body[i].datetrans,
          log_status: "1",
          log_ipaddress: body[i].ip_address,
          appsname: body[i].appname,
        });
        //END set variable log_login

        //START set variable log_trans
        let confirmURLx;
        // if(is_codxx == "1"){
            confirmURLx = "https://www.k-net.co.id/trx/confirm/" + ordernoxx;
            console.log("is_codxx :: " + is_codxx + "-- confirmURLx :: " + confirmURLx);
        // }

        log_trans.push({
          log_dfno: body[i].id_memb,
          log_date: body[i].datetrans,
          log_trcd: ordernoxx, //'EC' + body[i].orderno,
          log_sento: body[i].sentTo,
          log_totaldp_sales: body[i].totPayDP,
          log_totaldp_pay: body[i].total_pay,
          log_status_trx: body[i].status_trx,
          log_usrlogin: body[i].userlogin,
          trans_status: body[i].status_trx,
          apps_name: body[i].appname,
          log_ipaddress: body[i].ip_address,
          confirmURL: confirmURLx
        });
        //END set variable log_trans
      }
    }



    let transaction;
    try {
      transaction = await sequelize.transaction();
      await TransHeaderTmp.bulkCreate(
        //insert header temp from array data
        headerTemp,
        { transaction },
        { validate: true }
      );

      await TransDetPrdTmp.bulkCreate(
        //insert detail product temp from array data
        detPrdTemp,
        { transaction }
      );

      await TransPayDateTmp.bulkCreate(
        //insert detail payment temp from array data
        payTemp,
        { transaction }
      );

      await TransShipAddrTmp.bulkCreate(
        //insert detail shipping address temp from array data
        shippAddrTemp,
        { transaction }
      );

      let login = await Log_login.bulkCreate(
        //insert detail shipping address temp from array data
        log_login,
        { transaction }
      );

      let trans = await Log_trans.bulkCreate(
        //insert detail shipping address temp from array data
        log_trans,
        { transaction }
      );

      await transaction.commit();
      // logSuccess(req, res, 200, {login: login, trans: trans}, 'success')
      return logOrderTempSuccess(
        req,
        res,
        200,
        { login: login, trans: trans },
        ordernoxx
      );
    } catch (err) {
      await transaction.rollback();

      if (err.name == "SequelizeUniqueConstraintError") {
        let msg = "Orderno is already registered";
        // return res.status(409).json({ status: 'conflict', message: 'Orderno is already registered' });
        // logReturn(req, res, 409, msg, 'failed')
        return logOrderError(req, res, 409, msg, err);
      } else if (err.name == "AggregateError") {
        // return res.status(409).json({ status: 'conflict', message: err[0].errors.errors[0].message} );
        let msg = "Error AggregateError"; //err[0].errors.errors[0].message
        return logOrderError(req, res, 409, msg, err);
      } else {
        console.log(err);
        return logOrderError(req, res, 409, err);
      }
    }
  };

  //End API For Landingpage or digitalbrain.co.id

  return {
    insertTransTmp,
    getRemark,
    updateTransTmp,
    deleteTransTmp,
    randomSecNo,
    insertTransTmpLP,
    checkTransTmpByOrder,
    keuntunganLgsg,
  };
};

module.exports = InsertTransTempController;
