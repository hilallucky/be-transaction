const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');
const sequelize_ecomm = require("../../config/db/ecomm_production.js");
const Ecomm_voucherPromo = require('../models/Ecomm_voucherPromo');
const dateFormat = require('dateformat');
const today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss');
const {internalError, logSuccess, logError} = require('../services/logger');
const redis = require('redis');
const client = redis.createClient();

const MiscController = require('../controllers/MiscController');

const VoucherGiftController = () => {

"use strict";

  const compareCartWithVocherRule = async (req, res) => {
    const {refArr, actualArr, rules} = req.body;
    //refArr arr nomor Voucher
    //actualArr arr kode product di cart
    //rules rules sesuai dengan table ketentuan promo
    let a, b = [], valX , resX = 1, resMsg = false;
    for (let i = 0; i < refArr.length; i++) {

        let sql = "SELECT a.voucherno, a.dfno, a.fullnm, a.claimStatus, a.[status], a.specificPrdcd, a.specificPrdOnly " +
                  "FROM ecomm_voucherPromo a WHERE a.voucherno = '" + refArr[i] +"'"
        
        let dataVoucher = await sequelize.query(sql);

        if (!dataVoucher || dataVoucher[0].length == 0) {
            return logError(req, res, 400, 'No Voucher Available.');
        }else{
            console.log(dataVoucher[0][0].voucherno);
            console.log(dataVoucher[0][0].specificPrdcd);

            let specificPrdOnlyX = dataVoucher[0][0].specificPrdOnly;
            let specificPrdcdX = dataVoucher[0][0].specificPrdcd;
            // console.log("specificPrdcdX Ori = " + specificPrdcdX);

            specificPrdcdX.replace(" ", "");

            if(specificPrdcdX != "all" && specificPrdcdX != ""){
                let conditionAnd = specificPrdcdX.indexOf("*");
                let conditionOr = specificPrdcdX.indexOf("#");

                if(conditionOr >= 0){
                  // console.log("masuk cek conditionOr");
                  specificPrdcdX = specificPrdcdX.split('#');
                }else if(conditionAnd >= 0){
                  // console.log("masuk cek conditionAnd");
                  specificPrdcdX = specificPrdcdX.split('*');
                }

                console.log("specificPrdcdX sebelum compareCartWithVocherRule : " + specificPrdcdX);

                a = MiscController().compareCartWithVocherRule(specificPrdcdX, actualArr, specificPrdOnlyX);
                if(a == false){
                    b.push(0);
                    resX = 0;
                    return res.status(200).json({ status: 'success', message: a}); 
                }else{
                    b.push(1);
                }
            }else{
                // console.log("specificPrdcdX else : " + specificPrdcdX);
                a = true;
                b.push(1);
            }

            
        }
    }

    // console.log("b : " + b);
    // // console.log("keys : " + b);
    // // console.log("keys : " + Object.keys(b));
    // console.log("values : " + Object.values(b));
    // console.log("entries : " + Object.entries(b));
    
    // console.log("length : " + b.length);
    // // console.log("b after sort : " + b);
    
    b.sort().reverse(); //sort object descending, 0 in the back
    let val;
    if(b.length > 1){
        for (let valuess of Object.values(b)) {
            val = b[valuess];
            // console.log("resX : " + resX);
            // console.log("val : " + val);
            resX = resX * val;
        }
    }else{
      val = Object.values(b);
      resX = resX * val;
      // console.log("val : " + val); 
      // console.log("resX : " + resX);   
    }

    // console.log("resX : " + resX);

    if(resX == 1){
      resMsg = true;
      return res.status(200).json({ status: 'success', message: resMsg}); 
    }else{
      return res.status(200).json({ status: 'success', message: resMsg}); 
    }

  }


  const VoucherGiftCheck = async (req, res) => {
    const {dfno, voucherno, voucherkey, claim, getOrderno, vouchertype} = req.body;
     
     /* param claim : 
        0 list semua voucher yang belum expired & belum diclaim, 
        1 list semua voucher yang sudah expired atau sudah diclaim, 
        2 list semua voucher tanpa terkecuali
      */
    console.log("getOrderno = " + getOrderno);
    let getOrdernoX = "";
    if(getOrderno !== undefined && getOrderno != ""){
      getOrdernoX = " AND getOrderno LIKE '" + getOrderno + "%' ";
    }
    console.log(getOrdernoX);

    let vcrParam = " a.voucherno = '" + voucherno + "' AND a.voucherkey = '" + voucherkey + "' ";
    let vouchernoParam, voucherkeyParam, dfnoParam, claimVal, claimstatus, paramWhere;


    let expireddt = " AND A.expireddt >= '" + today + "' ";

    if(dfno != null || dfno != ""){
      dfnoParam = " a.dfno = '" + dfno + "' ";
    }
    if(voucherno != null || voucherno != ""){
      vouchernoParam = " a.voucherno = '" + voucherno + "' ";
    }
    if(voucherkey != null && voucherkey != ""){
      voucherkeyParam = " a.voucherkey = '" + voucherkey + "' ";
    }

    if((claim == 1)){ //&& (voucherno == null || voucherno == "") && (dfno != null || dfno != "")){
      console.log("masuk 01");
      claimVal = '0'; //jika claimVal = 0 maka hanya mengecek, jika claimVal = 1 maka akan claim, 2 = all
      claimstatus = " a.claimstatus = '"+ claimVal +"' AND a.status = '"+ claimVal +"' ";
      paramWhere = " WHERE " + claimstatus + " AND " + dfnoParam + " AND " + vouchernoParam + " AND " + voucherkeyParam + expireddt;
    }else if((claim == 0) && (voucherno == null || voucherno == "") && (dfno != null || dfno != "")){ //jika hanya ingin mengecek voucher berdasarkan id member
      console.log("masuk 02");
      claimVal = '0';
      claimstatus = " a.claimstatus = '"+ claimVal +"' AND a.status = '"+ claimVal +"' ";
      paramWhere = " WHERE " + claimstatus + " AND " + dfnoParam + expireddt;
    }else if((claim == 0) && (voucherno != null || voucherno != "") && (dfno == null || dfno == "")){ //jika hanya ingin mengecek voucher berdasarkan voucher no
      console.log("masuk 03");
      claimVal = '0';
      claimstatus = " a.claimstatus = '"+ claimVal +"' AND a.status = '"+ claimVal +"' ";
      paramWhere = " WHERE " + claimstatus + " AND " + vouchernoParam + expireddt;
    }else if((claim == 0) && (voucherno != null || voucherno != "") && (dfno != null || dfno != "")){ //jika ingin mengeluarkan semua voucher berdasarkan id member
      console.log("masuk 04");
      claimVal = '0';
      claimstatus = " a.claimstatus = '"+ claimVal +"' AND a.status = '"+ claimVal +"' ";
      paramWhere = " WHERE " + claimstatus + " AND " + dfnoParam + " AND " + vouchernoParam + " AND " + voucherkeyParam + expireddt;
    }else if((claim == 2) && (voucherno == null || voucherno == "") && (dfno != null || dfno != "")){ //jika ingin mengeluarkan semua voucher berdasarkan id member
      console.log("masuk 06");
      paramWhere = " WHERE " + dfnoParam + expireddt;
    }else if((claim == 2) && (voucherno != null || voucherno != "") && (dfno == null || dfno == "")){ //jika ingin mengeluarkan semua voucher berdasarkan id member
      console.log("masuk 07");
      paramWhere = " WHERE " + vouchernoParam;
    }else if((claim == 2) && (voucherno != null || voucherno != "") && (dfno != null || dfno != "")){ //jika ingin mengeluarkan semua voucher berdasarkan id member
      console.log("masuk 04");
      claimstatus = " a.claimstatus = '"+ 2 +"' AND a.status = '"+ 2 +"' ";
      paramWhere = " WHERE " + dfnoParam + " AND " + vouchernoParam + " AND " + voucherkeyParam + expireddt;
    }else if((claim == 99) && (voucherno != null || voucherno != "") && (dfno != null || dfno != "")){ //jika ingin check statusnya saja
      console.log("masuk 04");
      claimVal = '0';
      claimstatus = "";
      paramWhere = " WHERE " + dfnoParam + " AND " + vouchernoParam + " AND " + voucherkeyParam + expireddt;
    }


    //list all specific voucher type
    let vouchertypeX = " AND A.vouchertype = 'PROMO-REG' ",
        vouchertypeXNon = " AND A.vouchertype <> 'PROMO-REG' ",
        topOne = " TOP 1 ";
    if(vouchertype){
      vouchertypeX = " AND vouchertype = '" + vouchertype + "' ";
      vouchertypeXNon = vouchertypeX;
      topOne = " ";
    }
    
    try{
      let sqlFields = " a.id, a.voucherno, a.dfno, a.fullnm, a.voucherAmt, a.voucherkey, a.is_freeproduct, " +
                " a.status, a.claimStatus, a.createddt, a.activateddt,  a.ip_activated, " +
                " a.browsertype_actived, a.claimeddt, a.ip_claimed, a.browsertype_claimed, " +
                " a.createdby, a.vouchertype, a.appname, a.getorderno, a.claimedorderno, a.expireddt, " +
                " ISNULL(a.bvAllowed, 0) AS bvAllowed, " +
                // " CASE WHEN a.bvAllowed IS NULL OR a.bvAllowed = '0' THEN 'P' WHEN a.bvAllowed = '1' THEN 'C' END AS vchtype " +
                " CASE WHEN a.vchtype IS NOT NULL THEN a.vchtype WHEN a.vchtype IS NULL AND (a.bvAllowed IS NULL OR a.bvAllowed = '0') THEN 'P' " +
                "       WHEN a.vchtype IS NULL AND (a.bvAllowed = '1') THEN 'C' END AS vchtype, " +
                " a.specificPrdOnly, a.specificPrdcd, a.allowedCombinedVoucher ";
      let sqlGroup = " a.id, a.voucherno, a.dfno, a.fullnm, a.voucherAmt, a.voucherkey, a.is_freeproduct, " +
                " a.status, a.claimStatus, a.createddt, a.activateddt,  a.ip_activated, " +
                " a.browsertype_actived, a.claimeddt, a.ip_claimed, a.browsertype_claimed, " +
                " a.createdby, a.vouchertype, a.appname, a.getorderno, a.claimedorderno, a.expireddt, " +
                " ISNULL(a.bvAllowed, 0), a.bvAllowed, a.vchtype, " +
                " a.specificPrdOnly, a.specificPrdcd, a.allowedCombinedVoucher ";
      
      let sqlOri = sqlFields + " FROM ecomm_voucherPromo a " + " " + paramWhere + getOrdernoX //+
                //" ORDER BY a.id, a.expireddt " ;
      let sql1 = "SELECT " + sqlOri + vouchertypeXNon; // +
      let sql2 = "SELECT " + topOne + sqlOri + vouchertypeX; // +
                //" ORDER BY a.id, a.expireddt " ;
      let sql =  sql1 + " UNION " + sql2; // + " ORDER BY a.id, a.expireddt ";
      sql = sql + " GROUP BY " + sqlGroup + " ORDER BY a.id, a.expireddt ";

      // console.log(sql);
      let dataVoucher = await sequelize.query(sql);
      // console.log(dataVoucher[0]); 
      // console.log("dataVoucher[0].length = " + dataVoucher[0].length);

      if (!dataVoucher || dataVoucher[0].length == 0) {
       return logError(req, res, 400, 'No Voucher Available.');
      }

      let msg = "Available Voucher for ID Member " + dfno + ", success.";
      if(dataVoucher[0][0].claimStatus == "1"){
        let claimeddtY = dateFormat(dataVoucher[0][0].claimeddt,'yyyy-mm-dd HH:MM:ss');
        msg = dataVoucher[0][0].voucherno + " was claimed on " + claimeddtY;
      }

      console.log("dataVoucher[0].length = " + dataVoucher[0].length);

      let dataRes = [];
      for (let i = 0; i < dataVoucher[0].length; i++) {
        let dataVoucherDet = dataVoucher[0][i];

        let vouchernoX = dataVoucher[0][i].voucherno;
        console.log("vouchernoX = " + vouchernoX);
        let specificPrdOnlyX = dataVoucher[0][i].specificPrdOnly;
        console.log(specificPrdOnlyX);
        let specificPrdcdX = dataVoucher[0][i].specificPrdcd;
        console.log("specificPrdcdX Ori = " + specificPrdcdX);

        specificPrdcdX.replace(" ", "");

        let conditionAnd = specificPrdcdX.indexOf("*");
        let conditionOr = specificPrdcdX.indexOf("#");

        // console.log("conditionAnd 00 " + conditionAnd);
        // console.log("conditionOr 01 " + conditionOr);

        if(conditionOr >= 0){
          console.log("masuk cek conditionOr");
          specificPrdcdX = specificPrdcdX.split('#');
        }else if(conditionAnd >= 0){
          console.log("masuk cek conditionAnd");
          specificPrdcdX = specificPrdcdX.split('*');
        }

        // if(conditionOr >= 0 || conditionAnd >= 0){
        //   for (let j = 0; j < specificPrdcdX.length; i++) {
        //       specificPrdcdX.push({specificPrdcdX});
        //   }
        // }
        
        // console.log("specificPrdcdX Final : " + specificPrdcdX);

        dataRes.push({id: dataVoucherDet.id,
                      voucherno: dataVoucherDet.voucherno,
                      dfno: dataVoucherDet.dfno,
                      fullnm: dataVoucherDet.fullnm,
                      voucherAmt: dataVoucherDet.voucherAmt,
                      voucherkey: dataVoucherDet.voucherkey,
                      is_freeproduct: dataVoucherDet.is_freeproduct,
                      status: dataVoucherDet.status,
                      claimStatus: dataVoucherDet.claimStatus,
                      createddt: dateFormat(dataVoucherDet.createddt,'yyyy-mm-dd HH:MM:ss'),
                      activateddt: dateFormat(dataVoucherDet.activateddt,'yyyy-mm-dd HH:MM:ss'),
                      ip_activated: dataVoucherDet.ip_activated,
                      browsertype_actived: dataVoucherDet.browsertype_actived,
                      claimeddt: dataVoucherDet.claimeddt,
                      ip_claimed: dataVoucherDet.ip_claimed,
                      browsertype_claimed: dataVoucherDet.browsertype_claimed,
                      createdby: dataVoucherDet.createdby,
                      vouchertype: dataVoucherDet.vouchertype,
                      appname: dataVoucherDet.appname,
                      getorderno: dataVoucherDet.getorderno,
                      claimedorderno: dataVoucherDet.claimedorderno,
                      expireddt: dateFormat(dataVoucherDet.expireddt,'yyyy-mm-dd HH:MM:ss'),
                      bvAllowed: dataVoucherDet.bvAllowed,
                      vchtype: dataVoucherDet.vchtype,
                      specificPrdOnly: dataVoucherDet.specificPrdOnly,
                      specificPrdcd: specificPrdcdX, //dataVoucher[0].specificPrdcd,
                      allowedCombinedVoucher: dataVoucherDet.allowedCombinedVoucher
                    });
      }

      return logSuccess(req, res, 200, dataRes, msg) 

    }catch(err){
      return internalError(req, res, err);
    }

  };

  const VoucherGiftCreator = async (req, res) => {
    const {orderno, dfno, fullnm, voucherAmt, voucherCount, is_freeproduct, createdby, vouchertype, appname, expireddt, prefix, is_umroh, trxtype, totBV, bvAllowed} = req.body;
    let voucherAmtX = voucherAmt,
        expireddtX = expireddt,
        voucherCountX = 1,
        vchtype = 'P',
        bvAllowedX,
        vchCreate = [];

    var currentDate = new Date();

    if(bvAllowed == "" || bvAllowed == null || bvAllowed == "0" || bvAllowed == 0){
      bvAllowedX = "0";
      vchtype = 'P'
    }else if(bvAllowed == "1" || bvAllowed == 1){
      bvAllowedX = "1";
      vchtype = 'C'
    }else{
      bvAllowedX = "1";
      vchtype = 'N'
    }

    if(voucherCount){
      voucherCountX = voucherCount;
      // console.log("voucherCount if = " + voucherCount)
    }
    // console.log("voucherCountX = " + voucherCount)
    
      try {

        console.log("masuk try 01");

        let todayCheck = dateFormat(Date.now(),'yyyy-mm-dd');
        console.log("todayCheck = " +todayCheck);

        // if((todayCheck == '2020-12-09' || todayCheck == '2020-12-10' || todayCheck == '2020-12-11') && totBV >= 75){//jika tanggal transaksi adalah tanggal 2020-12-12, maka promo 12 12 adalah mendapatkan voucher cash 15000, jika transaksi min 75 BV
        if((todayCheck == '2020-12-12') && totBV >= 75){//jika tanggal transaksi adalah tanggal 2020-12-12, maka promo 12 12 adalah mendapatkan voucher cash 15000, jika transaksi min 75 BV
          voucherAmtX = 15000;
          if(expireddt == "" || expireddt == null){ //jika tanggal expired kosong, maka isi
            expireddtX = '2020-12-31';
          }
        }else if((todayCheck == '2020-12-12' || todayCheck == '2020-12-11') && (dfno == 'IDSPAAB04899' || dfno == 'IDJHID000065') && totBV >= 75){//jika tanggal transaksi adalah tanggal 2020-12-12, maka promo 12 12 adalah mendapatkan voucher cash 15000, jika transaksi min 75 BV
          voucherAmtX = 15000;
          if(expireddt == "" || expireddt == null){ //jika tanggal expired kosong, maka isi
            expireddtX = '2020-12-31';
          }
        }else if(todayCheck >= '2021-01-12' && voucherCount && prefix == 'REG'){ //voucher untuk pendaftaran, jika daftar dengan SK 50rb di k-net, maka dapat 4 voucher @ 25000
          //mulai tanggal 13 Januari 2021
          voucherAmtX = 25000;
          voucherCountX = voucherCount;

          // expireddtX = dateFormat(currentDate.setMonth(currentDate.getMonth() + 3), 'yyyy-mm-dd');
          expireddtX = await MiscController().addMonths(currentDate, 3).toString()
          expireddtX = dateFormat(expireddtX, 'yyyy-mm-dd');
          console.log(expireddtX)
          // console.log(voucherAmtX)
        }else{
          return res.status(400).json({ status: 'failed', message: 'Rules are not fit with promo to get voucher(s).'}); //'BV under 75 or transaction date more than 2020-12-12' });
        }

        // // console.log("mulai createOrdernoF = " + add_prefix + ' -- ' + t_etdt + ' -- ' +  t_type + ' -- ' +  is_umroh + ' -- ' +  res_trans_no )
        // console.log("mulai createOrdernoF = " + prefix.trim() + ' -- ' + today + ' -- ' +  trxtype.trim() + ' -- ' +  is_umroh.trim() + ' -- ' +  null )
        // let vouchernoX = await MiscController().createOrdernoF(prefix.trim(), today, trxtype.trim(), is_umroh.trim(), null);
        // let resVoucherno = vouchernoX.res_val;
        // console.log("resVoucherno = " + resVoucherno);

        // console.log("persiapan  try 01");
        // let data = await Ecomm_voucherPromo.create({
        //     voucherno : resVoucherno,
        //     dfno : dfno, 
        //     fullnm : fullnm, 
        //     voucherAmt : voucherAmtX,
        //     voucherkey : resVoucherno, 
        //     is_freeproduct : is_freeproduct, 
        //     createdby : createdby, 
        //     vouchertype : vouchertype, 
        //     appname : appname, 
        //     getorderno : orderno, 
        //     expireddt : expireddtX,
        //     bvAllowed : bvAllowed
        // });

        for (let i = 0; i < voucherCountX; i++) {
            console.log("mulai createOrdernoF = " + prefix.trim() + ' -- ' + today + ' -- ' +  trxtype.trim() + ' -- ' +  is_umroh.trim() + ' -- ' +  null )
            let vouchernoX = await MiscController().createOrdernoF(prefix.trim(), today, trxtype.trim(), is_umroh.trim(), null);
            let resVoucherno = vouchernoX.res_val;
            var resVouchernoX;

            if(i > 0){
              resVouchernoX = resVouchernoX + ', ' + resVoucherno;
            }else{
              resVouchernoX = resVoucherno;
            }

            // console.log("resVoucherno = " + resVoucherno);
            let ordernoXX;
            if(voucherCountX > 1){
              let ordernoAdd = '00' + i;
              ordernoXX = orderno + '-' + ordernoAdd.slice(-3);
            }else{
              ordernoXX = orderno;
            }
            vchCreate.push({
                              voucherno : resVoucherno,
                              dfno : dfno, 
                              fullnm : fullnm, 
                              voucherAmt : voucherAmtX,
                              voucherkey : resVoucherno, 
                              is_freeproduct : is_freeproduct, 
                              createdby : createdby, 
                              vouchertype : vouchertype, 
                              appname : appname, 
                              getorderno : ordernoXX, 
                              expireddt : expireddtX,
                              bvAllowed : bvAllowedX,
                              vchtype : vchtype
                          });

            // console.log(vchCreate);

            console.log('masuk 00');
            console.log('voucherCountX == '+voucherCountX+', i == '+i);

            if(i <= voucherCountX - 1){
              let transaction = await sequelize_ecomm.transaction(); 
              console.log('masuk 01');

              let data  = await Ecomm_voucherPromo.bulkCreate(
                  vchCreate, { validate: true }, { transaction },
              );

              console.log('masuk 02');

              await transaction.commit();
              // logSuccess(req, res, 200, data);
              return res.status(200).json( {status: 'success', message: 'Success create voucher with no = ' + resVouchernoX, data});  
            }else{
              return res.status(200).json( {status: 'success', message: 'Success create voucher with no = ' + resVouchernoX, vchCreate});  
            }
          }
        // return res.status(200).json( {status: 'success', message: 'Success create voucher with no = ' + resVoucherno, data});  
      } catch (err) {

        if(err.name == 'SequelizeUniqueConstraintError')
        {
            return res.status(409).json({ status: 'failed', message: 'UserID is already registered' });
        }

        if(err.name == 'SequelizeValidationError')
        {         
              return res.status(409).json({  status: 'failed', message: 'Unique Validition Error: ' + err.errors[0]['message']  });
           
        }
        else{
          console.log(err);
            return res.status(500).json({ status: 'failed', message: 'Internal server error' });
        }  
          
      }


      // let sql = "INSERT INTO ecomm_voucherPromo(voucherno, dfno, fullnm, voucherAmt, voucherkey, is_freeproduct, " +
      //           " a.createdby, a.vouchertype, a.appname, a.getorderno, a.expireddt) " +
      //           " VALUES('" + resVoucherno + "', '" + dfno + "', '" + fullnm + "', '" + voucherAmt + "', '" + resVoucherno + "', '" + is_freeproduct + "', " +
      //           " '" +  createdby + "', '" +  vouchertype + "', '" +  appname + "', '" +  getorderno + "', '" +  expireddt + "') ";

      // let dataVoucher = await sequelize.query(sql, function(errInsert) {
      //                             if(errInsert){
      //                                 return internalError(req, res, errInsert);
      //                             } else{
      //                                console.log('succes');
      //                                return logSuccess(req, res, 200, dataVoucher[0], 'Available Voucher for ID Member ' + dfno + ', success.') 
      //                             } 
      //                           });

    // }catch(err){
    //   return internalError(req, res, err);
    // }

  };

  const VoucherGiftUpadeStatus = async (req, res) => {
    const {dfno, voucherno, voucherkey, expireddt, voucherAmt, ip_claimed, browsertype_claimed, appname, orderno} = req.body;

    try{

      let sql = "SELECT TOP 1 * FROM ecomm_voucherPromo " +
                " WHERE voucherno = '" + voucherno + "' AND voucherkey = '" + voucherkey + "' AND dfno = '" + dfno + "' " + 
                " AND status = '0' AND claimstatus = '0' AND expireddt >= '" + today + "' " +
                " AND voucherAmt >= " + voucherAmt + " ";

      let dataVoucher = await sequelize.query(sql);
      // console.log(dataVoucher[0]); 
      console.log("dataVoucher[0].length = " + dataVoucher[0].length);
          if (!dataVoucher || dataVoucher[0].length == 0) {
           return logError(req, res, 400, 'Voucher Not Founded.');
          }else{
              //Start Update

            let transaction = await sequelize.transaction();            
            let sqlUpdate = "UPDATE db_ecommerce.dbo.ecomm_voucherPromo " +
                            " SET status = '2', claimStatus = '1', claimeddt = '" + today + "', appname = '" + appname + "', claimedorderno = '" + orderno + "' " +
                            " WHERE voucherno = '" + voucherno + "' AND voucherkey = '" + voucherkey + "' AND dfno = '" + dfno + "' " + 
                            " AND status = '0' AND claimstatus = '0' AND expireddt >= '" + today + "' " +
                            " AND voucherAmt >= " + voucherAmt + " ";
            console.log(sqlUpdate);
            let dataVoucherUpd = await sequelize.query(sqlUpdate);
            if (dataVoucherUpd[0] == null ) {
                  return logError(req, res, 400, "Voucher not founded.");
              }else{
                await transaction.commit(); 
                // return logSuccess(req, res, 200, dataCheckStatusX, 'success' )
                return res.status(200).json({ status:'success', msg: 'Voucher No = ' + voucherno + ' updated successfully. For orderno = ' + orderno + ', with ID member = ' + dfno});

              }

            //End Update
        }

    }catch(err){
      return internalError(req, res, err);
    }

  };
  

  return {
    compareCartWithVocherRule,
    VoucherGiftCheck,
    VoucherGiftCreator,
    VoucherGiftUpadeStatus
  };
};

module.exports = VoucherGiftController;
