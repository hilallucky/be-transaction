const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');
const ConfirmCODWA = require('../models/ConfirmCODWA');
const dateFormat = require('dateformat');
// const today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss');
const {internalError, logSuccess, logError} = require('../services/logger');
const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');
const qs = require('qs');

const NotifController = require('../controllers/NotificationController');

const ShippingcController = () => {

"use strict";

  const CODUpdateConfirmStatus = async (req, res) => {
      // let { body } = req;
      const { orderno, status, reply, param, messageId, from, user_ip, idmember, updateby, appname } = req.body;
      
      let today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss');

      let statusx = "";
      let confirmStatus = "";
      let arrayData = [];
      let transaction; 
      let updatebyParam = "";

      if(status.toUpperCase() == "Y") {
          statusx = "1";
          confirmStatus = "1";
      }else if(status.toUpperCase() == "N") {
          statusx = "10";
          confirmStatus = "1";
      }else if(status == "" || status == null) {
          statusx = "1";
          confirmStatus = "0";
      }

      let statusCODapp = 'ACCEPT'; //jika status dari req.body = Y
      if(status == 'N'){
        statusCODapp = 'CANCEL'; //jika status dari req.body = N
      }else if(status == 'Y'){
        statusCODapp = 'ACCEPT'; //jika status dari req.body = Y
      }else if(status == null || status == null){
        statusCODapp = ''; //jika status dari req.body = Y
      }

      if(!orderno || !status || !reply || !param ||  !from || !idmember){ // || !appname){ // !== null){
        return logError(req, res, 401, "Params is not complete.");
      }

      if(idmember){ // !== null){
        let idmemberx = idmember;
        // console.log("idmember == " +idmember);
        idmemberx = idmember.toUpperCase();
      }else{
        return logError(req, res, 401, "Id member doesn't exist.");
      }


      let sqlCheckStatus =  "SELECT TOP 1 orderno, status, confirmstatus, confirmeddate " + 
                            " FROM db_ecommerce.dbo.ecomm_trans_hdr_sgo " +
                            " WHERE orderno = '" + orderno + "'";
      let dataCheckStatus = await sequelize.query(sqlCheckStatus);
      let dataCheckStatusX = dataCheckStatus[0];
      // console.log(dataCheckStatus[0]);

      if (dataCheckStatusX == null && dataCheckStatusX == null)  {
          return logError(req, res, 400, "Record not founded.");
      }else{
        // return logSuccess(req, res, 200, dataOrderX, 'success' );
        console.log("orderno :== "+dataCheckStatusX[0].orderno);

        if(dataCheckStatusX[0].status == "" || dataCheckStatusX[0].status == null || dataCheckStatusX[0].status == "0"){ //if COD order still pending, then update
          
          // transaction = await sequelize.transaction();  

          if (!req.body.updateby) {
              updatebyParam = "SELF CONFIRM";
          }else{
              updatebyParam = updateby;
          }

          let sqlUpdate = "UPDATE db_ecommerce.dbo.ecomm_trans_hdr_sgo " +
                          " SET status = '" + statusx + "', confirmstatus = '" + confirmStatus + "', confirmeddate = '" + today + "', confirmedby = '" + updatebyParam + "' " +
                          " WHERE orderno = '" + orderno + "'";
          let dataOrder = await sequelize.query(sqlUpdate);
          
          if (!dataOrder[0]){ //} == null) || (dataOrder[0] == '' && dataConfirmCOD == '')) {
              return logError(req, res, 400, "Record not founded.");
          }else{
            // let dataConfirmCOD = await ConfirmCODWA.create({    
            //                                               orderno   : orderno, 
            //                                               reply     : reply, 
            //                                               date      : today, 
            //                                               param     : param, 
            //                                               messageId : messageId, 
            //                                               from      : from,
            //                                             }, {transaction});
            // await transaction.commit(); 

          console.log('appname : ==' + appname);

          if(appname){ // !== undefined || appname !== null || appname !== ""){ //&& appname.includes("app.k-mart")) {
            if(appname.includes("app.k-mart")){
              // console.log('Param appname = ' + appname);
              // console.log('orderno = ' + orderno);

              let order = [];
              order.push({
                          order_id: orderno,
                          status: statusCODapp
                        });
              let resx = await NotifController().sendNotifCODCOnfirm(order[0]);
              console.log("Mars response "+ JSON.stringify(resx));
              
              let dataConfirmCOD = await ConfirmCODWA.create({    
                                                                  orderno   : orderno, 
                                                                  reply     : reply, 
                                                                  date      : today, 
                                                                  param     : param, 
                                                                  messageId : messageId, 
                                                                  from      : from,
                                                                });

              if (!dataConfirmCOD) {
                  return logError(req, res, 400, "Record not founded.");
              }else{
                // await transaction.commit(); 
                // return logSuccess(req, res, 200, dataCheckStatusX, 'success' )
                return res.status(200).json({ status:'success', message: 'success', data:{orderno: orderno,  statusCOD: statusCODapp, status: statusCODapp, confirmstatus: confirmStatus, confirmeddate: today} });

              }

            }
          }else{
            console.log('Param appname tidak ada');
            return res.status(200).json({ status:'success', message: 'success', data:{orderno: orderno,  statusCOD: statusCODapp, status: statusCODapp, confirmstatus: confirmStatus, confirmeddate: today} });
          }
          

            // return logSuccess(req, res, 200, dataCheckStatusX, 'success' )
            // return res.status(200).json({ status:'success', message: 'success', data:{orderno: dataCheckStatusX[0].orderno,  statusCOD: status, status: statusx, confirmstatus: confirmStatus, confirmeddate: today} });

          }
        }else{ // if order allready update status
           return res.status(409).json({ status:'updated', message: orderno + ' already updated before.', data:{orderno: dataCheckStatusX[0].orderno,  statusCOD: dataCheckStatusX[0].status, status: dataCheckStatusX[0].status, confirmstatus: dataCheckStatusX[0].confirmstatus, confirmeddate: dataCheckStatusX[0].confirmeddate} });
        }
      }
      
  };

  const checkPayShip = async (req, res) => {

  // http://dev.k-link.me/api/getfee/verify

  // {
      // token: 'klj',
      // whcd: 'WH12',
      // loccd: 'WH12',
      // id_member: 'IDJTBAA12691',
      // jenis_alamat: 'IDJTBAA12691fB65C',
      // ekspedisi: 'sap',
      // berat: 1,
      // harga_barang: '100000',
      // asuransi: 0,
      // package: {
      //               code: 'REG',
      //               service: 'UDRREG',
      //               fee: 97000,
      //               asuransi: 0,
      //               totalfee: 197000
      //             }
  // }
    console.log("Mulai checkPayShip 01 "); 

    let body = req;
    console.log("checkPayShip body = " + body);
    let params =  body;
    let url = 'http://dev.k-link.me/api/getfee/verify';

    // console.log(qs.stringify(params))
    // console.log("Mulai checkPayShip 02"); 
     
     try {
            console.log("Mulai checkPayShip try"); 
            let response = await axios.post(url,params);
            console.log("setelah axios exec");
            let data = response.data;
            let statusx = response.status;
            // console.log("checkPayShip.data = " + data);
            // console.log("DATA=================================");
            // console.log(data);

            if(statusx == 200){
              let resStatus = data.status;
              // let resUserpackage = data.Userpackage;
              // let resData_api = data.data_api;

              let resUserpackage =data.Userpackage;
              let resData_api = data.data.data_api;
              // console.log("resStatus = " + resStatus);
              // console.log(resData_api);

              if(resStatus == true){
                return ({status:resStatus, msg:"Shipping Cost Available", data:data }); //res.status(200).json
              }else if(resStatus != true){
                return ({status:resStatus, msg:"Shipping Cost Not Founded", data:data});
                // return res.status(409).json({status:'failed', msg:"Shipping Cost Not Founded", data:data});
              }
              
            }else if(resStatus != true){
              return ({status:resStatus, msg:"Shipping Cost Not Founded", data:data});
              // return res.status(409).json({status:'failed', msg:"Shipping Cost Not Founded", data:data});
            }
            
        }
        catch (err) {
            // console.log(err);
            console.log("Masuk ke catch");
            // internalError(field, res,err )
            // let data = response.data;
            // let statusx = response.status;
            // let resStatus = JSON.parse(data.status); 
            return ({status:false, msg:"Shipping Cost Not Founded"});
        }    

}



  const getConfirmByInvNo = async (req, res) => {
    const { invoiceno } = req.body;
      try {
        let sql = "SELECT TOP 1 a.userlogin, a1.fullnm as nama_penjual, " +
                  "        CONVERT(VARCHAR(10), a.datetrans, 120) as datetrans, " +
                  "    b.receiver_name, b.tel_hp1 AS receiver_phone, b.addr1 as receiver_addr, " +
                  "    b.kel_code, b.kab_code, b.prov_code, " +
                  "    a.id_lp, a.total_pay, a.totPayDP, a.totPayCP, a.payShip, a.[status], a.wa_sent_stt, " +
                  "    a.confirmstatus, CONVERT(VARCHAR(16), a.confirmeddate, 120) as confirmeddate, a.confirmedby, a.is_cod, " +
                  "    a.is_free_sip_from_member, a.profit_member, a.wa_sent_remark, " +
                  "    b.conoteJNE, a.orderno, " +
                  "    CASE  " +
                  "      WHEN a.status = '1' THEN 'Sudah Dikonfirmasi untuk dikirim'   " +
                  "      WHEN a.status = '8' THEN 'Penerima menolak Paket' " +
                  "      WHEN a.status = '9' THEN 'Konfirmasi Menolak' " +
                  "      WHEN a.status = '7' THEN 'Dikembalikan oleh Kurir' " +
                  "      WHEN a.status = '10' THEN 'Sudah Dikonfirm untuk Batal/Tidak dikirim' " +
                  "      WHEN a.status = '0' OR a.status = '' OR a.status is null THEN 'Butuh Konfirmasi Penerima' " +
                  "    END AS keterangan_status, " +
                  "    c.reply, c.param, c.messageId, a.remarks, c.[from], a.wa_sent_remark   " +
                  "FROM db_ecommerce.dbo.ecomm_trans_hdr_sgo a " +
                  "    INNER JOIN klink_mlm2010.dbo.msmemb a1 ON (a.userlogin COLLATE SQL_Latin1_General_CP1_CS_AS = a1.dfno) " +
                  "    INNER JOIN db_ecommerce.dbo.ecomm_trans_shipaddr_sgo b ON (a.orderno = b.orderno) " +
                  "    LEFT OUTER JOIN db_ecommerce.dbo.ecomm_trans_cod_confirm c ON (a.orderno = c.orderno) " +
                  "WHERE a.orderno = '"+ invoiceno +"' " +
                  "ORDER BY c.date DESC ";
        let data = await sequelize.query(sql);
        console.log(data)
        
        if (!data) {
          return logError(req, res, 400, 'Record not founded.'); 
        }else{
          logSuccess(req, res, 200, { data: data[0] });      
          return data[0]
        }
      } catch (err) {
        let msg = err
        logReturn(req, res, 409, msg, 'failed')
      }
  }  

  return {
    CODUpdateConfirmStatus,
    checkPayShip,
    getConfirmByInvNo
  };
};

module.exports = ShippingcController;
