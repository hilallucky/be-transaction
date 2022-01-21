const TransHeaderProd = require('../models/TransHeaderSukses');
const TransDetPrdProd = require('../models/TransDetPrdSukses');
const TransPayDateProd = require('../models/TransPayDateSukses');
const TransShipAddrProd = require('../models/TransShipAddrSukses');
const TransHeaderTmp = require('../models/TransHeaderTmp');
const TransPayDateTmp = require('../models/TransPayDateTmp');
const TransShipAddrTmp = require('../models/TransShipAddrTmp');
const Log_login = require('../models/Log_login');
const Log_trans = require('../models/Log_trans');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/ecomm_production.js');
const {internalError, logSuccess, logError, logReturn, logOrderError, logOrderProdSuccess} = require('../services/logger');
const dateFormat = require('dateformat');

const MiscController = require('../controllers/MiscController');
const NotifController = require('../controllers/NotificationController');

const InsertTransProdController = () => {

"use strict";
  const insertTransProd = async (req, res) => {
    let { body } = req;


   if(body.length > 0){

     var headerProd = [];
     var detPrdProd = [];
     var payProd = [];
     var shippAddrProd = [];
     var logLogin = [];
     var logTrans = [];

      for(let i = 0; i < body.length; i++){


        //START set variable header Prod
        headerProd.push({
                      orderno : body[i].orderno,
                      bankaccno : body[i].bankaccno,
                      token : body[i].token,
                      id_memb : body[i].id_memb,
                      nmmember : body[i].nmmember,
                      total_pay : body[i].total_pay,
                      total_bv : body[i].total_bv,
                      pricecode : body[i].pricecode,
                      bonusmonth : body[i].bonusmonth,
                      datetrans : body[i].datetrans,
                      idstk : body[i].idstk,
                      nmstkk : body[i].nmstkk,
                      status : body[i].status,
                      secno : body[i].secno,
                      flag_trx : body[i].flag_trx,
                      sentTo : body[i].sentTo,
                      SSRno : body[i].SSRno,
                      REGISTERno : body[i].REGISTERno,
                      CNno : body[i].CNno,
                      KWno : body[i].KWno,
                      IPno : body[i].IPno,
                      CNstatus : body[i].CNstatus,
                      KWstatus : body[i].KWstatus,
                      IPstatus : body[i].IPstatus,
                      dateKW : body[i].dateKW,
                      dateCN : body[i].dateCN,
                      dateIP : body[i].dateIP,
                      usrKW : body[i].usrKW,
                      eod_status : body[i].eod_status,
                      status_vt_pay : body[i].status_vt_pay,
                      status_vt_app_dt : body[i].status_vt_app_dt,
                      status_vt_reject_dt : body[i].status_vt_reject_dt,
                      payShip : body[i].payShip,
                      payAdm : body[i].payAdm,
                      CNPosteddt : body[i].CNPosteddt,
                      KWPosteddt : body[i].KWPosteddt,
                      IPPosteddt : body[i].IPPosteddt,
                      CNPrintStatus : body[i].CNPrintStatus,
                      KWPrintStatus : body[i].KWPrintStatus,
                      IPPrintStatus : body[i].IPPrintStatus,
                      is_umroh : body[i].is_umroh,
                      is_pickup : body[i].is_pickup,
                      pickup_date : body[i].pickup_date,
                      is_ship : body[i].is_ship,
                      pickup_number : body[i].pickup_number,
                      bank_code_payment : body[i].bank_code_payment,
                      payConnectivity : body[i].payConnectivity,
                      DOno : body[i].DOno,
                      print_count : body[i].print_count,
                      pickup_datetime : body[i].pickup_datetime,
                      conote_new : body[i].conote_new,
                      promoPrintStatus : body[i].promoPrintStatus,
                      is_login : body[i].is_login,
                      totPayDP : body[i].totPayDP,
                      totPayCP : body[i].totPayCP,
                      profit_member : body[i].profit_member,
                      is_free_sip_from_member : body[i].is_free_sip_from_member,
                      free_ship_val : body[i].free_ship_val,
                      profit_member_after_deduct : body[i].profit_member_after_deduct,
                      id_lp : body[i].id_lp,
                      free_shipping : body[i].free_shipping,
                      discount_shipping : body[i].discount_shipping,
                      delivery_status : body[i].delivery_status,
                      cashback_point : body[i].cashback_point,
                      order_taken : body[i].order_taken,
                      taken_by : body[i].taken_by,
                      print_date : body[i].print_date,
                      no_hp_konfirmasi : body[i].no_hp_konfirmasi,
                      date_in : body[i].date_in,
                      whcd : body[i].whcd,
                      whnm : body[i].whnm,
                      is_vcr_prod : body[i].is_vcr_prod,
                      is_vcr_cash : body[i].is_vcr_cash,
                      is_vcr_free_ongkir : body[i].is_vcr_free_ongkir,
                      vcr_prod_list : body[i].vcr_prod_list,
                      vcr_cash_list : body[i].vcr_cash_list,
                      vcr_free_ongkir_list : body[i].vcr_free_ongkir_list,
                      is_cod : body[i].is_cod,
                      pay_insurrance : body[i].pay_insurrance,
                      price_type : body[i].price_type,
                      flag_generated : body[i].flag_generated, //if 1 then no need to generate CNNo and other no in  trigger
                      end_point : body[i].end_point,
                      diskon_produk : body[i].diskon_produk,
                      flag_sms_cod : body[i].flag_sms_cod,
                      paycod_date : body[i].paycod_date,
                      appname : body[i].appname,
                      trxtype : body[i].trxtype,
                      group_trans_hdr : body[i].group_trans_hdr,
                      is_dropshipper : body[i].is_dropshipper,
                      dropshipper_name : body[i].dropshipper_name,
                      confirmeddate : body[i].confirmeddate,
                      confirmstatus : body[i].confirmstatus,
                      remarks : body[i].remarks,
                      confirmedby : body[i].confirmedby,

              });
        //END set variable header Prod
        
        for(let j = 0; j < body[i].detail.length; j++){ //detail product
          let detail = body[i].detail[j];
          //console.log(detail);
          detPrdProd.push({ 
                          orderno : body[i].orderno,
                          prdcd : detail.prdcd,
                          prdnm : detail.prdnm,
                          qty : detail.qty,
                          bvr : detail.bvr,
                          dpr : detail.dpr,
                          pricecode : body[i].pricecode,
                          sentTo : body[i].sentTo,
                          ByrSisaSales : detail.ByrSisaSales,
                          cpr : detail.cpr,
                          profit_d : detail.profit_d
                        });
          //console.log(detPrdProd);
        }

        for(let j = 0; j < body[i].payment.length; j++){ //detail payment
          let payment = body[i].payment[j];
          //console.log(payment);

          payProd.push({
                    orderno : body[i].orderno,
                    seqno : payment.seqno,
                    paytype : payment.paytype,
                    docno : payment.docno,
                    payamt : payment.payamt,
                    deposit : payment.deposit,
                    notes : payment.notes,
                    paystatus : payment.paystatus,
                    bank_code_payment : payment.bank_code_payment,
                    charge_admin : payment.charge_admin
                  });
        }

        for(let j = 0; j < body[i].shippAddr.length; j++){ //detail payment
          let shippAddr = body[i].shippAddr[j];

          shippAddrProd.push({
                            orderno : body[i].orderno,
                            idstk : body[i].idstk,
                            prov_code : shippAddr.prov_code,
                            kab_code : shippAddr.kab_code,
                            kec_code : shippAddr.kec_code,
                            kel_code : shippAddr.kel_code,
                            post_code : shippAddr.post_code,
                            addr1 : shippAddr.addr1,
                            addr2 : shippAddr.addr2,
                            addr3 : shippAddr.addr3,
                            email : shippAddr.email,
                            tel_hp1 : shippAddr.tel_hp1,
                            tel_hp2 : shippAddr.tel_hp2,
                            conoteJNE : shippAddr.conoteJNE,
                            service_type_id : shippAddr.service_type_id,
                            service_type_name : shippAddr.service_type_name,
                            flag_send_conote : shippAddr.flag_send_conote,
                            total_item : shippAddr.total_item,
                            total_weight : shippAddr.total_weight,
                            total_pay_net : shippAddr.total_pay_net,
                            receiver_name : shippAddr.receiver_name,
                            stockist_name : shippAddr.stockist_name,
                            kabupaten_name : shippAddr.kabupaten_name,
                            province_name : shippAddr.province_name,
                            sender_address : shippAddr.sender_address,
                            dest_address : shippAddr.dest_address,
                            jne_branch : shippAddr.jne_branch,
                            shipper_telhp : shippAddr.shipper_telhp,
                            cargo_id : shippAddr.cargo_id,
                            lat_dest : shippAddr.lat_dest,
                            long_dest : shippAddr.long_dest,
                            whcd : body[i].whcd,
                            whnm : body[i].whnm,
                            id_address : shippAddr.id_address
                        });
         
        }

        //START set variable log_login
        logLogin.push({
                        log_dfno : body[i].id_memb,
                        log_date : body[i].datetrans,
                        log_status :  body[i].log_status, //0 = without login, 1=login
                        log_ipaddress : body[i].ip_address,
                        appsname : body[i].appname,
              });
        //END set variable log_login

        //START set variable log_trans
        logTrans.push({
                        log_dfno : body[i].id_memb,
                        log_date : body[i].datetrans,
                        log_trcd : body[i].orderno,
                        log_sento : body[i].sentTo,
                        log_totaldp_sales : body[i].totPayDP,
                        log_totaldp_pay : body[i].total_pay,
                        log_status_trx : body[i].status_trx,
                        log_usrlogin : body[i].userlogin,
                        trans_status : body[i].status,
                        apps_name : body[i].appname,
                        log_ipaddress : body[i].ip_address,
              });
        //END set variable log_trans
         
      }
    }

 let transaction;

      try {
         
    
          transaction = await sequelize.transaction();

           await TransHeaderProd.bulkCreate(
              //insert header Prod from array data
              headerProd, {validate:true}
             );

           

          await TransDetPrdProd.bulkCreate(
              //insert detail product Prod from array data
              detPrdProd
            , {transaction} ); 

           await TransPayDateProd.bulkCreate(
              //insert detail payment Prod from array data
              payProd
            , {transaction} ); 

         await TransShipAddrProd.bulkCreate(
              //insert detail shipping address Prod from array data
              shippAddrProd
            , {transaction} ); 

         let login = await Log_login.bulkCreate(
              //insert detail shipping address temp from array data
              logLogin
            , {transaction} ); 

       let trans =   await Log_trans.bulkCreate(
              //insert detail shipping address temp from array data
              logTrans
            , {transaction} ); 

          await transaction.commit();  
         
         logSuccess(req, res, 200, {login: login, trans: trans})
      } catch (err) {
       console.log(err)
       await transaction.rollback();

        if(err.name == 'SequelizeUniqueConstraintError')
        {
            return res.status(409).json({ status: 'conflict', message: 'Orderno is already registered' });
        }    
        if(err.name == 'AggregateError'){
            return res.status(409).json({ status: 'conflict', message: err[0].errors.errors[0].message} );
        }
        else
        {
            return res.status(500).json({ status: 'failed', message: 'Internal server error' });
        }
      }
     
    
  };



//startinsert into table production from _sgo

  const insertTransProdFromTemp = async (req, res) => {
    let { body } = req;

   if(body.length > 0){

     var headerProd = [];
     var detPrdProd = [];
     var payProd = [];
     var shippAddrProd = [];
     var logLogin = [];
     var logTrans = [];
     var ordernoX, ordernoxx, conote_newx, sentTo, appname = "", bonusPeriod;

     console.log('mulai proses insertTransProdFromTemp ya');

      // var transaction;
      console.log('mulai proses 00');
      // transaction = await sequelize.transaction();
      console.log('mulai proses 1');
     
      for(let i = 0; i < body.length; i++){
       // ordernoxx = 'EC' + body[i].orderno

        ordernoxx = body[i].orderno;
        appname = body[i].appname;
        console.log("appname" + appname)
        if(body[i].add_prefix == "DB"){ //"digitalbrain.co.id"){
          ordernoxx = "EC" + body[i].orderno;  
        }
       console.log('mulai proses 01');
       conote_newx = body[i].awb;
       console.log("01");

       //START check transaction in production tables
       try{
          let checkOrderno = null, checkTransHeaderProdObj, checkTransHeaderProd = null, msg;
          checkTransHeaderProd = await TransHeaderProd.findOne({
                                            where: {token: ordernoxx}, 
                                            attributes: ['orderno']
                                      });
          if(checkTransHeaderProd !== null){
            checkTransHeaderProdObj = Object.assign(checkTransHeaderProd);
            checkOrderno = checkTransHeaderProdObj.dataValues.orderno;
          }

          console.log('checkOrderno ::= '+checkOrderno);
          if(checkOrderno !== null){ //if order already exist then stop
            msg = 'Orderno is already registered'
            return logOrderError(req, res, 409, msg);
          }
          
        }catch(err){
            console.log(err);
        }
       //END check transaction in production tables
       let transaction1;

       try {

          console.log("mulai");

          // let transaction;
           // //UPDATE CONOTE IN ecomm_trans_hdr & ecomm_trans_ship_addr
          // let sqlUpd = "UPDATE ecomm_trans_hdr_sgo SET conote_new = '" + body[i].awb + "' WHERE orderno = '" + body[i].orderno + "'; " +
          //              "UPDATE ecomm_trans_ship_addr_sgo SET conoteJNE = '" + body[i].awb + "' WHERE orderno = '" + body[i].orderno + "'" 

          // let sqlUpdAwb = await sequelize.query(sqlUpd);

          // transaction = await sequelize.transaction();
          
            // TransPayDateTmp  

          let sql = "SELECT top 1 * " +
                    " FROM ecomm_trans_hdr_sgo a " + 
                    // " WHERE a.orderno = '" + body[i].orderno + "'";
                    " WHERE a.orderno = '" + ordernoxx + "'";
          
          let datahdr = await sequelize.query(sql);
          console.log(datahdr[0].length)
          // console.log(datahdr[0])
   
          if (!datahdr[0].length) {
           return logOrderError(req, res, 400, 'Record not founded.');
          }else{

          transaction1 = await sequelize.transaction();

            //confirmeddate, a.confirmstatus, a.status
            if(datahdr[0][0].status != "1" && datahdr[0][0].is_cod == "1"){ //order sudah direject s ebelum dikirim
               let msg = "Order Rejected by customer - " + datahdr[0][0].confirmeddate;
               return logOrderError(req, res, 400, msg);
             }

            console.log("awbnya = "+datahdr[0][0].conote_new);
            if((datahdr[0][0].conote_new == "" || datahdr[0][0].conote_new == null) && (conote_newx != "")) {
              console.log("masuk ke if")
              await TransHeaderTmp.update({
                  conote_new : conote_newx, //body[i].awb,    
                }, 
                // { where: {orderno: body[i].orderno }},
                { where: {orderno: ordernoxx}},
                {transaction1}
              )

              await TransShipAddrTmp.update({
                  conoteJNE : conote_newx, //body[i].awb,    
                }, 
                // { where: {orderno: body[i].orderno }},
                { where: {orderno: ordernoxx}},
                {transaction1}
              )
            }
             await transaction1.commit();

            for (var x = 0; x < datahdr[0].length; x++) {
              bonusPeriod = datahdr[0][x].bonusmonth;
              console.log('orderno = ' + datahdr[0][x].orderno);
              console.log("datahdr[0][x].is_cod :  " + datahdr[0][x].is_cod);

                // console.log("add_prefix = " + body[i].add_prefix);
                //Create Orderno
                let ordernoProd = await MiscController().createOrdernoF(body[i].add_prefix.trim(), dateFormat( Date(datahdr[0][x].datetrans), "yyyy-mm-dd"), 
                                                                datahdr[0][x].trxtype.trim(), datahdr[0][x].is_umroh.trim(), null);
                // ordernoX = ordernoProd.trans_no;
                ordernoX = ordernoProd.res_val;
                console.log("ordernoProd = " + ordernoX);

                if(datahdr[0][x].is_cod == "1"){
                  conote_newx = datahdr[0][x].conote_new;

                  let bonusPeriodX = await MiscController().getBonusPeriodCheck();
                  bonusPeriod = dateFormat(new Date(bonusPeriodX.bnsperiod_now_cod), "mm/yyyy");
                  console.log('bonusPeriod :== '+bonusPeriod);

                }else{
                  conote_newx = conote_newx;
                }
                
                sentTo = datahdr[0][x].sentTo;
                appname = datahdr[0][x].appname;

                //=======================================================================================
                //START if sentto Stockist and apps name from k-mart apps then hit this endpoint
                console.log(ordernoxx.includes('INV'));
                console.log("sentTo = "+sentTo);
                console.log("appname = "+appname);
                if(sentTo == "1" && appname.includes("app.k-mart")){
                    let order = [];
                    order.push({
                                order_id: ordernoxx,
                                status: "IN_SHIPPING"
                              });
                    console.log("sendNotifPickupStockist === "+order);
                    let test = await NotifController().sendNotifPickupStockist(order);
                    // return res.status(200).json( test); 
                    console.log('hasil hit api mars test = ' +test);
                  }
                //END
                //=======================================================================================

                //START set variable header Prod
                headerProd.push({
                              orderno : ordernoX, //datahdr[0][x].orderno,
                              bankaccno : datahdr[0][x].bankaccno,
                              token : datahdr[0][x].orderno,//token,
                              id_memb : datahdr[0][x].id_memb,
                              nmmember : datahdr[0][x].nmmember,
                              total_pay : datahdr[0][x].total_pay,
                              total_bv : datahdr[0][x].total_bv,
                              pricecode : datahdr[0][x].pricecode,
                              bonusmonth : bonusPeriod, //datahdr[0][x].bonusmonth,
                              datetrans : dateFormat(new Date(datahdr[0][x].datetrans), "yyyy-mm-dd HH:MM:ss"),
                              idstk : datahdr[0][x].idstk,
                              nmstkk : datahdr[0][x].nmstkk,
                              status : datahdr[0][x].status,
                              secno : datahdr[0][x].secno,
                              flag_trx : datahdr[0][x].flag_trx,
                              sentTo : sentTo, //datahdr[0][x].sentTo,
                              payShip : datahdr[0][x].payShip,
                              payAdm : datahdr[0][x].payAdm,
                              // is_umroh : datahdr[0][x].is_umroh,
                              // is_pickup : datahdr[0][x].is_pickup,
                              // pickup_date : datahdr[0][x].pickup_date,
                              // is_ship : datahdr[0][x].is_ship,
                              // pickup_number : datahdr[0][x].pickup_number,
                              bank_code_payment : datahdr[0][x].bank_code_payment,
                              // payConnectivity : datahdr[0][x].payConnectivity,
                              // DOno : datahdr[0][x].DOno,
                              // print_count : datahdr[0][x].print_count,
                              // pickup_datetime : datahdr[0][x].pickup_datetime,
                              conote_new : datahdr[0][x].conote_new,
                              // promoPrintStatus : datahdr[0][x].promoPrintStatus,
                              is_login : datahdr[0][x].is_login,
                              totPayDP : datahdr[0][x].totPayDP,
                              totPayCP : datahdr[0][x].totPayCP,
                              profit_member : datahdr[0][x].profit_member,
                              is_free_sip_from_member : datahdr[0][x].is_free_sip_from_member,
                              free_ship_val : datahdr[0][x].free_ship_val,
                              profit_member_after_deduct : datahdr[0][x].profit_member_after_deduct,
                              id_lp : datahdr[0][x].id_lp,
                              free_shipping : datahdr[0][x].free_shipping,
                              discount_shipping : datahdr[0][x].discount_shipping,
                              print_date : dateFormat(new Date(datahdr[0][x].print_date), "yyyy-mm-dd HH:MM:ss"),
                              no_hp_konfirmasi : datahdr[0][x].no_hp_konfirmasi,
                              date_in : datahdr[0][x].date_in,
                              whcd : datahdr[0][x].whcd,
                              whnm : datahdr[0][x].whnm,
                              kode_pay : body[i].kode_pay,
                              kode_ref_bank : datahdr[0][x].kode_ref_bank,
                              flag_payment : datahdr[0][x].flag_payment,
                              date_expired : datahdr[0][x].date_expired,
                              kode_unik : datahdr[0][x].kode_unik,
                              flag_production : datahdr[0][x].flag_production,
                              nom_pay : datahdr[0][x].nom_pay,
                              // is_vcr_prod : datahdr[0][x].is_vcr_prod,
                              // is_vcr_cash : datahdr[0][x].is_vcr_cash,
                              // is_vcr_free_ongkir : datahdr[0][x].is_vcr_free_ongkir,
                              // vcr_prod_list : datahdr[0][x].vcr_prod_list,
                              // vcr_cash_list : datahdr[0][x].vcr_cash_list,
                              // vcr_free_ongkir_list : datahdr[0][x].vcr_free_ongkir_list,
                              is_cod : datahdr[0][x].is_cod,
                              pay_insurrance : datahdr[0][x].pay_insurrance,
                              price_type : datahdr[0][x].price_type,
                              // flag_generated : datahdr[0][x].flag_generated, //if 1 then no need to generate CNNo and other no in  trigger
                              // end_point : datahdr[0][x].end_point,
                              // diskon_produk : datahdr[0][x].diskon_produk,
                              // flag_sms_cod : datahdr[0][x].flag_sms_cod,
                              // paycod_date : datahdr[0][x].paycod_date,
                              appname : datahdr[0][x].appname,
                              trxtype : datahdr[0][x].trxtype,
                              group_trans_hdr : datahdr[0][x].group_trans_hdr,
                              is_dropshipper : datahdr[0][x].is_dropshipper,
                              dropshipper_name : datahdr[0][x].dropshipper_name,
                              // confirmeddate : datahdr[0][x].confirmeddate,
                              // confirmstatus : datahdr[0][x].confirmstatus,
                              // remarks : datahdr[0][x].remarks,
                              // confirmedby : datahdr[0][x].confirmedby,
                              reff_code : datahdr[0][x].reff_code,
                      });

                    //START set variable log_login
                    logLogin.push({
                                    log_dfno : datahdr[0][x].id_memb,
                                    log_date : dateFormat(new Date(datahdr[0][x].datetrans), "yyyy-mm-dd HH:MM:ss"),
                                    log_status :  datahdr[0][x].log_status, //0 = without login, 1=login
                                    log_ipaddress : datahdr[0][x].ip_address,
                                    appsname : datahdr[0][x].appname,
                          });
                    //END set variable log_login

                    //START set variable log_trans
                    logTrans.push({
                                    log_dfno : datahdr[0][x].id_memb,
                                    log_date : dateFormat(new Date(datahdr[0][x].datetrans), "yyyy-mm-dd HH:MM:ss"),
                                    log_trcd : ordernoX, //datahdr[0][x].orderno,
                                    log_sento : datahdr[0][x].sentTo,
                                    log_totaldp_sales : datahdr[0][x].totPayDP,
                                    log_totaldp_pay : datahdr[0][x].total_pay,
                                    log_status_trx : datahdr[0][x].status_trx,
                                    log_usrlogin : datahdr[0][x].userlogin,
                                    trans_status : datahdr[0][x].status,
                                    apps_name : datahdr[0][x].appname,
                                    log_ipaddress : datahdr[0][x].ip_address,
                          });
                    //END set variable log_trans
              }
          }


          // return res.status(200).json(datahdr[0]);   

        } catch (err) {
          console.log(err)
          await transaction1.rollback();
          return logOrderError(req, res, 400, err);
        }
        //END set variable header Prod
        
        
      // //Start Detail Product
      //   for(let j = 0; j < body[i].detail.length; j++){ //detail product
      //     let detail = body[i].detail[j];
      //     //console.log(detail);


          try {

            let sql = "SELECT * " +
                      " FROM ecomm_trans_det_prd_sgo a " + 
                      // " WHERE a.orderno = '" + body[i].orderno + "'";
                      " WHERE a.orderno = '" + ordernoxx + "'";
            
            let dataprd = await sequelize.query(sql);
           
     
            if (!dataprd) {
             // return logError(req, res, 400, 'Record not founded.');
              let msg = 'Record not founded.'
               return logOrderError(req, res, 400, msg);
            }else{
            
              for (var x = 0; x < dataprd[0].length; x++) {
                detPrdProd.push({ 
                                orderno : ordernoX, //dataprd[0][x].orderno,
                                prdcd : dataprd[0][x].prdcd,
                                prdnm : dataprd[0][x].prdnm,
                                qty : dataprd[0][x].qty,
                                bvr : dataprd[0][x].bvr,
                                dpr : dataprd[0][x].dpr,
                                pricecode : dataprd[0][x].pricecode,
                                sentTo : dataprd[0][x].sentTo,
                                ByrSisaSales : dataprd[0][x].ByrSisaSales, //detail.ByrS.isaSales,
                                cpr : dataprd[0][x].cpr, //detail.cpr,
                                profit_d : dataprd[0][x].profit_d, //detail.profit_d
                              });
              }
            }
          } catch (err) {
          // return internalError(req, res,err )
              let msg = err
               return logOrderError(req, res, 409, msg);
          }
        // }
          //console.log(detPrdProd);
        // }
        //End Detail Product

        // //Start Detail Payment
        // for(let j = 0; j < body[i].payment.length; j++){ //detail payment
        //   let payment = body[i].payment[j];
        //   //console.log(payment);

          try {

            let sql = "SELECT * " +
                      " FROM ecomm_trans_paydet_sgo a " + 
                      // " WHERE a.orderno = '" + body[i].orderno + "'";
                      " WHERE a.orderno = '" + ordernoxx + "'";
            
            let datapayment = await sequelize.query(sql);
            
            if (!datapayment) {
              // return logError(req, res, 400, 'Record not founded.');
              let msg = 'Record not founded.'
               return logOrderError(req, res, 400, msg);
            }else{
              // console.log(datapayment[0].length);
              for (var x = 0; x < datapayment[0].length; x++) {
                      payProd.push({
                                orderno : ordernoX, //datapayment[0][x].orderno,
                                seqno : datapayment[0][x].seqno,
                                paytype : datapayment[0][x].paytype,
                                docno : datapayment[0][x].docno,
                                payamt : datapayment[0][x].payamt,
                                deposit : datapayment[0][x].deposit,
                                notes : body[i].notes, //datapayment[0][x].notes,
                                paystatus : datapayment[0][x].paystatus,
                                bank_code_payment : datapayment[0][x].bank_code_payment,
                                charge_admin : datapayment[0][x].charge_admin
                              });
              }
              // console.log('payProd adalah = ');
              // console.log(payProd);
            }
          } catch (err) {
            // return internalError(req, res,err )
              let msg = err
               return logOrderError(req, res, 409, msg);
          }
        // }
        //End Detail Payment


        // //Start Detail Shipping
        // for(let j = 0; j < body[i].shippAddr.length; j++){ //detail payment
        //   let shippAddr = body[i].shippAddr[j];

          try {

            let sql = "SELECT * " +
                      " FROM ecomm_trans_shipaddr_sgo a " + 
                      // " WHERE a.orderno = '" + body[i].orderno + "'";
                      " WHERE a.orderno = '" + ordernoxx + "'";
            
            let datashipping = await sequelize.query(sql);
           
     
            if (!datashipping) {
              // return logError(req, res, 400, 'Record not founded.');
              let msg = 'Record not founded.'
               return logOrderError(req, res, 400, msg);
            }else{
              for (var x = 0; x < datashipping[0].length; x++) {
                      shippAddrProd.push({
                                        orderno : ordernoX, //datashipping[0][x].orderno,
                                        idstk : datashipping[0][x].idstk,
                                        prov_code : datashipping[0][x].prov_code,
                                        kab_code : datashipping[0][x].kab_code,
                                        kec_code : datashipping[0][x].kec_code,
                                        kel_code : datashipping[0][x].kel_code,
                                        post_code : datashipping[0][x].post_code,
                                        addr1 : datashipping[0][x].addr1,
                                        addr2 : datashipping[0][x].addr2,
                                        addr3 : datashipping[0][x].addr3,
                                        email : datashipping[0][x].email,
                                        tel_hp1 : datashipping[0][x].tel_hp1,
                                        tel_hp2 : datashipping[0][x].tel_hp2,
                                        conoteJNE : datashipping[0][x].conoteJNE,
                                        service_type_id : datashipping[0][x].service_type_id,
                                        service_type_name : datashipping[0][x].service_type_name,
                                        flag_send_conote : datashipping[0][x].flag_send_conote,
                                        total_item : datashipping[0][x].total_item,
                                        total_weight : datashipping[0][x].total_weight,
                                        total_pay_net : datashipping[0][x].total_pay_net,
                                        receiver_name : datashipping[0][x].receiver_name,
                                        stockist_name : datashipping[0][x].stockist_name,
                                        kabupaten_name : datashipping[0][x].kabupaten_name,
                                        province_name : datashipping[0][x].province_name,
                                        sender_address : datashipping[0][x].sender_address,
                                        dest_address : datashipping[0][x].dest_address,
                                        jne_branch : datashipping[0][x].jne_branch,
                                        shipper_telhp : datashipping[0][x].shipper_telhp,
                                        cargo_id : datashipping[0][x].cargo_id,
                                        lat_dest : datashipping[0][x].lat_dest,
                                        long_dest : datashipping[0][x].long_dest,
                                        whcd : datashipping[0][x].whcd,
                                        whnm : datashipping[0][x].whnm,
                                        id_address : datashipping[0][x].id_address
                                    });
                }
            }
          } catch (err) {
              // return internalError(req, res,err )
              let msg = err
               return logOrderError(req, res, 409, msg);
          }
        // }
        //End Detail Shipping
         
      }
    }

 let transaction;

      try {

          // // //UPDATE CONOT IN ecomm_trans_hdr & ecomm_trans_ship_addr
          // // let sqlUpd = "UPDATE ecomm_trans_hdr_sgo SET conote_new = '" + body[i].awb + "' WHERE orderno = '" + body[i].orderno + "'; " +
          // //              "UPDATE ecomm_trans_ship_addr_sgo SET conoteJNE = '" + body[i].awb + "' WHERE orderno = '" + body[i].orderno + "'" 

          // // let sqlUpdAwb = await sequelize.query(sqlUpd);
          // // // console.log(headerProd);
          // // // transaction = await sequelize.transaction();

          // // //  await TransHeaderProd.bulkCreate(
          // // //     //insert header Prod from array data
          // // //     headerProd
          // // //   , {transaction} , { validate: true } );


          transaction = await sequelize.transaction();
          // await TransHeaderTmp.update({
          //     conote_new : body[i].awb,    
          //   }, 
          //   { where: {orderno: body[i].orderno }},
          //   {transaction}
          // )

          // transaction = await sequelize.transaction();
          // await TransShipAddrTmp.update({
          //     conoteJNE : body[i].awb,    
          //   }, 
          //   { where: {orderno: body[i].orderno }},
          //   {transaction}
          // )
          //   // TransPayDateTmp
                     
          await TransDetPrdProd.bulkCreate(
              //insert detail product Prod from array data
              detPrdProd
            , {transaction} ); 

           await TransPayDateProd.bulkCreate(
              //insert detail payment Prod from array data
              payProd
            , {transaction} ); 

         await TransShipAddrProd.bulkCreate(
              //insert detail shipping address Prod from array data
              shippAddrProd
            , {transaction} ); 

         let login = await Log_login.bulkCreate(
              //insert detail shipping address temp from array data
              logLogin
            , {transaction} ); 

       let trans =   await Log_trans.bulkCreate(
              //insert detail shipping address temp from array data
              logTrans
            , {transaction} ); 

        // transaction = await sequelize.transaction();
         await TransHeaderProd.bulkCreate(
        //     //insert header Prod from array data
            headerProd
          , {transaction} , { validate: true } );



          await transaction.commit();  
          // logSuccess(req, res, 200, {login: login, trans: trans})
          // logReturn(req, res, 200, {login: login, trans: trans}, 'success')

          logOrderProdSuccess(req, res, 200, {login: login, trans: trans}, body[0].orderno)
      } catch (err) {
       console.log(err)
       await transaction.rollback();

        if(err.name == 'SequelizeUniqueConstraintError')
        {
              // return res.status(409).json({ status: 'conflict', message: 'Orderno is already registered' });
              let msg = 'Orderno is already registered'
              return logOrderError(req, res, 409, msg,err);
        }    
        else if(err.name == 'AggregateError'){
              // return res.status(409).json({ status: 'conflict', message: err[0].errors.errors[0].message} );
              let msg = 'AggregateError'
              return logOrderError(req, res, 409, msg,err);
        }
        else
        {
            // return res.status(500).json({ status: 'failed', message: 'Internal server error' });
            console.log(err)
            return logOrderError(req, res, 409, err);
        }
      }
     
    
  };
//end insert into table prodction from _sgo



const updateTransProd = async (req, res) => {
    let { body } = req;
    let transaction

    try{
      let transHeaderProd = await TransHeaderProd.findOne({
                                        where: {orderno: body.orderno}, 
                                        attributes: ['orderno']
                                  })
      let transHeaderProdObj = Object.assign(transHeaderProd);

      let ordernox = transHeaderProd.dataValues.orderno;
      let userloginx = transHeaderProd.dataValues.userlogin;

      if(userloginx != body.userlogin){ //userlogin di data tidak sama dengan yang login
        return res.status(401).json({ msg: 'Not authorized user.' });
      }else{
        try{
          transaction = await sequelize.transaction();
          await TransHeaderProd.update({
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
            // console.log('hasilnya = ' + transHeaderProd.dataValues.orderno);
            return res.status(200).json({ status:'success', msg: 'Orderno = ' + body.orderno + ' updated successfully.'});
            
          }catch(err){
            return res.status(409).json({ msg: 'Orderno = ' + body.orderno + ' cannot updated.' });
          }
      }
    }catch(error){
        return res.status(400).json({ status:'failed', msg: "Orderno = " + body.orderno + ' not founded.' });
    }

  };


const deleteTransProd = async (req, res) => {
    // const { orderno } = req.body;
    let { body } = req;
    let transaction

    try{
      let transHeaderProd = await TransHeaderProd.findOne({
                                        where: {orderno: body.orderno}, 
                                        attributes: ['orderno']
                                  })
      let transHeaderProdObj = Object.assign(transHeaderProd);
      
      let ordernox = transHeaderProd.dataValues.orderno;
      let userloginx = transHeaderProd.dataValues.userlogin;

      if(userloginx != body.userlogin){ //userlogin di data tidak sama dengan yang login
        return res.status(401).json({ msg: 'Not authorized user.' });
      }else{
        
        try {

          transaction = await sequelize.transaction();
          await TransHeaderProd.destroy({
            where: {
                      orderno : body.orderno 
                    } 
          }, {transaction} ); 

          await TransDetPrdProd.destroy({
            where: {
                      orderno : body.orderno 
                    }            
          }, {transaction} ); 


          await TransPayDateProd.destroy({
            where: {
                      orderno : body.orderno 
                    } 
          }, {transaction} ); 

          await TransShipAddrProd.destroy({
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
    insertTransProd,
    insertTransProdFromTemp,
    getRemark,
    updateTransProd,
    deleteTransProd,
  };
};

module.exports = InsertTransProdController;
