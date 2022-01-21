const PersonalTransQueryHdr = require('../models/PersonalTransQueryHdr');
const PersonalTransQueryDet = require('../models/PersonalTransQueryDet');
const { Op } = require('sequelize')

// const sequelizeMlm2010 = require('../../config/klink_mlm2010.js');

const PersonalTransController = () => {

"use strict";  
const transHeaderByPeriod = async (req, res) => {
  let { body } = req;

    var searchParam = null;

    // console.log(body);

    if(body.dfno && body.searchType){

       try {       
          // transType
            var data;

            let xwhere;
           if(body.searchType == '0'){ //based on bonus transaction date
              // console.log('masuk 0 = ' + body.searchType);
               xwhere ={dfno : body.dfno, transdt : { [Op.between]: [body.datefrom, body.dateto] }};

            } else if(body.searchType == '1'){ //based on bonus period
                xwhere = {dfno : body.dfno, bnsperiod :  body.bnsperiod};
            }

            data = await PersonalTransQueryHdr
               .findAll({
                  where: xwhere,
                });

          // console.log(data)  
          if(data == "" || data == null || data == '' ){
              return res.status(400).json({ status: 'failed', message: 'Cannot find transaction for ' + body.dfno});
          }else{
              return res.status(200).json({status:'success ', data });     
          }

        } catch (err) {
            console.log(err);
            return res.status(500).json({ status:'failed', message: 'Internal server error' });
        }

    }


};







  //   if (body) {
  //     try {       
  //       const data = await Login
  //         .findAll({
  //           where: {
  //             dfno,
  //             password
  //           },
  //         });

  //       if (!data) {
  //         return res.status(400).json({ status: 'failed', message: 'Invalid username or password' });
  //       }
  //       return res.status(200).json({status:'success ', data });     
  //     } catch (err) {
  //       return res.status(500).json({ status:'failed', message: 'Internal server error' });
  //     }
  //   }
  //       return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  // };


  // const test = async (req, res) => {
  //   const { firstname } = req.body;

   
  //     try {
  //       const data = await Test
  //         .findOne({
  //           where: {
  //             firstname,
  //           },
  //         });

  //       if (!data) {
  //         return res.status(400).json({ status: 'failed', message: 'Invalid Username' });
  //       }
  //       return res.status(200).json({status: 'success ', data });     
  //     } catch (err) {
  //       console.log(err);
        
  //        return res.status(500).json({ status:'failed', message: 'Internal server error' });
  //     }
 
  // };

  // const getUser = async (req, res) => {
  //   const { dfno } = req.body;

   
  //     try {
  //       const data = await Login
  //         .findOne({
  //           where: {
  //             dfno,
  //           },
  //         });

  //       if (!data) {
  //         return res.status(400).json({ status: 'failed', message: 'Invalid Username' });
  //       }
  //       return res.status(200).json({status: 'success ', data });     
  //     } catch (err) {
  //       console.log(err);
        
  //        return res.status(500).json({ status:'failed', message: 'Internal server error' });
  //     }
 
  // };

  // const checkJaringan = async (req, res) => {
  //   const { dfno, login } = req.body;

   
  //     try {

  //      let data = await sequelizeMlm2010.query('SP_HILAL_WEB_CHECKUPLINE  :dfno, :login', 
  //        { 
  //          replacements: 
  //          { 
  //              dfno: dfno, 
  //              login : login
  //          }
  //        });
       
  //      let data1 = Object.assign({}, data[0]);  
  //       // logger.info(data1[0], req.body);
 
  //       if (!data) {
  //         return res.status(400).json({ status: 'failed', message: 'Invalid Username' });
  //       }
  //       return res.status(200).json(data1[0] );     
  //     } catch (err) {
        
  //        return res.status(500).json({ status:'failed', message: 'Internal server error' });
  //     }
 
  // };



  return {
    transHeaderByPeriod,
  };

};
module.exports = PersonalTransController;