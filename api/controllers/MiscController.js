const BonusPeriod = require('../models/BonusPeriod');
const axios = require('axios');
const qs = require('qs');
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');
const sequelizeMlm2010 = require("../../config/db/klink_mlm2010.js");
const dateFormat = require('dateformat');
const today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss');
const {internalError, logSuccess, logError, logAkademiSuccess, logAkademiError} = require('../services/logger');
const redis = require('redis');
const client = redis.createClient();
const sortArray = require('array-sort');

const MiscController = () => {

"use strict";

  //Get List Voucher based on login ID
  const getBonusPeriod = async (req, res) => {
    console.log('test');
      
      try {

        //Get member data transaction
        let bonusPeriod = await BonusPeriod
          .findOne({
            raw: true,
          });

        let dateFormat = require('dateformat'), bnsperiod_now;
        let bonusPeriodRet = [], periodbonus = [];
          // let bonusPeriodRet = {};
        if(bonusPeriod != null && bonusPeriod != "" && bonusPeriod != '') {
         
          if(bonusPeriod.date_only_now > bonusPeriod.endofdatebnsperiod){
            periodbonus.push([bonusPeriod.bnsperiod_now]);
          }else{
            if(bonusPeriod.bnsperiod_now == bonusPeriod.bnsperiod_prev){
              periodbonus.push([dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),]);
            }else{
              periodbonus.push([
                dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),
                dateFormat(bonusPeriod.bnsperiod_prev, "yyyy-mm-dd"),]);
            }
          }

          bonusPeriodRet.push({
              id : bonusPeriod.id,
              bnsperiod : dateFormat(bonusPeriod.bonusPeriod, "yyyy-mm-dd"),
              bnsperiod2 : dateFormat(bonusPeriod.bnsperiod2, "yyyy-mm-dd"),
              range : bonusPeriod.range,
              endofdatebnsperiod : bonusPeriod.endofdatebnsperiod,
              date_now : dateFormat(bonusPeriod.date_now, "yyyy-mm-dd"),
              date_only_now : bonusPeriod.date_only_now,
              bnsperiod_now_cod2 : dateFormat(bonusPeriod.bnsperiod_now_cod2, "yyyy-mm-dd"),
              bnsperiod_now_cod : dateFormat(bonusPeriod.bnsperiod_now_cod, "yyyy-mm-dd"),
              bnsperiod_now : dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),
              bnsperiod_prev : dateFormat(bonusPeriod.bnsperiod_prev, "yyyy-mm-dd"),
              period_bonus : sortArray(periodbonus[0]),
              err: '200',
          });
          bonusPeriod["err"] = "200"
          // return res.status(200).json(bonusPeriod);          
          return res.status(200).json(bonusPeriodRet);
        }else{
          return res.status(409).json({err: '409', status : 'failed', message : 'Period not valid.'});
        }

      } catch (err) {
        // console.log(err)
          let dateFormat = require('dateformat');
          let todayx = dateFormat( Date(today), "yyyy-mm-dd");
          return res.status(500).json( { err: '500', status:'failed', message: todayx + ' Internal server error' });
      }
 
  };

  //Get List Voucher based on login ID
  const getBonusPeriodNew = async (req, res) => {
    // console.log('test');
      
      try {

        //Get member data transaction
        let bonusPeriod = await BonusPeriod
          .findOne({
            raw: true,
          });

        // console.log("bonusPeriod getBonusPeriodNew :== "+ bonusPeriod);

        let dateFormat = require('dateformat'), bnsperiod_now;
        let bonusPeriodRet = [], periodbonus = [];

        if(bonusPeriod != null && bonusPeriod != "" && bonusPeriod != '') {

          if(bonusPeriod.date_only_now > bonusPeriod.endofdatebnsperiod){
            periodbonus.push([bonusPeriod.bnsperiod_now]);
          }else{
            // periodbonus.push([
            //   dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),
            //   dateFormat(bonusPeriod.bnsperiod_prev, "yyyy-mm-dd"),]);
            if(bonusPeriod.bnsperiod_now == bonusPeriod.bnsperiod_prev){
              periodbonus.push([dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),]);
            }else{
              periodbonus.push([
                dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),
                dateFormat(bonusPeriod.bnsperiod_prev, "yyyy-mm-dd"),]);
            }
          }

          bonusPeriodRet.push({
              id : bonusPeriod.id,
              bnsperiod : dateFormat(bonusPeriod.bonusPeriod, "yyyy-mm-dd"),
              bnsperiod2 : dateFormat(bonusPeriod.bnsperiod2, "yyyy-mm-dd"),
              range : bonusPeriod.range,
              endofdatebnsperiod : bonusPeriod.endofdatebnsperiod,
              date_now : dateFormat(bonusPeriod.date_now, "yyyy-mm-dd"),
              date_only_now : bonusPeriod.date_only_now,
              bnsperiod_now_cod2 : dateFormat(bonusPeriod.bnsperiod_now_cod2, "yyyy-mm-dd"),
              bnsperiod_now_cod : dateFormat(bonusPeriod.bnsperiod_now_cod, "yyyy-mm-dd"),
              bnsperiod_now : dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),
              bnsperiod_prev : dateFormat(bonusPeriod.bnsperiod_prev, "yyyy-mm-dd"),
              period_bonus : sortArray(periodbonus[0]),
              err: '200',
          });
          bonusPeriod["err"] = "200";
          // return res.status(200).json(bonusPeriod);
          let bonusPeriodRes = Object.assign({}, bonusPeriodRet);
          return logSuccess(req, res, 200, bonusPeriodRes[0]);
        }else{
            // return res.status(409).json({err: '409', status : 'failed', message : 'Period not valid.'});
            return logError(req, res, 409, 'Period not valid.');
        }

      } catch (err) {
        // console.log(err)
          let dateFormat = require('dateformat');
          let todayx = dateFormat( Date(today), "yyyy-mm-dd");
          return res.status(500).json( { err: '500', status:'failed', message: todayx + ' Internal server error' });
      }
 
  };


  //Get List Voucher based on login ID
  const getBonusPeriodCheck = async () => {
    console.log('getBonusPeriodCheck');

      let dateFormat = require('dateformat'), bnsperiod_now;
      let bonusPeriodRet = [], periodbonus = [];
      
      try {
        //Get member data transaction
        let bonusPeriod = await BonusPeriod
          .findOne({
            raw: true,
          });

        console.log("bonusPeriod getBonusPeriodCheck :== "+ bonusPeriod);

        if(bonusPeriod != null && bonusPeriod != "" && bonusPeriod != '') {

          if(bonusPeriod.date_only_now > bonusPeriod.endofdatebnsperiod){
            periodbonus.push([bonusPeriod.bnsperiod_now]);
          }else{
            periodbonus.push([
              dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),
              dateFormat(bonusPeriod.bnsperiod_prev, "yyyy-mm-dd"),]);
          }

          bonusPeriodRet.push({
              id : bonusPeriod.id,
              bnsperiod : dateFormat(bonusPeriod.bonusPeriod, "yyyy-mm-dd"),
              bnsperiod2 : dateFormat(bonusPeriod.bnsperiod2, "yyyy-mm-dd"),
              range : bonusPeriod.range,
              endofdatebnsperiod : bonusPeriod.endofdatebnsperiod,
              date_now : dateFormat(bonusPeriod.date_now, "yyyy-mm-dd"),
              date_only_now : bonusPeriod.date_only_now,
              bnsperiod_now_cod2 : dateFormat(bonusPeriod.bnsperiod_now_cod2, "yyyy-mm-dd"),
              bnsperiod_now_cod : dateFormat(bonusPeriod.bnsperiod_now_cod, "yyyy-mm-dd"),
              bnsperiod_now : dateFormat(bonusPeriod.bnsperiod_now, "yyyy-mm-dd"),
              bnsperiod_prev : dateFormat(bonusPeriod.bnsperiod_prev, "yyyy-mm-dd"),
              period_bonus : sortArray(periodbonus[0]),
              err: '200',
          });
          bonusPeriod["err"] = "200";
          // return res.status(200).json(bonusPeriod);
          let bonusPeriodRes = Object.assign({}, bonusPeriodRet);
          return bonusPeriodRes[0];
        }else{
          // return res.status(409).json({err: '409', status : 'failed', message : 'Period not valid.'});
          let todayx = dateFormat( Date(today), "yyyy-mm-dd");
          
          bonusPeriodRet.push({
              id : 1,
              bnsperiod : todayx,
              bnsperiod2 : todayx,
              date_now : todayx,
              date_only_now : todayx,
              bnsperiod_now_cod2 : todayx,
              bnsperiod_now_cod : todayx,
              bnsperiod_now : todayx,
              bnsperiod_prev : todayx,
              period_bonus : todayx,
              err: '200',
          });
          // return res.status(200).json(bonusPeriod);
          let bonusPeriodRes = Object.assign({}, bonusPeriodRet);
          return bonusPeriodRes[0];
        }

      } catch (err) {
        // console.log(err)
          let dateFormat = require('dateformat');
          let todayx = dateFormat( Date(today), "yyyy-mm-dd");
          return res.status(500).json( { err: '500', status:'failed', message: todayx + ' Internal server error' });
      }
 
  };



  //GENERATE ORDER NUMBER for transaction
const createOrdernoSEQ= async (req, res) => { 
        // @prex_rpt   VARCHAR(10), 
        // @p_etdt   VARCHAR(50),   -- format 'yyyy-mm-dd'
        // @is_umroh   VARCHAR(2),  
        // @sc_type  VARCHAR(2), 
        // @res_val  VARCHAR(50) OUTPUT 

  const { prex_rpt, p_etdt, is_umroh, sc_type, res_val } = req.body;
  // console.log(add_prefix)

   try {

       let data = await sequelize.query('SP_HILAL_GET_RUNNO :prex_rpt, :p_etdt, :is_umroh, :sc_type, :res_val ', 
         { 
           replacements: 
           { 
               prex_rpt: prex_rpt, 
               p_etdt: p_etdt, 
               is_umroh: is_umroh, 
               sc_type: sc_type, 
               res_val: res_val
           }
         });
       
       let data1 = Object.assign({}, data[0]);  
        // logger.info(data1[0], req.body);
 
        if (!data) {
         return logError(req, res, 400, 'Invalid username or password');
        }
        return res.status(200).json(data1[0] );     
      } catch (err) {
        
        return internalError(req, res,err )
      }

}

  //GENERATE ORDER NUMBER for transaction
const createOrderno= async (req, res) => { //(add_prefix, t_etdt, t_type, is_umroh) {
    // @add_prefix   VARCHAR(20),
    // @t_etdt     VARCHAR(50), -- format 'yyyy-mm-dd'
    // @t_type     VARCHAR(10), -- 01r = reg, 02r = reg with cash voucher, 03r = reg with cash voucher,
    //                -- 01s = sales, 02s = sales with cash voucher, 03s = sales with cash voucher
    // @is_umroh     VARCHAR(2), -- 0= REGULAR reg/sales, 1= Umroh

  const { add_prefix, t_etdt, t_type, is_umroh, res_trans_no } = req.body;
  // console.log(add_prefix)

   try {

       let data = await sequelize.query('SP_HILAL_GET_TRANS_NO :add_prefix, :t_etdt, :t_type, :is_umroh, :res_trans_no', 
         { 
           replacements: 
           { 
               add_prefix: add_prefix, 
               t_etdt: t_etdt, 
               t_type: t_type, 
               is_umroh: is_umroh, 
               res_trans_no: res_trans_no
           }
         });
       
       let data1 = Object.assign({}, data[0]);  
        // logger.info(data1[0], req.body);
 
        if (!data) {
         return logError(req, res, 400, 'Invalid username or password');
        }
        return res.status(200).json(data1[0] );     
      } catch (err) {
        
        return internalError(req, res,err )
      }

}

  //GENERATE ORDER NUMBER for transaction
 async function createOrdernoF(add_prefix, t_etdt, t_type, is_umroh, res_trans_no) { //(add_prefix, t_etdt, t_type, is_umroh) {
    // @add_prefix   VARCHAR(20),
    // @t_etdt     VARCHAR(50), -- format 'yyyy-mm-dd'
    // @t_type     VARCHAR(10), -- 01r = reg, 02r = reg with cash voucher, 03r = reg with cash voucher,
    //                -- 01s = sales, 02s = sales with cash voucher, 03s = sales with cash voucher
    // @is_umroh     VARCHAR(2), -- 0= REGULAR reg/sales, 1= Umroh

   try {
      console.log("masuk createOrdernoF");
        console.log("masuk createOrdernoF = " + add_prefix + ' -- ' + t_etdt + ' -- ' +  t_type + ' -- ' +  is_umroh + ' -- ' +  res_trans_no )
       let data = await sequelize.query('SP_HILAL_GET_TRANS_NO :add_prefix, :t_etdt, :t_type, :is_umroh, :res_trans_no', 
         { 
           replacements: 
           { 
               add_prefix: add_prefix, 
               t_etdt: t_etdt, 
               t_type: t_type, 
               is_umroh: is_umroh, 
               res_trans_no: res_trans_no
           }
         });
       
       let data1 = Object.assign({}, data[0]);  
       // console.log('data = ' + data)
 
        if (!data) {
         return logError(req, res, 400, 'Invalid parameter');
        }
        // console.log(data1[0])
        return data1[0];    

      } catch (err) {
        
        return internalError(req, res,err )
      }

}

//Get Shipper code
  const getShipperCode = async (shippername) => {
    // console.log('test');
      
      try {

            let sql = "SELECT * " +
                      " FROM master_logistic_shipper a " + 
                      " WHERE a.shortnm = '" + shippername + "'";
            
            let datashipper = await sequelize.query(sql);
            // console.log(datashipper)
            
            if (!datashipper) {
              return null;
            }else{
              return datashipper[0]
            }
      } catch (err) {
      // return internalError(req, res,err )
          let msg = err
          logReturn(req, res, 409, msg, 'failed')
      }
 
  };
  
//Get Bank code
  const getBankCode = async (bankcode, bankdesc) => {
    // console.log('test');
      let res
      try {

            let sql; 
 
            if(bankdesc == 'COD' || bankcode == 'COD' || bankdesc == 'VP' || bankcode == 'VP' || bankdesc == 'VC' || bankcode == 'VC'){

              sql = "SELECT TOP 1 * " +
                      " FROM ecomm_bank a " + 
                       " WHERE a.bankCode = '" + bankcode + "' or a.bankCode = '" + bankdesc + "' ORDER BY a.id DESC";
            }else{
                sql = "SELECT TOP 1 * " +
                        " FROM ecomm_bank a " + 
                        // " WHERE a.bankDescAlias = '" + bankdesc + "' AND a.status = '1'";
                        //" WHERE a.bankCode = '" + bankcode + "' AND a.bankDescAlias = '" + bankdesc + "' AND a.status = '1'";
                        " WHERE (a.bankDescAlias = '" + bankdesc + "' AND a.status = '1') OR " +
                        " (a.bankDesc = '" + bankdesc + "' AND a.status = '1') OR " +
                        " (a.bankCode = '" + bankcode + "' AND a.status = '1') OR " +
                        " (a.bankCode = '" + bankdesc + "' AND a.status = '1')";
            }
            
            let databank = await sequelize.query(sql);
            
            // console.log(databank)

            if (!databank) {
                return null;
                // return res.status(401).json({ msg: "Not authorized user." });
            }else{

              if(databank[0] == ""){
                if(bankdesc == "VC"){
                  console.log('tes = '+ bankdesc)
                  let ret = [];
                  ret.push({'id':23, 'bank_id':'VC', 'bank_code':'VC'});
                  return ret;
                }else{
                  return null;
                  // return res.status(401).json({ msg: "Not authorized user." });
                }
              }else{
                return databank[0]
              }

              // return databank[0]
            }
      } catch (err) {
          return err 
      }
 
  };

  //Get Bank code
  const getBankCodeMars = async (bankcode, bankdesc, appname) => {
    // console.log('test');
      let res, sql;
      try {

            sql = "SELECT TOP 1 * " +
                      " FROM ecomm_bank a " + 
                      // " WHERE a.bankDescAlias = '" + bankdesc + "' AND a.status = '1'";
                      //" WHERE a.bankCode = '" + bankcode + "' AND a.bankDescAlias = '" + bankdesc + "' AND a.status = '1'";
                      " WHERE (a.bankDescAlias = '" + bankdesc + "' AND a.status = '1') OR " +
                      " (a.bankDesc = '" + bankdesc + "' AND a.status = '1') OR " +
                      " (a.bankCode = '" + bankcode + "' AND a.status = '1')";

            if(appname && !appname.includes('digitalbrain.co.id')){
              sql = "SELECT TOP 1 * " +
                        " FROM ecomm_bank a " + 
                        // " WHERE a.bankDescAlias = '" + bankdesc + "' AND a.status = '1'";
                        " WHERE a.bankCode = '" + bankcode + "' AND a.bankDesc = '" + bankdesc + "' AND a.status = '1'";
            }
            
            let databank = await sequelize.query(sql);
            
            // console.log(databank)

            if (!databank) {
              return null;
            }else{
              return databank[0]
            }
      } catch (err) {
          return err 
      }
 
  };

  //get banner list
  const getBannerKnet = async (req, res) => {
      
      try {
          let sql = "SELECT id, hdr_desc, goup_hdr, img_url, hdr_status " +
                    "FROM ecomm_master_header_pic " +
                    "WHERE hdr_status='1' ORDER BY id DESC ";

          let databanner = await sequelize.query(sql)

          // console.log(databanner);

          if (databanner[0] == null || databanner[0] == '') {
            return logError(req, res, 402, 'No Banners appears.');
          } else if (databanner[0].length > 0) {
            client.set('banner',JSON.stringify(databanner[0]));
            // client.set(sfno, JSON.stringify(personalGBV));
            // client.get(sfno,function(err,reply) {
            //      console.log(err);
            //      console.log(reply);
            //     });
            return logSuccess(req, res, 200, databanner[0])  
          }

      }catch(err){
        console.log(err) 
        return internalError(req, res,err )
      }
  }

//Check apakah harganya distributor atau harga konsumen
const checkPriceStatus = async (req, res) => {

  const{id_lp, cp, dp} = req;

  let priceNonCharge = 0;
  
  if(id_lp == "CUST"){ //harga KONSUMEN
      priceNonCharge = cp;
  }else if(id_lp != "CUST"){ //BUKAN harga KONSUMEN
      priceNonCharge = dp;
  }

  return {priceNonCharge: parseInt(priceNonCharge), id_lp: id_lp};
}

function addMonths(date, months) {
    var d = date.getDate()
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
}

function compareCartWithVocherRule(refArr, actualArr, rules){
    // console.log("arr1 : " + arr1);
    // console.log("arr2 : " + arr2);

    

  //compare 2 array, area value in Array2 include in Array1 (value i Array1 MUST HAVE in Array2)
  //sample arr1 = [1,2,3,4] 
  // arr2 = [1,2,3,4,44,55]
  // all value in Array1 include in Array2, if (even one of) value in Array1 not included in Array2 then false
  //console.log(isTrue([1,2,3,4], [1,2,3,4,44,55])); //true
  // console.log(isTrue([1,2,3,4], [1,2,3,4])); //true
  // console.log(isTrue([0, 1], [1,2])); //false

    // specificPrdcd
    // all = boleh untuk semua product,
    // jika ada isinya seperti contoh, maka lihat di specificPrdOnly nya ya

    // allowedCombinedVoucher
    // 0=Tidak bisa digabung dengan product lain, hanya yg ada di…
    console.log("refArr : " + refArr);
    console.log("actualArr : " + actualArr);

    let resultX;
    resultX = false;
    refArr.sort();
    actualArr.sort();
    if(rules == "0" || rules == 0){ // 0=Bisa digunakan semua product tanpa ada pengecualian,
        resultX = true;
    }else if(rules == "1" || rules == 1){ // 1=harus mengandung semua yang ada di specificPrdcd dan dapat digabung dengan product lain di dalam cart,
        resultX = refArr.every(i => actualArr.includes(i));
    }else if(rules == "2" || rules == 2){ // 2=bisa mengandung salah satu dari field specificPrdcd dan dapat digabung dengan product lain cart,
        resultX = false;
        let xval = 0;
        for (let i = 0; i < actualArr.length; i++) {
            if(refArr.indexOf(actualArr[i]) >= 0){
               xval++;
            }
        }

        if(xval > 0){
          resultX = true;
        }
    }else if(rules == "3" || rules == 3){ // 3=hanya berlaku specificPrdcd di dalam cart,tidak bisa mix dengan produck lain
        if (JSON.stringify(refArr) == JSON.stringify(actualArr)) {
            resultX = true;
        } else {
            resultX = false;
        }
    }

    console.log(resultX);
    return resultX;
}

const getListMeasurement = async (req, res) => {
  try {
    let sql = "SELECT id, measure_code, measure_desc, created_date, updated_date, measure_qty " +
              " FROM master_measurement a " + 
              " ORDER BY id";
    let dataMeasurement = await sequelize.query(sql);
    // console.log(dataMeasurement)
    
    if (!dataMeasurement) {
      // return null;
      return logError(req, res, 400, 'Record not founded.'); 
    }else{
      logSuccess(req, res, 200, { measurement: dataMeasurement[0] });      
      return dataMeasurement[0]
    }
  } catch (err) {
  // return internalError(req, res,err )
    let msg = err
    logReturn(req, res, 409, msg, 'failed')
  }
}


  //Update stockist
const updateStockistWh= async (req, res) => { 

  const { new_sc, new_sc_nm, new_wh, new_wh_nm, token } = req.body;

   try {
        
        let sql = " SELECT a.confirm_dc, a.idstk, a.whcd, b.orderno, a.orderno, b.orderno, CASE WHEN b.orderno IS NULL THEN 0 ELSE  1 END as is_success, b.REGISTERno, b.CNno, b.KWno, b.IPno " +
                  " FROM  db_ecommerce.dbo.ecomm_trans_hdr_sgo a " +
                          " LEFT OUTER JOIN db_ecommerce.dbo.ecomm_trans_hdr b on a.orderno = b.token " +
                  " WHERE a.token = '" + token + "'";
            
            let dataTrans = await sequelize.query(sql);
            console.log("confirm_dc := " + dataTrans[0])
            
            let msg = [], statusx = "400";
            msg.push({token: token, 
                       new_sc: new_sc, 
                       new_sc_nm: new_sc_nm, 
                       new_wh: new_wh, 
                       new_wh_nm: new_wh_nm
                       // status: statusx
                   });
            
            // console.log(msg)
            if (!dataTrans[0][0]) {
              msg[0]["bid_whcd"] = null;
              msg[0]["bid_sc"] = null;
              msg[0]["status"] = statusx;
              msg[0]["message"] = "Invoice = " + token + " not founded.";
              return res.status(400).json(msg[0]);
            }else{
              console.log(dataTrans[0][0].confirm_dc)
              if(dataTrans[0][0].confirm_dc == 1){
                msg[0]["bid_whcd"] = dataTrans[0][0].whcd;
                msg[0]["bid_sc"] = dataTrans[0][0].idstk;
                msg[0]["status"] = "401";
                msg[0]["message"] = "Orderno = " + token + " taken by "+ dataTrans[0][0].idstk +".";
                return res.status(401).json(msg[0]);
              }else{
                let data = await sequelizeMlm2010.query('SP_HILAL_UPDATE_DC_WH :new_sc, :new_sc_nm, :new_wh, :new_wh_nm, :token, :res_val', 
                                                       { 
                                                         replacements: 
                                                         { 
                                                             new_sc: new_sc, 
                                                             new_sc_nm: new_sc_nm, 
                                                             new_wh: new_wh, 
                                                             new_wh_nm: new_wh_nm, 
                                                             token: token,
                                                             res_val: null
                                                         }
                                                       });
             
               let data1 = Object.assign({}, data[0]);         
                // console.log(data[0][0])
                let result = 'update failed';
                msg[0]["bid_whcd"] = new_wh;
                msg[0]["bid_sc"] = new_sc;
                if(data[0][0].res_val == 1){
                  msg[0]["bid_whcd"] = new_wh;
                  msg[0]["bid_sc"] = new_sc;
                  result = 'update success';
                  statusx = "200";
                }

                msg[0]["status"] = statusx;
                msg[0]["message"] = "Invoice = " + token + " is founded and "+result+".";
                
                // let resHit = await updateBidMars({orderno:token, whcode:new_wh, locationCode: new_sc}, req, res);
                // console.log("resHit := "+resHit)

                return res.status(200).json(msg[0]);
                }
             
            }

      } catch (err) {
        
        return internalError(req, res,err )
      }

}

//START kirim notif ke api mars jika pengiriman product ke stockist
//  function sendNotifToAppsPickupStockist = async (req, res) => {
async function updateBidMars(data, req, res) {
      let resx = '';
      let resx2 ;
      // let urls = 'https://api.marsxklink.com/v1/orders/webhook/accept-order';
      let urls = 'https://kld-api-stg.k-mart.co.id/v1/orders/webhook/accept-order';
      let params;

      console.log("data :== " + JSON.stringify(data));

      if (data) {
        resx2 = {
                  orderNumber: data.orderno,
                  whcode: data.whcode,
                  locationCode: data.locationCode
                  };           
        // params = resx2;
        console.log('resx2 := '+ resx2.orderNumber)
          
        try {
            // let response = await axios.post(urls, params, {headers: { 'X-Inter-Service-Call': '12qwaszx@321123'}});
            let config = {
                              method: 'post',
                              url: urls,
                              headers: { 
                                        'X-Inter-Service-Call': '12qwaszx@321123', 
                                        'Content-Type': 'application/json'
                                       },
                              // data : qs.stringify(params),
                              data : resx2
                         };
            let response = await axios(config);
            console.log('config = ' + JSON.stringify(config));
            console.log('response  = ' + JSON.stringify(response));
            return response;
            // console.log('req = ' + JSON.stringify(req));
            // console.log('res = ' + JSON.stringify(res));
            // if(response.status == 200) {                      
            //     return res.status(200).json( {status: 'success', message: 'Notification has been sent.' }); 
            // } else {   

            //     return res.status(500).json( {status: 'failed', message: 'internal error'}); 
            // }   
            
            // return res.status(200).json( {status: 'success', message: 'Notification has been sent.'}); 
          
        }catch (err) {
            console.log("err := " + err);
            // if (err.response.status == 404){
            //     return res.status(404).json( {status: 'failed', message: err.response.data}); 

            // } else {
                internalError(req, res,err )
            // }
           
        }  
      }
  }
  //END kirim notif ke api mars jika pengiriman product ke stockist

  const testHitMars = async(req, res) => {
    const{body} = req.body;
    console.log(body)
    let resHit = await updateBidMars({orderno:"DEV-210924-N2TPKDZ", whcode:"IDBSS02", locationCode:"IDBSS02"}, req, res);
    console.log("resHit := "+resHit)
  }

  return {
    getBonusPeriod,
    getBonusPeriodNew,
    getBonusPeriodCheck,
    createOrdernoSEQ,
    createOrderno,
    createOrdernoF,
    getShipperCode,
    getBankCode,
    getBankCodeMars,
    getBannerKnet,
    checkPriceStatus,
    addMonths,
    compareCartWithVocherRule,
    getListMeasurement,
    updateStockistWh,
    updateBidMars,
    testHitMars
  };
};

module.exports = MiscController;
