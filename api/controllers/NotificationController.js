const smsModel = require('../models/SmsGatewayAdd');
const axios = require('axios');
const qs = require('qs');
const birthday = require('../models/BirthdayNotification');
const neverOrder = require('../models/MemberNeverOrder');
const aYearneverOrder = require('../models/Member1YearNeverOrder');
const {internalError, logSuccess} = require('../services/logger');



const NotificationController = () => {

    const testAdd = async (req, res) => {
        let { body } = req;
        try {
            let data = await smsModel.create({
                
                ipaddress : "192.168.1.1", 
                application : "m_apps", 
                url : "k-net", 
                messages : "content", 
                sender : "K-Link", 
                receiverno : "phone", 
                smsprovider : "test provide", 
                createdt : null, 
                status : "0", 
                operator : "operator", 
                resposegw : "resposegw", 
                responsedate : null, 
                responsenote : "1", 
            });
            return res.status(200).json( {status: 'sukses', data});  
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
        }
    

    const sendSMS = async (req, res) => {

        let {phone, content, clientIp, createdt, appname} = req.body;
        
        if(phone && content  ){
                                let params = {
                                            u: 'KLink1ndo',
                                            p: 'v58ZcM2L',
                                            d: phone,
                                            m: content,
              		            }
        let url = 'https://smsgw.sprintasia.net/api/msg.php';
         
         try {
                let response = await axios.post(url,qs.stringify(params));
                // console.log(response)
                let status = response.data.slice(0,1);
                
                    let data = await smsModel.create({
                        ipaddress : clientIp, 
                        application : "m_apps", 
                        url : "NodeJs K-net API", 
                        messages : content, 
                        sender : "K-Link", 
                        receiverno : phone, 
                        smsprovider : "sprint asia", 
                        createdt : null, 
                        status : status, 
                        operator : "operator", 
                        resposegw : 'response', 
                        responsedate : null, 
                        responsenote : "1", 
                    });

               

                if(status == 0) 
                {              
                return res.status(200).json( {status: 'success', message: 'SMS sucesfully sent to '+phone}); 
                                        
                } else {
                    return res.status(500).json( {status: 'failed', message: 'internal error'}); 
                }
            }
            catch (err) {
                // console.log(err);
               internalError(req, res,err )
            }    

        }
           return res.status(400).json( {status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation'}); 
            // console.log(err);
    }


    const sendEmail = async (req, res) => {
        let { to, subject, content } = req.body;

        if(to && subject && content ){
            let params = {
                            "accessToken": "fuquvrCWLaGCKTj9KO05zWrGeiPbeHPSOLjGCuu1ynyumGnWybeOLuT9LGzmuD8b",
                            "from": "noreply@k-link.co.id",
                            "to": [to],
                            "labels": ['klinkapp'],
                            "subject": subject,
                            "content": content
                         }
            let url = 'https://trx.mailtarget.co/outbox';

         
             try {
                let response = await axios.post(url,params);
   
                if(response.data == 'message queued') 
                {                      
                    return res.status(200).json( {status: 'success', message: 'Email sucesfully sent to ' + to }); 
                } else {   

                    return res.status(500).json( {status: 'failed', message: 'internal error'}); 
                }
            }
            catch (err) {
                 return res.status(500).json( {status: 'failed', message: 'internal error'}); 
                  console.log("errornya masuk kesini ya")                
            }  
        }   
            return res.status(400).json( {status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation'}); 
            console.log(err);
    }


// Kirim Email ke member yang ulang tahun trigger via cron
// Endpoint: /sendBirthday
     const sendEmailBirthday = async (req, res) => {
        let dateFormat = require('dateformat');
        let today = dateFormat(Date.now(),'yyyy-mm-dd');
        let url = 'https://trx.mailtarget.co/outbox';
        let {accessToken, from} = req.body;

        try {

            let data = await birthday
            .findAll({
                raw: true,
                where: {
                  bd_now: today,
                  // dfno: 'IDSPAAB09538'
                },
              });
           
       
       // //  Dummy data
       //  let data = [{"email" :"yopy.arnoldy@gmail.com", "fullnm": "Notia Arnoldy"}, 
       //  {"email" :"sy.hartanto83@gmail.com", "fullnm": "Tanto Arnoldy"}]
                                 
        

                       for(let param of data){
      
                             await axios.post(url,{
                                  accessToken : accessToken,
                                  from :  from,
                                  to: [param.email],
                                  labels:["Birthday: "+today],
                                  subject: "Selamat Ulang Tahun, "+param.fullnm,
                                   templateId: "5ddba9ab970d1e1adbccedc7"
                                })
                            
                            };
                            
                            return res.status(200).json( {status: 'success', message: 'Email sucesfully sent' }); 

                        } catch (err) {
                                console.log(err);
                                  return res.status(500).json( {status: 'faileds', message: 'internal error'}); 
                                  
                            }           
        }

        // Kirim Email ke member yang belum pernah melakukan transaksi
        // Endpoint: /sendNeverOrder
        const sendEmailNeverOrder = async (req, res) => {


        try {

            let data = await neverOrder
            .findAll({
                raw: true,
              });
            return res.status(200).json( data);
           
       
       //  Dummy data
        // let data = [{"email" :"yopy.arnoldy@gmail.com", "fullnm": "Notia Arnoldy"}, 
        // {"email" :"sy.hartanto83@gmail.com", "fullnm": "Tanto Arnoldy"}]
                                 
        

        //                for(let param of data){
      
        //                      await axios.post(url,{
        //                           accessToken : accessToken,
        //                           from :  from,
        //                           to: [param.email],
        //                           labels:["Birthday: "+today],
        //                           subject: "Begini Cara Mudah Atasi Insomnia, Dijamin Tidur Makin Nyeyak!",
        //                            templateId: "5ddcec1d2cd3de68bb660c74"
        //                         })
        //                     };
                  
        //                     return res.status(200).json( {status: 'success', message: 'Email sucesfully sent' }); 

                        } catch (err) {
                                console.log(err);
                                  return res.status(500).json( {status: 'faileds', message: 'internal error'}); 
                                  
                            }         
           
        }


        // Kirim email ke member yang tidak transaksi dalam 1 tahun.
        // Endpoint: /sendYearNeverOrder
        const sendEmail1YearEmailNeverOrder = async (req, res) => {
      
        try {

            let data = await aYearneverOrder
            .findAll({
                raw: true,
              });
            return res.status(200).json( data);
           
       
       //  Dummy data
        // let data = [{"email" :"yopy.arnoldy@gmail.com", "fullnm": "Notia Arnoldy"}, 
        // {"email" :"sy.hartanto83@gmail.com", "fullnm": "Tanto Arnoldy"}]
                                 
        

        //                for(let param of data){
      
        //                      await axios.post(url,{
        //                           accessToken : accessToken,
        //                           from :  from,
        //                           to: [param.email],
        //                           labels:["Birthday: "+today],
        //                           subject: "Begini Cara Mudah Atasi Insomnia, Dijamin Tidur Makin Nyeyak!",
        //                            templateId: "5ddcec1d2cd3de68bb660c74"
        //                         })
        //                     };
                  
        //                     return res.status(200).json( {status: 'success', message: 'Email sucesfully sent' }); 

                        } catch (err) {
                                console.log(err);
                                  return res.status(500).json( {status: 'faileds', message: 'internal error'}); 
                                  
                            }         
           
    }

    //START kirim notif ke api mars jika pengiriman product ke stockist
    const sendNotifToAppsPickupStockist = async (req, res) => {

        let {body} = req;
        let resx = '';
        let resx2 = [];
        // let urls = 'https://api.marsxklink.com/v1/orders/webhook/order-status';
        let urls = 'https://kld-api-stg.k-mart.co.id/v1/orders/webhook/cod-confirmation';
        let params;

        console.log(body);

        if (body.length > 0) {
            for (let i = 0; i < body.length; i++) {
                resx2.push({
                                order_id : body[i].order_id,
                                status : body[i].status,
                            });
                // console.log(body[i].order_id.includes('INV'));
            }
            // resx2 = JSON.stringify(resx2);
            // console.log(resx2);            
            params = resx2;
        }
            
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
                              data : params
                         };
            let response = await axios(config);

            // console.log('response 200 = ' +response);
            if(response.status == 200) {                      
                return res.status(200).json( {status: 'success', message: 'Notification has been sent.' }); 
            } else {   

                return res.status(500).json( {status: 'failed', message: 'internal error'}); 
            }   
            
            return res.status(200).json( {status: 'success', message: 'Notification has been sent.'}); 
          
        }catch (err) {
            console.log(err);
            if (err.response.status == 404){
                return res.status(404).json( {status: 'failed', message: err.response.data}); 

            } else {
                internalError(req, res,err )
            }
           
        }  
    }
    //END kirim notif ke api mars jika pengiriman product ke stockist

    //START kirim notif ke api mars jika pengiriman product ke stockist -- CARA 2
    const sendNotifPickupStockist = async (param) => {

        let body = param;
        // let urls = 'https://api.marsxklink.com/v1/orders/webhook/order-status';
        let urls = 'https://kld-api-stg.k-mart.co.id/v1/orders/webhook/cod-confirmation';
        let params;
        let resx = [];  

        console.log(body);
            
        try {
            // let response = await axios.post(urls, params, {headers: { 'X-Inter-Service-Call': '12qwaszx@321123'}});
            let config = {
                              method: 'post',
                              url: urls,
                              headers: { 
                                        'X-Inter-Service-Call': '12qwaszx@321123', 
                                        'Content-Type': 'application/json'
                                       },
                              data : body
                         };
            console.log("AXIOS MARS = "+config);
            let response = await axios(config);
            return response.data
           
            // resx.push({status: response.status, data : response.data});
            // if(response.status == 200) {                      
            //     return resx;
            // } else {                      
            //     return resx;
            // }             
        }catch (err) {
            console.log(err);
            resx.push({status: err.response.status, data : err.response.data});
            if (err.response.status == 404){                   
                return resx;
            } else {
                internalError(resx, resx,err )
            }
           
        }  
    }
    //END kirim notif ke api mars jika pengiriman product ke stockist CARA -2

    const testHit = async (req, res) => {
        let order = [
      {
        "order_id": "INV-20210428-thb4s",
        "status": "IN_SHIPPING"
      },
      {
        "order_id": "INV-20210428-thb4q",
        "status": "POD"
      },
      {
        "order_id": "INV-20210428-thb4y",
        "status": "RETUR"
      }
    ];
        let test = await sendNotifPickupStockist(order);
        return res.status(200).json( test); 
        console.log('hasil test = ' +test);
    }


    //START kirim notif ke api mars jika COD sudah dilakukan confirm/batal dari konsumen 
    const sendNotifCODCOnfirm = async (param) => {

        let body = param;
        // let urls = 'https://api.marsxklink.com/v1/orders/webhook/cod-confirmation';
        let urls = 'https://kld-api-stg.k-mart.co.id/v1/orders/webhook/cod-confirmation';
        let params;
        let resx = [];  

        console.log(body);
            
        try {
            // let response = await axios.post(urls, params, {headers: { 'X-Inter-Service-Call': '12qwaszx@321123'}});
            let config = {
                              method: 'post',
                              url: urls,
                              headers: { 
                                        'X-Inter-Service-Call': '12qwaszx@321123', 
                                        'Content-Type': 'application/json'
                                       },
                              data : body
                         };
            console.log("AXIOS MARS COD Confirm = "+config);
            let response = await axios(config);
            return response.data
           
            // resx.push({status: response.status, data : response.data});
            // if(response.status == 200) {                      
            //     return resx;
            // } else {                      
            //     return resx;
            // }             
        }catch (err) {
            // console.log(err);
            resx.push({status: err.response.status, data : err.response.data});
            if (err.response.status == 404 || err.response.status == 422){                   
                return resx;
            } else {
                // internalError(resx, resx,err )
                return res.status(409).json( {status: 'error', data: err.response.data}); 
            }
           
        }  
    }
    //END kirim notif ke api mars jika COD sudah dilakukan confirm/batal dari konsumen 

    //START Whatsapp notification by Jatis
    const sendNotifByWA = async(req, res) => {

        // {
        //     "to":"6281807278131",
        //     "recipient_type":"individual",
        //     "type":"template",
        //     "template":{
        //                 "namespace":"510bfb8a_5ea1_4c60_80bf_f8b7f3ce9168",
        //                 "language":{"policy":"deterministic","code":"id"},
        //                 "name":"reply_cod_confirm",
        //                 "components":[{"type":"body","parameters":[
        //                                                             {"type":"text","text":"JHON DOE 02"},
        //                                                             {"type":"text","text":"2021-05-31 19:25:27"},
        //                                                             {"type":"text","text":"INV-210531-FVJNQGM"},
        //                                                             {"type":"text","text":"dikirim ke alamat yang tertera."},
        //                                                             {"type":"text","text":"JHON DOE 02"},
        //                                                             {"type":"text","text":"AKAN DIKIRIM"}
        //                                                           ]
        //                               }]
        //                }
        // }

        let {to, recipient_type, type, template_name, param1, content1, param2, content2, 
             param3, content3, param4, content4, param5, content5, param6, content6} = req.body;
        
        let sequelize = require('../../config/db/ecomm_production.js');
        
        let userid = "KLINKWA", 
            // password = "KLINKWA724",
            // sender = "K-LINK_wa",
            // division = "IT",
            // klink_number = "628111989984",
            // url = "https://messaging.jatismobile.com/index.ashx?",
            // url_send_message = "https://interactive.jatismobile.com/",
            // interactive_username = "klink",
            // interactive_userpwd = "klink876$",
            url_send_media_msg = "https://interactive.jatismobile.com/v1/messages",
            token = "xxx19326107-8c91-4242-a37d-1d1588a885d5";
        
        let sql = "SELECT top 1 * " +
                    " FROM whatsapp_token a " + 
                    " ORDER BY a.expire DESC";
        console.log('mulai');

        let tokenx = await sequelize.query(sql);
        // console.log('tokenx == '+tokenx[0][0].token);
        token = tokenx[0][0].token;

        let params = {
                        'to': to,
                        'recipient_type': recipient_type,
                        'type': type,
                        'template':{
                                    'namespace':'510bfb8a_5ea1_4c60_80bf_f8b7f3ce9168',
                                    'language':{'policy':'deterministic','code':'id'},
                                    'name': template_name, //cod_send_confirmv2
                                    'components':[{'type':'body',
                                                    'parameters':[
                                                                    {'type': param1,'text': content1}, //orderno
                                                                    {'type': param2,'text': content2}, //tgl_transaksi
                                                                    {'type': param3,'text': content3}, //Total bayar
                                                                    {'type': param4,'text': content4}, //COD or NON COD
                                                                    {'type': param5,'text': content5}, //AWB
                                                                    {'type': param6,'text': content6} //Link confirmation
                                                                  ]
                                                  }]
                                   }
                        };
        let resx = [];  

        // console.log(params);
            
        try {
            // console.log('token == '+token);
            // let response = await axios.post(url_send_media_msg, params, {headers: { 'Cache-Control': 'no-cache',
            //                                                                         'Content-Type': 'application/json',
            //                                                                         'Authorization': `Bearer ${token}`}});
            let config = {
                              method: 'post',
                              url: url_send_media_msg,
                              headers: { 
                                        "Cache-Control": "no-cache",
                                        "Content-Type": "application/json",
                                        "Authorization": `Bearer ${token}`
                                       },
                              data : params
                         };
            console.log("config url == " + config.url);
            console.log("config headers == " + config.headers);
            console.log("config data == " + config.data);
            let response = await axios(config);
            console.log("response == " + Object.keys(response.data).length)

            return res.status(200).json( {status: 'success', message: response.data}); 
            // return logSuccess(req, res, 200, { data: data[0] }); 
            
            for (let i = 0; i < response.length; i++) {
                console.log('response ke '+i+' ==== '+response[i]);
            }

            return response.data
           
            // resx.push({status: response.status, data : response.data});
            // if(response.status == 200) {                      
            //     return resx;
            // } else {                      
            //     return resx;
            // }             
        }catch (err) {
            console.log(err);
            resx.push({status: err.response, data : err.response});
            // if (err.response.status == 404){                   
            //     return resx;
            // } else {
                internalError(resx, resx,err )
            // }
           
        }  
    }


    return {
        sendSMS,
        sendEmail,
        testAdd,
        sendEmailBirthday,
        sendEmailNeverOrder,
        sendEmail1YearEmailNeverOrder,
        sendNotifToAppsPickupStockist,
        testHit,
        sendNotifCODCOnfirm,
        sendNotifByWA
    };

};
module.exports = NotificationController;
