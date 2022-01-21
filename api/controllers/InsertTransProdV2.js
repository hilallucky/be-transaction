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

const InsertTransProdV2 = () => {

"use strict";
  

   

    const insertNEwTemp = async( req, res) => {
        let { body } = req;
        var headerProd = [];
        var detPrdProd = [];
        var payProd = [];
        var shippAddrProd = [];
        var logLogin = [];
        var logTrans = [];
        var ordernoX, ordernoxx, conote_newx, sentTo, appname = "", bonusPeriod, msg, errCount = 0;
        
        if(body.length > 0){
            console.log('Mulai 1');
            let transaction = await sequelize.transaction();
            console.log('Mulai 2');
            try {
                // start looping
                for(let i = 0; i < body.length; i++){
                    ordernoxx = body[i].orderno;
                    appname = body[i].appname;

                    // //if transaction from app.k-mart and prefix DEV then return error, because it's all testing
                    // if(body[i].appname.includes('app.k-mart') && body[i].ordernoxx.includes('DEV-')){
                    //     msg = 'Order ('+ordernoxx+') are not allowed to push into production if only development order.';
                    //     return logOrderError(req, res, 407, msg);
                    // }

                    if(body[i].add_prefix == "DB"){ //"digitalbrain.co.id"){
                        ordernoxx = "EC" + body[i].orderno;  
                    }

                    conote_newx = body[i].awb;

                    //START check transaction in production tables
                    let checkOrderno = null, checkTransHeaderProdObj, checkTransHeaderProd = null;
                    checkTransHeaderProd = await TransHeaderProd.findOne({
                                            where: {token: ordernoxx}, 
                                            attributes: ['orderno'] });
                    if(checkTransHeaderProd){ // !== null){
                        checkTransHeaderProdObj = Object.assign(checkTransHeaderProd);
                        checkOrderno = checkTransHeaderProdObj.dataValues.orderno;
                    }

                    if(checkOrderno){ // !== null){ //if order already exist then stop
                        msg = 'Orderno is already registered';
                        errCount = errCount + 1;
                        // return logOrderError(req, res, 409, msg);
                        continue;
                    }
                    //END check transaction in production tables

                    // try catch ke 2
                    let sql = "SELECT top 1 a.* " +
                        " FROM ecomm_trans_hdr_sgo a " + 
                        " WHERE a.orderno = '" + ordernoxx + "'";

                    let datahdr = await sequelize.query(sql);

                    if (datahdr[0].length == 0) {
                    // if(datahdr == null || datahdr == ''){
                        // return logOrderError(req, res, 400, 'Record not founded.');
                        msg = 'Record not founded.';
                        errCount = errCount + 1;
                        continue;
                    } else {

                        if(datahdr[0][0].status != "1" && datahdr[0][0].is_cod == "1"){ //order sudah direject s ebelum dikirim
                            msg = "Order Rejected by customer - " + datahdr[0][0].confirmeddate;
                            errCount = errCount + 1;
                            console.log(msg);
                            // return logOrderError(req, res, 400, msg);
                            continue;
                        }


                        console.log("datahdr[0][0].conote_new :== " +datahdr[0][0].conote_new);    
                        // if((datahdr[0][0].conote_new == "" || datahdr[0][0].conote_new == null) && (conote_newx != "")) {
                        if((!datahdr[0][0].conote_new) && (conote_newx)) {
                            console.log("masuk ke if")
                            await TransHeaderTmp.update({
                                conote_new : conote_newx, //body[i].awb,    
                            }, 
                            // { where: {orderno: body[i].orderno }},
                                { where: {orderno: ordernoxx}},
                                {transaction})

                            await TransShipAddrTmp.update({
                                conoteJNE : conote_newx, //body[i].awb,    
                                }, 
                                // { where: {orderno: body[i].orderno }},
                                { where: {orderno: ordernoxx}},
                                {transaction})
                        }

                        for (var x = 0; x < datahdr[0].length; x++) {
                            bonusPeriod = datahdr[0][x].bonusmonth;
                            //Create Orderno
                            let ordernoProd = await MiscController().createOrdernoF(body[i].add_prefix.trim(), dateFormat( Date(datahdr[0][x].datetrans), "yyyy-mm-dd"), 
                                                                            datahdr[0][x].trxtype.trim(), datahdr[0][x].is_umroh.trim(), null);
                            // ordernoX = ordernoProd.trans_no;
                            ordernoX = ordernoProd.res_val;

                            if(datahdr[0][x].is_cod == "1"){
                                conote_newx = datahdr[0][x].conote_new;

                                let bonusPeriodX = await MiscController().getBonusPeriodCheck();
                                bonusPeriod = dateFormat( Date(bonusPeriodX.bnsperiod_now_cod), "mm/yyyy");
                                console.log('bonusPeriod :== '+bonusPeriod);

                            }else{
                                conote_newx = conote_newx;
                            }
                    
                            sentTo = datahdr[0][x].sentTo;
                            appname = datahdr[0][x].appname;

                            //START if sentto Stockist and apps name from k-mart apps then hit this endpoint
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
                                datetrans : dateFormat( Date(datahdr[0][x].datetrans), "yyyy-mm-dd HH:MM:ss"),
                                idstk : datahdr[0][x].idstk,
                                nmstkk : datahdr[0][x].nmstkk,
                                status : datahdr[0][x].status,
                                secno : datahdr[0][x].secno,
                                flag_trx : datahdr[0][x].flag_trx,
                                sentTo : sentTo, //datahdr[0][x].sentTo,
                                payShip : datahdr[0][x].payShip,
                                payAdm : datahdr[0][x].payAdm,
                                bank_code_payment : datahdr[0][x].bank_code_payment,
                                conote_new : datahdr[0][x].conote_new,
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
                                print_date : dateFormat( Date(datahdr[0][x].print_date), "yyyy-mm-dd HH:MM:ss"),
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
                                is_cod : datahdr[0][x].is_cod,
                                pay_insurrance : datahdr[0][x].pay_insurrance,
                                price_type : datahdr[0][x].price_type,
                                appname : datahdr[0][x].appname,
                                trxtype : datahdr[0][x].trxtype,
                                group_trans_hdr : datahdr[0][x].group_trans_hdr,
                                is_dropshipper : datahdr[0][x].is_dropshipper,
                                dropshipper_name : datahdr[0][x].dropshipper_name,
                                reff_code : datahdr[0][x].reff_code,
                                confirmstatus : datahdr[0][x].confirmstatus
                            });

                            //START set variable log_login
                            logLogin.push({
                                log_dfno : datahdr[0][x].id_memb,
                                log_date : dateFormat( Date(datahdr[0][x].datetrans), "yyyy-mm-dd HH:MM:ss"),
                                log_status :  datahdr[0][x].log_status, //0 = without login, 1=login
                                log_ipaddress : datahdr[0][x].ip_address,
                                appsname : datahdr[0][x].appname,
                            });
                            //END set variable log_login

                            //START set variable log_trans
                            logTrans.push({
                                log_dfno : datahdr[0][x].id_memb,
                                log_date : dateFormat( Date(datahdr[0][x].datetrans), "yyyy-mm-dd HH:MM:ss"),
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
                    // end try catch ke 2

                    // try catch ke 3
                    let sqlProd = "SELECT * " +
                              " FROM ecomm_trans_det_prd_sgo a " + 
                              // " WHERE a.orderno = '" + body[i].orderno + "'";
                              " WHERE a.orderno = '" + ordernoxx + "'";
                    
                    let dataprd = await sequelize.query(sqlProd);                   
             
                    // if (!dataprd) {
                    if(dataprd.length == 0){
                        // return logError(req, res, 400, 'Record not founded.');
                        msg = 'Record not founded.'
                        errCount = errCount + 1;
                       // return logOrderError(req, res, 400, msg);
                       continue;
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
                    // end try catch ke 3

                    // try catch ke 4
                    let sqlPayDet = "SELECT * " +
                            " FROM ecomm_trans_paydet_sgo a " + 
                            " WHERE a.orderno = '" + ordernoxx + "'";
                    
                    let datapayment = await sequelize.query(sqlPayDet);
                    
                    // if (!datapayment) {
                    if(datapayment.length == 0){
                        msg = 'Record not founded.'
                        errCount = errCount + 1;
                        // return logOrderError(req, res, 400, msg);
                        continue;
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
                        
                    }
                    // end try catch ke 4

                    // start try cath ke 5
                    let sqlShip = "SELECT * " +
                            " FROM ecomm_trans_shipaddr_sgo a " + 
                            // " WHERE a.orderno = '" + body[i].orderno + "'";
                            " WHERE a.orderno = '" + ordernoxx + "'";
                    
                    let datashipping = await sequelize.query(sqlShip);
                
                    // if (!datashipping) {
                    if(datashipping.length == 0){
                        // return logError(req, res, 400, 'Record not founded.');
                        msg = 'Record not founded.'
                        errCount = errCount + 1;
                        // return logOrderError(req, res, 400, msg);
                        continue;
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
                    // end try catch ke 5
                    
                }

                // and looping
                
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

                // if(trans.length > 0){
                if(errCount == 0){
                    await transaction.commit();
                    console.log('errCount : == ' + errCount);
                    return logOrderProdSuccess(req, res, 200, {login: login, trans: trans}, body[0].orderno)
                }else{
                    await transaction.rollback();
                    return logOrderError(req, res, 400, msg);
                }
            } catch (err) {
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
                   console.log(err)
                   return logOrderError(req, res, 500, "internal error", err.message);
                }
            }
        }
    };

  return {
    insertNEwTemp
  };
};

module.exports = InsertTransProdV2;
