const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const qs = require('qs')
const axios = require('axios');
const memberNewRegis = require('../models/MemberNewRegis');
const {internalError, logSuccess, logError, logEmail} = require('../services/logger');


const EmailAwsController = () => {

// Kirim email dengan attachement, 
// current use: kirim request pickup, add here...
  const sendEmail = async (req, res) => {
      
      aws.config.loadFromPath('./config/aws.json');
      let {to, cc, bcc, subject, message, filename, path} = req.body;

      if (to, subject, message, filename, path){
      
        let transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01'
            })
        });
        console.log(req.body);
        transporter.sendMail({
            from: 'tasya@k-link.co.id',
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            text: message,
            attachments: [{   
                              filename: filename,
                              path: path
                          }],
        }, (err, info) => {
            if (err) {
              console.log(err);
              return res.status(500).json();
            } else {
              console.log(info)
              return res.status(200).json(info.envelope);
            }  
           });
      } else
      {
        return res.status(500).json({msg: 'internal server error'});
    }

};

const sendAwsEmail = async (req, res) => {

  let {to, from ,subject, content} = req.body;

     const transport = nodemailer.createTransport({ 
        host: "email-smtp.us-east-1.amazonaws.com", 
        secureConnection: true, 
        port: 465, 
        auth: {
            user: "AKIA6KIKJIAXZRD3ATPV", 
            pass: "BK+PXVb51/ZfFEBdx+yp2Ydu83tIbUH3fVbWANboUsRD" 
        }
    });
   
      const mailOptions = {
        from:from, 
        to: to,
        subject: subject,
        html: content
    };
    transport.sendMail(mailOptions, function(error, response){
            if(error){
              console.log(error)
               return res.status(400).json( {status: 'failed', message: 'not delivered'});
            }else{
               return res.status(200).json( {status: 'success', message: 'delivered'}); 
            }
            transport.close(); 
        });
   
  }



const sendingEmail = async (req, res) => {
      
      aws.config.loadFromPath('./config/aws.json');
      let {to, from ,subject, content} = req.body;

      if (to, subject, content){
      
        let transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01'
            })
        });

        transporter.sendMail({
            from: from,
            to: to,
            subject: subject,
            html: content,
        
        }, (err, info) => {
            if (err) {
              console.log(err)
              logEmail(req,req.body, 'gagal', err)
              return res.status(400).json( {status: 'failed', message: 'not delivered'});
            } else {
             logEmail(req,req.body, 'sukses', info.envelope)
              return res.status(200).json( {status: 'success', message: 'delivered'});     
            }  
           });
      } else
      {
        return res.status(500).json({status: 'failed', message: 'internal server error'});
    }

};

  // Tambahkan email ke list email di ses.k-link.dev (newsletter) trigger via Cron
      const addEmail = async (req, res) => {
        let dateFormat = require('dateformat');
        let list = 'GXl7UJJWn5bto9SShrLg1w';
        let {api_key} = req.body;

        try {
         let data = await memberNewRegis
            .findAll({
                raw: true,
              });
                   
                                for(let param of data){
                                 let date =  dateFormat(param.birthdt,'mm/dd/yyyy');                              
                                  let ses = await axios({
                                          method: 'post',
                                          url: 'https://ses.k-link.dev/subscribe',
                                          data: qs.stringify({
                                            api_key: api_key,
                                            name: param.fullnm,
                                            email: param.email,
                                            list : list,
                                            birthDate: date
                                          }),
                                          headers: {
                                            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
                                          }
                                        })    
             
                                        }                      
                        
                                logEmail(req,data, 'sukses')
                                return res.status(200).json( {status: 'success', message: 'delivered'});

                              } catch (err) {
                                      console.log(err);
                                        return res.status(500).json( {status: 'faileds', message: 'internal error'}); 
                                        
                                  }                          
          };

return {
    sendEmail,
    addEmail,
    sendingEmail,
    sendAwsEmail
  };

};
module.exports = EmailAwsController;