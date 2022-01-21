const VoucherMLMData = require('../models/VoucherMLMData');
const VoucherMLMDataBonus = require('../models/VoucherMLMDataBonus');
const VoucherMLMDataGeneral = require('../models/VoucherMLMDataGeneral');

const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');
const { Op } = require('sequelize')
const dateFormat = require('dateformat');
const today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss');


const VoucherMLMCheckControllerNew = () => {

"use strict";
//Detail Check Voucher By Distributor, Voucher No
const getVoucherCheckNew = async (req, res) => {
    const { distributorcode, voucherno } = req.body;
      var mlmDataMemberCheckRet = [];
      var mlmDataBonusVoucherRet = [];
      var mlmDataGeneralVoucherRet = [];
      var retResponse = [];
      let expireddateX = null;
      

      try {

        //Get member data transaction
        let mlmDataMemberCheck = await VoucherMLMData
          .findOne({
            raw: true,
            where: {
              dfno : distributorcode
            },
          });

          let dateFormat = require('dateformat');

          if(mlmDataMemberCheck != "" && mlmDataMemberCheck != null && mlmDataMemberCheck != ''){

            mlmDataMemberCheckRet.push({
                  dfno : mlmDataMemberCheck.dfno, 
                  fullnm : mlmDataMemberCheck.fullnm, 
                  idno : mlmDataMemberCheck.idno, 
                  sfno : mlmDataMemberCheck.sfno, 
                  sfno_reg : mlmDataMemberCheck.sfno_reg, 
                  date_now : dateFormat(new Date(mlmDataMemberCheck.date_now), "yyyy-mm-dd"), 
                  birthdt : dateFormat(new Date(mlmDataMemberCheck.birthdt), "yyyy-mm-dd"), 
                  bd_now : dateFormat(new Date(mlmDataMemberCheck.bd_now), "yyyy-mm-dd"), 
                  bd_exp_date : dateFormat(new Date(mlmDataMemberCheck.bd_exp_date), "yyyy-mm-dd"), 
                  first_trans : mlmDataMemberCheck.first_trans, 
                  last_trans : dateFormat(new Date(mlmDataMemberCheck.last_trans), "yyyy-mm-dd"), 
                  last_trans_orderno : mlmDataMemberCheck.last_trans_orderno, 
                  memb_age : mlmDataMemberCheck.memb_age, 
                  dayfromlatesttrans : mlmDataMemberCheck.dayfromlatesttrans, 
                  yearfromlatesttrans : mlmDataMemberCheck.yearfromlatesttrans, 
                  flag_yearago : mlmDataMemberCheck.flag_yearago
            });
          }else{//if distributor not exist
              return res.status(409).json({err: '409', status : 'failed', message : 'Distributor Code Not founded.'});
          }


          //Voucher Product or Voucher Cash
          let mlmDataBonusVoucher = await VoucherMLMDataBonus
          .findOne({
            raw: true,
            where: {
              DistributorCode : distributorcode, 
              voucherkey : voucherno
            },
            
            order: [
              ['BonusYear', 'ASC'],
              ['BonusMonth', 'ASC'],
              ['vchtype', 'ASC'],
              ['status', 'ASC'],
              ['claimstatus', 'ASC'],
            ],
          });

          //check if mlmDataBonusVoucher is not null
          if(mlmDataBonusVoucher != "" && mlmDataBonusVoucher != null && mlmDataBonusVoucher != ''){
                
                //console.log(mlmDataBonusVoucher);
                mlmDataBonusVoucherRet.push({
                    VoucherNo : mlmDataBonusVoucher.voucherkey, 
                    DistributorCode : mlmDataBonusVoucher.DistributorCode, 
                    IssueDate : dateFormat(new Date(mlmDataBonusVoucher.IssueDate), "yyyy-mm-dd"),
                    BonusMonth : mlmDataBonusVoucher.BonusMonth, 
                    BonusYear : mlmDataBonusVoucher.BonusYear, 
                    ExpireDate : dateFormat(new Date(mlmDataBonusVoucher.ExpireDate), "yyyy-mm-dd"), 
                    VoucherAmt : mlmDataBonusVoucher.VoucherAmt, 
                    VoucherAmtCurr : mlmDataBonusVoucher.VoucherAmtCurr, 
                    CurrencyNote : mlmDataBonusVoucher.CurrencyNote, 
                    createnm : mlmDataBonusVoucher.createnm, 
                    createdt : dateFormat(new Date(mlmDataBonusVoucher.createdt), "yyyy-mm-dd"), 
                    updatenm : mlmDataBonusVoucher.updatenm, 
                    updatedt : dateFormat(new Date(mlmDataBonusVoucher.updatedt), "yyyy-mm-dd"), 
                    voucherkey : mlmDataBonusVoucher.voucherkey, 
                    status : mlmDataBonusVoucher.status, 
                    claimstatus : mlmDataBonusVoucher.claimstatus, 
                    PT_SVRID : mlmDataBonusVoucher.PT_SVRID, 
                    vchtype : mlmDataBonusVoucher.vchtype, 
                    countrycode : mlmDataBonusVoucher.countrycode, 
                    is_print : mlmDataBonusVoucher.is_print, 
                    claim_date : dateFormat(new Date(mlmDataBonusVoucher.claim_date), "yyyy-mm-dd"), 
                    loccd : mlmDataBonusVoucher.loccd, 
                    VoucherAmt_ORI : mlmDataBonusVoucher.VoucherAmt_ORI, 
                    voucherkey_ori : mlmDataBonusVoucher.voucherkey_ori, 
                    remarks : mlmDataBonusVoucher.remarks
                });                
          
              let vdisctype = 'IDR';
              //Check if voucher relevant to Product Voucher
              if(mlmDataBonusVoucher.vchtype == 'P') { //&& 
                 //dateFormat(new Date(today), "yyyymm") <= dateFormat(new Date(mlmDataBonusVoucher.ExpireDate), "yyyymm")){
                  retResponse.push({
                      err: '200',
                      voucherName : 'product voucher',
                      voucherNo : mlmDataBonusVoucher.voucherkey,
                      voucherType : mlmDataBonusVoucher.vchtype,
                      voucherDesc : 'Product Voucher',
                      voucherWithBV : '0',
                      voucherDiscType : vdisctype,
                      voucherRate : mlmDataBonusVoucher.VoucherAmt,
                      voucherStatus : 'active'
                  });
              }
              
              //Check if voucher relevant to Cash Voucher
              if(mlmDataBonusVoucher.vchtype == 'C') { //&& 
                 // dateFormat(new Date(today), "yyyymm") <= dateFormat(new Date(mlmDataBonusVoucher.ExpireDate), "yyyymm")){
                  retResponse.push({
                      err: '200',
                      voucherName : 'cash voucher',
                      voucherNo : mlmDataBonusVoucher.voucherkey,
                      voucherType : mlmDataBonusVoucher.vchtype,
                      voucherDesc : 'Cash Voucher',
                      voucherWithBV : '1',
                      voucherDiscType : vdisctype,
                      voucherRate : mlmDataBonusVoucher.VoucherAmt,
                      voucherStatus : 'active'
                  });
              }

              if(mlmDataBonusVoucher == "" || mlmDataBonusVoucher == null){ //if record not founde at bonus voucher data
                  return res.status(409).json({err: '409', status : 'failed', message : 'Voucher No not founded.'});
              }else{
                  
                  let ExpireDatex = dateFormat(new Date(mlmDataBonusVoucher.ExpireDate), "yyyymm");
                  let todayx = dateFormat(new Date(today), "yyyymm");

                  if (todayx > ExpireDatex){
                      return res.status(409).json({err: '409', status : 'failed', message : 'Voucher No ' + mlmDataBonusVoucher.VoucherNo + ' expired at ' + dateFormat(new Date(ExpireDatex), "yyyy-mm-dd")});
                  }else if(mlmDataBonusVoucher.claimstatus == '1'){ //if voucher already used/claimed
                      return res.status(409).json({err: '409', status : 'failed', message : 'Already used in ' + mlmDataBonusVoucher.loccd + ' at ' + dateFormat(new Date(mlmDataBonusVoucher.claim_date), "yyyy-mm-dd")});
                  }
              }

          }else{
              //Voucher Product or Voucher General
              let mlmDataGeneralVoucher = await VoucherMLMDataGeneral
              .findOne({
                raw: true,
                where: {
                  vstatus : '1',
                  vcode : voucherno
                },
                
              });
              
              //check if mlmDataGeneralVoucher is not null
              if(mlmDataGeneralVoucher != "" && mlmDataGeneralVoucher != null && mlmDataGeneralVoucher != ''){
                      
                      mlmDataGeneralVoucherRet.push({
                          vcode : mlmDataGeneralVoucher.vcode,
                          vdescription : mlmDataGeneralVoucher.vdescription,
                          dfno : mlmDataGeneralVoucher.dfno,
                          fullnm : mlmDataGeneralVoucher.fullnm,
                          vtype : mlmDataGeneralVoucher.vtype,
                          vdisc : mlmDataGeneralVoucher.vdisc,
                          vdiscrate : mlmDataGeneralVoucher.vdiscrate,
                          vstatus : mlmDataGeneralVoucher.vstatus,
                          expireddate : dateFormat(new Date(mlmDataGeneralVoucher.expireddate), "yyyy-mm-dd"), 
                          bv_avaliable : mlmDataGeneralVoucher.bv_avaliable
                      });

                      let vdisctype = 'IDR';

                      let lenVcr = 0;
                      if(mlmDataGeneralVoucherRet.length > 0){
                        lenVcr = mlmDataGeneralVoucherRet.length - 1;
                      }

                      for (var i = 0 ; i <= lenVcr; i++) {

                          if(mlmDataGeneralVoucherRet[i].vdisc == 'PRC'){
                              vdisctype = 'PERCENT';
                          }

                          //Check if voucher relevant to Birthday
                          if(mlmDataMemberCheckRet[0].date_now <= mlmDataMemberCheckRet[0].bd_exp_date && 
                             mlmDataGeneralVoucherRet[i].vtype == '1'){
                              //set response for Birthday voucher
                              retResponse.push({
                              err: '200',
                                  voucherName : 'birthday',
                                  voucherNo : mlmDataGeneralVoucherRet[i].vcode,
                                  voucherType : mlmDataGeneralVoucherRet[i].vtype,
                                  voucherDesc : mlmDataGeneralVoucherRet[i].vdescription,
                                  voucherWithBV : mlmDataGeneralVoucherRet[i].bv_avaliable,
                                  voucherDiscType : vdisctype,
                                  voucherRate : mlmDataGeneralVoucherRet[i].vdiscrate,
                                  voucherStatus : 'active'
                              });

                           //Check if voucher relevant to Reactive for Distributor >=1 Year doesn't have any transaction
                           // }elseif(yearfromlatesttrans > 0 && vtype == '2'){ 
                             }else if(mlmDataMemberCheckRet[0].flag_yearago > 0 && 
                                     mlmDataGeneralVoucherRet[i].vtype == '2'){ 
                               //set response for Reactive voucher
                               retResponse.push({
                               err: '200',
                                   voucherName : 'reactive',
                                   voucherNo : mlmDataGeneralVoucherRet[i].vcode,
                                   voucherType : mlmDataGeneralVoucherRet[i].vtype,
                                   voucherDesc : mlmDataGeneralVoucherRet[i].vdescription,
                                   voucherWithBV : mlmDataGeneralVoucherRet[i].bv_avaliable,
                                   voucherDiscType : vdisctype,
                                   voucherRate : mlmDataGeneralVoucherRet[i].vdiscrate,
                                   voucherStatus : 'active'
                               });

                           //Check if voucher relevant for Distributor 1st time online transaction
                           }else if(mlmDataMemberCheckRet[0].first_trans == '0' && 
                                   mlmDataMemberCheckRet[0].dayfromlatesttrans == 0 && 
                                   mlmDataGeneralVoucherRet[i].vtype == '3'){ 
                               //set response for 1st time online transaction voucher
                               retResponse.push({
                               err: '200',
                                   voucherName : 'first time transaction',
                                   voucherNo : mlmDataGeneralVoucherRet[i].vcode,
                                   voucherType : mlmDataGeneralVoucherRet[i].vtype,
                                   voucherDesc : mlmDataGeneralVoucherRet[i].vdescription,
                                   voucherWithBV : mlmDataGeneralVoucherRet[i].bv_avaliable,
                                   voucherDiscType : vdisctype,
                                   voucherRate : mlmDataGeneralVoucherRet[i].vdiscrate,
                                   voucherStatus : 'active'
                               });
                          }

                      }

                    
              }else{
                  return res.status(409).json({err: '409', status : 'failed', message : 'Voucher No not founded.'});
              }
               
          }

          if(retResponse == ""){ //if record not found at bonus voucher data
              return res.status(409).json({err: '409', status : 'failed', message : 'Voucher No not founded.'});
          }else{
               return res.status(200).json(retResponse[0]); 
          }

      } catch (err) {
        console.log(err);
         return res.status(500).json( { err: '500', status:'failed', message: 'Internal server error' });
      }
 
  };

  //Get List Voucher based on login ID
  const getVoucherListNew = async (req, res) => {
    const { distributorcode , vcrtype} = req.body;
      var mlmDataMemberCheckRet = [];
      var mlmDataBonusVoucherRet = [];
      var mlmDataGeneralVoucherRet = [];
      var voucherName;
      var voucherDesc;
      var voucherWithBV;
      var retResponse = [];
      var resStatus = [];
      let expireddateX = null;
      

      resStatus.push({status : 'failed', message : 'Voucher No not founded.'});

      try {

        //Get member data transaction
        let mlmDataMemberCheck = await VoucherMLMData
          .findOne({
            raw: true,
            where: {
              dfno : distributorcode
            },
          });

          let dateFormat = require('dateformat');

          if(mlmDataMemberCheck != null && mlmDataMemberCheck != "" && mlmDataMemberCheck != '') {
                 mlmDataMemberCheckRet.push({
                    dfno : mlmDataMemberCheck.dfno, 
                    fullnm : mlmDataMemberCheck.fullnm, 
                    idno : mlmDataMemberCheck.idno, 
                    sfno : mlmDataMemberCheck.sfno, 
                    sfno_reg : mlmDataMemberCheck.sfno_reg, 
                    date_now : dateFormat(new Date(mlmDataMemberCheck.date_now), "yyyy-mm-dd"), 
                    birthdt : dateFormat(new Date(mlmDataMemberCheck.birthdt), "yyyy-mm-dd"), 
                    bd_now : dateFormat(new Date(mlmDataMemberCheck.bd_now), "yyyy-mm-dd"), 
                    bd_exp_date : dateFormat(new Date(mlmDataMemberCheck.bd_exp_date), "yyyy-mm-dd"), 
                    first_trans : mlmDataMemberCheck.first_trans, 
                    last_trans : dateFormat(new Date(mlmDataMemberCheck.last_trans), "yyyy-mm-dd"), 
                    last_trans_orderno : mlmDataMemberCheck.last_trans_orderno, 
                    memb_age : mlmDataMemberCheck.memb_age, 
                    dayfromlatesttrans : mlmDataMemberCheck.dayfromlatesttrans, 
                    yearfromlatesttrans : mlmDataMemberCheck.yearfromlatesttrans, 
                    flag_yearago : mlmDataMemberCheck.flag_yearago
              });


              //Voucher Product or Voucher Cash
              
              // todayx.setMonth(todayx.getMonth()+1); 
              // todayx.setDate(todayx.getDate() - (todayx.getDate() - 1)); 
              // //console.log(current.getDate());
               // console.log('vcrtype : ' + vcrtype);
              var mlmDataBonusVoucher;

              if(vcrtype == '' || vcrtype == "" || vcrtype == null){
                  // console.log('masuk if : ' + vcrtype);
                mlmDataBonusVoucher = await VoucherMLMDataBonus
                .findAll({
                  raw: true,
                  where: {
                    DistributorCode : distributorcode, 
                    claimstatus : '0',
                    status : '0',
                    [ Op.or ] : [ {vchtype : 'P'}, {vchtype : 'C'}],
                    ExpireDate : { [ Op.gte ] : today },
                    VoucherAmt : { [ Op.gte ] : 0 }
                    //[Sequelize.fn('YEAR', Sequelize.col('ExpireDate')), yearx]
                  },

                  //attributes: ['DistributorCode', 'voucherno', 'voucherkey', 'vchtype', 'IssueDate', 'ExpireDate', 'status', 'claimstatus'], //object
                  
                  order: [
                    ['BonusYear', 'ASC'],
                    ['BonusMonth', 'ASC'],
                    ['vchtype', 'ASC'],
                    ['status', 'ASC'],
                    ['claimstatus', 'ASC'],
                  ],
                });
              }

              if(vcrtype == '2' || vcrtype == "2"){

                  console.log('masuk 2');

                  //Voucher Product or Voucher General
                  let mlmDataGeneralVoucher = await VoucherMLMDataGeneral
                  .findAll({
                    raw: true,
                    where: {
                      vstatus : '1'
                    },
                    
                  });
                  
                  // console.log(mlmDataGeneralVoucher);

                  let vdisctype = 'IDR';

                  let lenVcr = 0;
                  //check if mlmDataGeneralVoucher is not null
                  if(mlmDataGeneralVoucher != "" && mlmDataGeneralVoucher != null && mlmDataGeneralVoucher != ''){
                         
                         // console.log('mlmDataGeneralVoucher if');

                          if(mlmDataGeneralVoucher.length > 0){
                            lenVcr = mlmDataGeneralVoucher.length - 1;
                          }

                          // console.log('lenVcr = ' + lenVcr);

                          for (var i = 0 ; i <= lenVcr; i++) {

                            //Check if voucher used or not

                            let mlmDataBonusVoucher2 = await VoucherMLMDataBonus
                            .findOne({
                              raw: true,
                              where: {
                                DistributorCode : distributorcode, 
                                voucherno : mlmDataGeneralVoucher[i].vcode
                              },
                              
                            });

                            // console.log(mlmDataBonusVoucher2);
                      
   
                            mlmDataGeneralVoucherRet.push({
                                vcode : mlmDataGeneralVoucher[i].vcode,
                                vdescription : mlmDataGeneralVoucher[i].vdescription,
                                dfno : mlmDataGeneralVoucher[i].dfno,
                                fullnm : mlmDataGeneralVoucher[i].fullnm,
                                vtype : mlmDataGeneralVoucher[i].vtype,
                                vdisc : mlmDataGeneralVoucher[i].vdisc,
                                vdiscrate : mlmDataGeneralVoucher[i].vdiscrate,
                                vstatus : mlmDataGeneralVoucher[i].vstatus,
                                expireddate : dateFormat(new Date(mlmDataGeneralVoucher[i].expireddate), "yyyy-mm-dd"), 
                                bv_avaliable : mlmDataGeneralVoucher[i].bv_avaliable
                            });


                              if(mlmDataGeneralVoucherRet[i].vdisc == 'PRC'){
                                  vdisctype = 'PERCENT';
                              }

                              // //Check if voucher relevant to Birthday
                              // console.log(' = ' + mlmDataMemberCheckRet[0].date_now);
                              // console.log(' = ' + mlmDataMemberCheckRet[0].bd_exp_date);
                              // console.log(' = ' + mlmDataMemberCheckRet[0].flag_yearago);
                              // console.log(' = ' + mlmDataMemberCheckRet[0].first_trans);
                              // console.log(' = ' + mlmDataMemberCheckRet[0].dayfromlatesttrans);
                              // console.log(' = ' + mlmDataGeneralVoucherRet[0].vtype);
                              // console.log(' = ' + mlmDataGeneralVoucherRet[0].bv_avaliable);
                              // console.log(' = ' + mlmDataGeneralVoucherRet[0].date_now);


                              if(mlmDataMemberCheckRet[0].date_now <= mlmDataMemberCheckRet[0].bd_exp_date && 
                                 mlmDataGeneralVoucherRet[i].vtype == '1' &&
                                 // mlmDataGeneralVoucherRet[i].bv_avaliable == vcrtype && //if bv available or cash voucher
                                 (mlmDataBonusVoucher2 == '' || mlmDataBonusVoucher2 == "" || mlmDataBonusVoucher2 == null )){
                                  //set response for Birthday voucher
                                  retResponse.push({
                                      voucherName : 'birthday',
                                      voucherNo : mlmDataGeneralVoucherRet[i].vcode,
                                      voucherKey : mlmDataGeneralVoucherRet[i].vcode,
                                      voucherType : mlmDataGeneralVoucherRet[i].vtype,
                                      voucherDesc : mlmDataGeneralVoucherRet[i].vdescription,
                                      voucherWithBV : mlmDataGeneralVoucherRet[i].bv_avaliable,
                                      voucherDiscType : vdisctype,
                                      voucherRate : mlmDataGeneralVoucherRet[i].vdiscrate,
                                      voucherStatus : 'active'
                                  });

                               //Check if voucher relevant to Reactive for Distributor >=1 Year doesn't have any transaction
                               // }elseif(yearfromlatesttrans > 0 && vtype == '2'){ 
                                 }else if(mlmDataMemberCheckRet[0].flag_yearago > 0 && 
                                          mlmDataGeneralVoucherRet[i].vtype == '2' &&
                                          // mlmDataGeneralVoucherRet[i].bv_avaliable == vcrtype && //if bv available or product voucher voucher
                                      (mlmDataBonusVoucher2 == '' || mlmDataBonusVoucher2 == "" || mlmDataBonusVoucher2 == null )){
                                   //set response for Reactive voucher
                                   retResponse.push({
                                       voucherName : 'reactive',
                                       voucherNo : mlmDataGeneralVoucherRet[i].vcode,
                                       voucherKey : mlmDataGeneralVoucherRet[i].vcode,
                                       voucherType : mlmDataGeneralVoucherRet[i].vtype,
                                       voucherDesc : mlmDataGeneralVoucherRet[i].vdescription,
                                       voucherWithBV : mlmDataGeneralVoucherRet[i].bv_avaliable,
                                       voucherDiscType : vdisctype,
                                       voucherRate : mlmDataGeneralVoucherRet[i].vdiscrate,
                                       voucherStatus : 'active'
                                   });

                               //Check if voucher relevant for Distributor 1st time online transaction
                               }else if(mlmDataMemberCheckRet[0].first_trans == '0' && 
                                        mlmDataMemberCheckRet[0].dayfromlatesttrans == 0 && 
                                        mlmDataGeneralVoucherRet[i].vtype == '3' &&
                                        // mlmDataGeneralVoucherRet[i].bv_avaliable == vcrtype && //if bv available or product voucher
                                    (mlmDataBonusVoucher2 == '' || mlmDataBonusVoucher2 == "" || mlmDataBonusVoucher2 == null )){
                                   //set response for 1st time online transaction voucher
                                   retResponse.push({
                                       voucherName : '1st time transaction',
                                       voucherNo : mlmDataGeneralVoucherRet[i].vcode,
                                       voucherKey : mlmDataGeneralVoucherRet[i].vcode,
                                       voucherType : mlmDataGeneralVoucherRet[i].vtype,
                                       voucherDesc : mlmDataGeneralVoucherRet[i].vdescription,
                                       voucherWithBV : mlmDataGeneralVoucherRet[i].bv_avaliable,
                                       voucherDiscType : vdisctype,
                                       voucherRate : mlmDataGeneralVoucherRet[i].vdiscrate,
                                       voucherStatus : 'active'
                                   });
                              }

                          }

                        
                    }else{
                        return res.status(409).json({err: '409', status : 'failed', message : 'Voucher not founded.'});
                        // return res.status(409).json({err: '409', resStatus});
                    }

              }

              if(vcrtype == '1' || vcrtype == "1"){
                   // console.log('masuk else : ' + vcrtype);
                   mlmDataBonusVoucher = await VoucherMLMDataBonus
                .findAll({
                  raw: true,
                  where: {
                    DistributorCode : distributorcode, 
                    claimstatus : '0',
                    status : '0',
                    vchtype : 'C',
                    ExpireDate : { [ Op.gte ] : today },
                    VoucherAmt : { [ Op.gte ] : 0 }
                    //[Sequelize.fn('YEAR', Sequelize.col('ExpireDate')), yearx]
                  },

                  //attributes: ['DistributorCode', 'voucherno', 'voucherkey', 'vchtype', 'IssueDate', 'ExpireDate', 'status', 'claimstatus'], //object
                  
                  order: [
                    ['BonusYear', 'ASC'],
                    ['BonusMonth', 'ASC'],
                    ['vchtype', 'ASC'],
                    ['status', 'ASC'],
                    ['claimstatus', 'ASC'],
                  ],
                });
              }else if(vcrtype == '0' || vcrtype == "0"){
                   // console.log('masuk else : ' + vcrtype);
                   mlmDataBonusVoucher = await VoucherMLMDataBonus
                .findAll({
                  raw: true,
                  where: {
                    DistributorCode : distributorcode, 
                    claimstatus : '0',
                    status : '0',
                    vchtype : 'P',
                    ExpireDate : { [ Op.gte ] : today },
                    VoucherAmt : { [ Op.gt ] : 0 }
                    //[Sequelize.fn('YEAR', Sequelize.col('ExpireDate')), yearx]
                  },

                 // attributes: ['DistributorCode', 'voucherno', 'voucherkey', 'vchtype', 'IssueDate', 'ExpireDate', 'status', 'claimstatus'], //object
                  
                  order: [
                    ['BonusYear', 'ASC'],
                    ['BonusMonth', 'ASC'],
                    ['vchtype', 'ASC'],
                    ['status', 'ASC'],
                    ['claimstatus', 'ASC'],
                  ],
                });
              }
              

              //check if mlmDataBonusVoucher is not null
              if(mlmDataBonusVoucher != "" && mlmDataBonusVoucher != null && mlmDataBonusVoucher != ''){
                                    
                  for (var i = 0; i < mlmDataBonusVoucher.length ; i++) {
                    
                      mlmDataBonusVoucherRet.push({
                          VoucherNo : mlmDataBonusVoucher[i].VoucherNo, 
                          DistributorCode : mlmDataBonusVoucher[i].DistributorCode, 
                          IssueDate : dateFormat(new Date(mlmDataBonusVoucher[i].IssueDate), "yyyy-mm-dd"),
                          BonusMonth : mlmDataBonusVoucher[i].BonusMonth, 
                          BonusYear : mlmDataBonusVoucher[i].BonusYear, 
                          ExpireDate : dateFormat(new Date(mlmDataBonusVoucher[i].ExpireDate), "yyyy-mm-dd"), 
                          VoucherAmt : mlmDataBonusVoucher[i].VoucherAmt, 
                          VoucherAmtCurr : mlmDataBonusVoucher[i].VoucherAmtCurr, 
                          CurrencyNote : mlmDataBonusVoucher[i].CurrencyNote, 
                          createnm : mlmDataBonusVoucher[i].createnm, 
                          createdt : dateFormat(new Date(mlmDataBonusVoucher[i].createdt), "yyyy-mm-dd"), 
                          updatenm : mlmDataBonusVoucher[i].updatenm, 
                          updatedt : dateFormat(new Date(mlmDataBonusVoucher[i].updatedt), "yyyy-mm-dd"), 
                          voucherkey : mlmDataBonusVoucher[i].voucherkey, 
                          status : mlmDataBonusVoucher[i].status, 
                          claimstatus : mlmDataBonusVoucher[i].claimstatus, 
                          PT_SVRID : mlmDataBonusVoucher[i].PT_SVRID, 
                          vchtype : mlmDataBonusVoucher[i].vchtype, 
                          countrycode : mlmDataBonusVoucher[i].countrycode, 
                          is_print : mlmDataBonusVoucher[i].is_print, 
                          claim_date : dateFormat(new Date(mlmDataBonusVoucher[i].claim_date), "yyyy-mm-dd"), 
                          loccd : mlmDataBonusVoucher[i].loccd, 
                          VoucherAmt_ORI : mlmDataBonusVoucher[i].VoucherAmt_ORI, 
                          voucherkey_ori : mlmDataBonusVoucher[i].voucherkey_ori, 
                          remarks : mlmDataBonusVoucher[i].remarks
                      });     
                    
                    let vdisctype = 'IDR';
                    //Check if voucher relevant to Product Voucher or Cash Voucher
                    if(mlmDataBonusVoucher[i].vchtype == 'P' || mlmDataBonusVoucher[i].vchtype == 'C'){
                       
                        if(mlmDataBonusVoucher[i].vchtype == 'P'){
                            voucherName = 'product voucher';
                            voucherDesc = 'Product Voucher';
                            voucherWithBV = '0';
                        }else if(mlmDataBonusVoucher[i].vchtype == 'C'){
                            voucherName = 'cash voucher';
                            voucherDesc = 'Cash Voucher';
                            voucherWithBV = '1';
                        }
                        retResponse.push({
                            voucherName : voucherName,
                            voucherNo : mlmDataBonusVoucher[i].VoucherNo,
                            voucherKey : mlmDataBonusVoucher[i].voucherkey,
                            voucherType : mlmDataBonusVoucher[i].vchtype,
                            voucherDesc : voucherDesc,
                            voucherWithBV : voucherWithBV,
                            voucherDiscType : vdisctype,
                            voucherRate : mlmDataBonusVoucher[i].VoucherAmt,
                            voucherStatus : 'active'
                        });
                    }
                  }

               }


                  
              // }else if(mlmDataBonusVoucher == "" || mlmDataBonusVoucher == null){ //if record not founde at bonus voucher data
              //         return res.status(409).json({err: '409', status : 'failed', message : 'Voucher No not founded.'});
              //         // return res.status(409).json({err: '409', resStatus});
              // }

              if(retResponse == ""){ //if record not found at bonus voucher data
                  return res.status(409).json({err: '409', status : 'failed', message : 'Voucher No not founded.'});
                  // return res.status(409).json({err: '409', resStatus});
              }else{
                   return res.status(200).json({err: '200', retResponse}); 
              }
            }else if(mlmDataMemberCheck == null || mlmDataMemberCheck == "" || mlmDataMemberCheck == '') {
              // let resStatus = [];
              // resStatus.push({err: '409', status : 'failed', message : 'Invalid Distributor Code.'});
             //   return res.status(409).json(resStatus);
                return res.status(409).json({err: '409', status : 'failed', message : 'Invalid Distributor Code'});
            }
         

      } catch (err) {
          console.log(err);
          let dateFormat = require('dateformat');
          let todayx = dateFormat(new Date(today), "yyyy-mm-dd");
          // console.log(today);
          // resStatus = null;
          // resStatus.push({status : 'failed', message : 'Internal server error.'}); 
          return res.status(500).json( { err: '500', status:'failed', message: todayx + ' Internal server error' });
          // return res.status(500).json({err: '500', retResponse});
      }
 
  };



  //Update Voucher based on login ID
  const updateByVoucherNoNew = async (req, res) => {
    const { body } = req;
      var detVoucher = [];
      var detVouchera = [];
      var mlmDataMemberCheckRet = [];
      var mlmDataBonusVoucherRet = [];
      var mlmDataGeneralVoucherRet = [];
      var voucherName;
      var voucherDesc;
      var voucherWithBV;
      var retResponse = [];
      var vouchernoBulk = [];

      var claimstatusy;
      var statusy;
      var claimstatuswhere;
      var statuswhere;

      let expireddateX = null;
     

      // resStatus.push({status : 'failed', message : 'Voucher No not founded.'});
      

      let typeUpdate = body.typeUpdate; //u = update/insert, d = delete/cancel transaction and voucher
      if(typeUpdate == "u"){ //u = update/insert
        claimstatusy = '1';
        statusy = '1';
        claimstatuswhere = '0';
        statuswhere = '0';
      }else if(typeUpdate == "d"){ //d = delete/cancel transaction and voucher
        claimstatusy = '0';
        statusy = '0';
        claimstatuswhere = '1';
        statuswhere = '1';
      }


      let lenVcr = 0;
      if(body.detVoucher.length > 0){
        lenVcr = body.detVoucher.length - 1;
      }

      for(let j = 0; j <= lenVcr; j++){ //detail product
            let detail = body.detVoucher[j];
            detVoucher[j] = detail.voucherno;
      }
      
      

      let transaction;  

      //Check to tcvoucher
      let mlmDataBonusVoucher = await VoucherMLMDataBonus
      .findAll({
        raw: true,
        where: {
          DistributorCode : body.distributorcode, 
          voucherno : { [ Op.in ] : detVoucher },
          claimstatus : claimstatuswhere, //'0',
          status : claimstatuswhere //'0'
        },
        attributes: ['DistributorCode', 'voucherno', 'voucherkey', 'vchtype', 'IssueDate', 'ExpireDate', 'status', 'claimstatus'], //object
      });

      //Check to general voucher
      let mlmDataGeneralVoucher = await VoucherMLMDataGeneral
      .findAll({
        raw: true,
        where: {
          vstatus : '1',
          vcode : { [ Op.in ] : detVoucher }
        },
        
      });

      let lenMLMDataBonusVoucher = 0;
      let lenMLMDataGeneralVoucher = 0;

      let vcOnline = 0;
      for (var i = 0; i < mlmDataGeneralVoucher.length; i++) {
        if (mlmDataGeneralVoucher[i].vchtype == '0'){
            vcOnline = vcOnline + 1;
        }
      }

      if(mlmDataBonusVoucher != null || mlmDataBonusVoucher.length > 0){
          lenMLMDataBonusVoucher = mlmDataBonusVoucher.length;
      }

      if(mlmDataGeneralVoucher != null || mlmDataGeneralVoucher.length > 0){
          lenMLMDataGeneralVoucher = mlmDataGeneralVoucher.length;
      }


      console.log('lenMLMDataBonusVoucher = ' + mlmDataBonusVoucher.length);
      console.log('lenMLMDataGeneralVoucher = ' +  mlmDataGeneralVoucher.length);

      let lenVoucher = 0;
      if(typeUpdate == "u"){
          lenVoucher = lenMLMDataBonusVoucher + lenMLMDataGeneralVoucher;
      }else if(typeUpdate == "d"){
          lenVoucher = lenMLMDataBonusVoucher + lenMLMDataGeneralVoucher;
      }

      console.log('lenVoucher = ' + lenVoucher);
      console.log('lenVcr = ' + lenVcr);
      console.log('length = ' + body.detVoucher.length);

      if(mlmDataBonusVoucher != null || mlmDataGeneralVoucher != null){
        console.log('masuk sini 1 ');
          
         // if(lenVoucher == body.detVoucher.length){ // if total voucher input equal with total voucher check, then execute
            if(lenVoucher > 0){
                console.log('masuk sini 2');

                //check if mlmDataBonusVoucher is not null IN
                if((mlmDataBonusVoucher != null || mlmDataGeneralVoucher != null) && 
                    body.detVoucher.length == lenVoucher && typeUpdate == "u"){

                    console.log('masuk sini 3 ');

                        //if exist then update status & claimstatus
                        if(mlmDataBonusVoucher != null){
                                console.log('masuk sini 4-update');

                                transaction = await sequelize.transaction();
                                await VoucherMLMDataBonus.update({
                                                                    status: statusy,
                                                                    claimstatus : claimstatusy,
                                                                    updatenm : body.distributorcode,
                                                                    updatedt : today,
                                                                    claim_date : today,
                                                                    loccd : 'K-Net',
                                                                }, {
                                                                    where: {
                                                                             DistributorCode : body.distributorcode,
                                                                             voucherno : { [ Op.in ] : detVoucher }
                                                                              }, 
                                                                });

                            if(mlmDataGeneralVoucher != null) {
                                // console.log(mlmDataGeneralVoucher);
                                //if exist then update status & claimstatus
                                // let transaction = await sequelize.transaction();
                                 try {

                                        for(let j = 0; j < mlmDataGeneralVoucher.length; j++){ //detail voucher
                                              //detVoucher = null;
                                               detVouchera.push({
                                                    DistributorCode : body.distributorcode,
                                                    VoucherNo : mlmDataGeneralVoucher[j].vcode,
                                                    IssueDate : today,
                                                    BonusMonth : '0',
                                                    BonusYear : '0',
                                                    ExpireDate : today,
                                                    VoucherAmt : 0,
                                                    VoucherAmtCurr :0,
                                                    CurrencyNote : 'IDR',
                                                    createnm : 'online voucherno',
                                                    createdt : today,
                                                    updatenm : body.distributorcode,
                                                    updatedt : today,
                                                    voucherkey : mlmDataGeneralVoucher[j].vcode,
                                                    status : statusy, //'1',
                                                    claimstatus : claimstatusy, //'1',
                                                    vchtype : 'O',
                                                    countrycode : 'ID',
                                                    is_print : '1',
                                                    claim_date : today,
                                                    loccd : 'k-net',
                                                    VoucherAmt_ORI : '0',
                                                    voucherkey_ori : mlmDataGeneralVoucher[j].vcode,
                                                    remarks : mlmDataGeneralVoucher[j].vdescription,
                                              });
                                        }
                                           await VoucherMLMDataBonus.bulkCreate(
                                              //insert to table tcvoucher
                                                detVouchera
                                                , { validate: true }, {transaction} );

                                          await transaction.commit(); 
                                          
                                          return res.status(200).json({ status:'success' });

                                  } catch (err) {
                                      await transaction.rollback();

                                      if(err.name == 'SequelizeUniqueConstraintError'){
                                          return res.status(409).json({ err : '409', status: 'conflict', message: 'Some Vocuher No is already used' });
                                      }else if(err.name == 'AggregateError'){
                                          return res.status(409).json({ err : '409', status: 'conflict', message: err[0].errors.errors[0].message} );
                                      }else{
                                          return res.status(500).json({ err : '500', status: 'failed', message: 'Internal server error' });
                                      }
                                  }
                        }
                    }
              
              }else if((mlmDataBonusVoucher != null || mlmDataGeneralVoucher != null) && typeUpdate == "d"){
                
                      try {

                            transaction = await sequelize.transaction();
                           let update = await VoucherMLMDataBonus.update({
                                                                  status: statusy,
                                                                  claimstatus : claimstatusy,
                                                                  updatenm : body.distributorcode,
                                                                  updatedt : today,
                                                                  claim_date : today,
                                                              }, {
                                                                  where: {
                                                                           DistributorCode : body.distributorcode,
                                                                           voucherno : { [ Op.in ] : detVoucher }
                                                                            },
                                                                  returning: true,
                                                                  plain: true,
                                                              }, {transaction} );

                            // VoucherMLMDataBonus.destroy({
                            //         where: {
                            //             DistributorCode : body.distributorcode,
                            //             voucherno : { [ Op.in ] : detVoucher },
                            //             vchtype : 'O' //only for online voucher will deleted
                            //         }
                            // }, {transaction} ).then(function(rowDeleted){ // rowDeleted will return number of rows deleted
                            //     if(rowDeleted > 0){
                            //       // console.log(err);
                            //        console.log('Deleted successfully');
                            //      }
                            //   }, function(err){
                            //       console.log(err); 
                            //   });
                            let deletedata = VoucherMLMDataBonus.destroy({
                                    where: {
                                        DistributorCode : body.distributorcode,
                                        voucherno : { [ Op.in ] : detVoucher },
                                        vchtype : 'O' //only for online voucher will deleted
                                    },
                                    returning: true,
                                    plain: true,
                            }, {transaction} )

                            // console.log(today)
                                await transaction.commit(); 
                                // if(x == lenVoucher){
                                return res.status(200).json({ err : '200', status: 'success', message: 'Update data success.', update, deletedata});
                                // }
                            
                        }catch (err) {
                          console.log(err);
                              await transaction.rollback();

                              // if(err.name == 'SequelizeUniqueConstraintError'){
                              //     return res.status(409).json({ err : '409', status: 'conflict', message: 'Some Vocuher No cannot be deleted' });
                              // }else if(err.name == 'AggregateError'){
                              //     return res.status(409).json({ err : '409', status: 'conflict', message: err[0].errors.errors[0].message} );
                              // }else{
                                  return res.status(500).json({ err : '500', status: 'failed', message: 'Internal server error' });
                            
                        }
                      // }
                  // }
              }else{
                    return res.status(409).json({ err : '409', status: 'conflict', message: 'Some Vocuher No already used.' });
              }
          }else{
              return res.status(409).json({ err : '409', status: 'conflict', message: 'Voucher not founded' });
          }
      }

  };



  //Update Voucher based on login ID
  const updateByVoucherKeyNew = async (req, res) => {
    const { body } = req;
      var detVoucherKey = [];
      var detVoucher = [];
      var detVouchera = [];
      var mlmDataMemberCheckRet = [];
      var mlmDataBonusVoucherRet = [];
      var mlmDataGeneralVoucherRet = [];
      var voucherName;
      var voucherDesc;
      var voucherWithBV;
      var retResponse = [];

      var claimstatusy;
      var statusy;
      var claimstatuswhere;
      var statuswhere;

      let expireddateX = null;
     

      // resStatus.push({status : 'failed', message : 'Voucher No not founded.'});
      let dateFormat = require('dateformat');

      let typeUpdate = body.typeUpdate; //u = update/insert, d = delete/cancel transaction and voucher
      if(typeUpdate == "u"){ //u = update/insert
        claimstatusy = '1';
        statusy = '1';
        claimstatuswhere = '0';
        statuswhere = '0';
      }else if(typeUpdate == "d"){ //d = delete/cancel transaction and voucher
        claimstatusy = '0';
        statusy = '0';
        claimstatuswhere = '1';
        statuswhere = '1';
      }


      let lenVcr = 0;
      if(body.detVoucher.length > 0){
        lenVcr = body.detVoucher.length - 1;
      }

      for(let j = 0; j <= lenVcr; j++){ //detail product
            let detail = body.detVoucher[j];
            detVoucher[j] = detail.voucherkey;
      }
      
      

      let transaction;  

      //Check to tcvoucher
      let mlmDataBonusVoucher = await VoucherMLMDataBonus
      .findAll({
        raw: true,
        where: {
          DistributorCode : body.distributorcode, 
          voucherkey : { [ Op.in ] : detVoucher },
          claimstatus : claimstatuswhere, //'0',
          status : claimstatuswhere //'0'
        },
        
      });

      //Check to general voucher
      let mlmDataGeneralVoucher = await VoucherMLMDataGeneral
      .findAll({
        raw: true,
        where: {
          vstatus : '1',
          vcode : { [ Op.in ] : detVoucher }
        },
        
      });

      let lenMLMDataBonusVoucher = 0;
      let lenMLMDataGeneralVoucher = 0;
      if(mlmDataBonusVoucher != null || mlmDataBonusVoucher.length > 0){
          lenMLMDataBonusVoucher = mlmDataBonusVoucher.length;
      }

      if(mlmDataGeneralVoucher != null || mlmDataGeneralVoucher.length > 0){
          lenMLMDataGeneralVoucher = mlmDataGeneralVoucher.length;
      }


      let lenVoucher = lenMLMDataBonusVoucher + lenMLMDataGeneralVoucher;

      console.log('lenMLMDataBonusVoucher = ' + lenMLMDataBonusVoucher);
      console.log('lenMLMDataGeneralVoucher = ' + lenMLMDataGeneralVoucher);
      console.log('lenVoucher = ' + lenVoucher);
      console.log('lenVcr = ' + lenVcr);
      console.log('length = ' + body.detVoucher.length);
      console.log(mlmDataBonusVoucher);
      console.log(mlmDataGeneralVoucher);

      if(mlmDataBonusVoucher != null || mlmDataGeneralVoucher != null){
        console.log('masuk sini 1 ');
          
         // if(lenVoucher == body.detVoucherKey.length){ // if total voucher input equal with total voucher check, then execute
            if(lenVoucher > 0){
                console.log('masuk sini 2');

                //check if mlmDataBonusVoucher is not null IN
                if((mlmDataBonusVoucher != null || mlmDataGeneralVoucher != null) && body.detVoucher.length == lenVoucher){
                    console.log('masuk sini 3 ');

                    for (let x = 0; x <= lenVoucher; x++) {

                      // console.log(x);
                      let detail2 = body.detVoucher;
                      // console.log(detail2);
                        console.log('detail2 ' + x + ' -- ' + detail2[x].detVoucher);
                       //Check to tcvoucher
                        let mlmDataBonusVoucher2 = await VoucherMLMDataBonus
                        .findOne({
                          raw: true,
                          where: {
                            DistributorCode : body.distributorcode, 
                            voucherkey : detail2[x].voucherkey,
                            claimstatus : claimstatuswhere, //'0',
                            status : claimstatuswhere //'0'
                          },
                          
                        });

                        //if exist then update status & claimstatus
                        if(mlmDataBonusVoucher2 != null){
                            console.log('masuk sini 4-update');
                            transaction = await sequelize.transaction();
                            await VoucherMLMDataBonus.update({
                                                                  status: statusy,
                                                                  claimstatus : claimstatusy,
                                                                  updatenm : body.distributorcode,
                                                                  updatedt : today,
                                                                  claim_date : today,
                                                              }, {
                                                                  where: {
                                                                           DistributorCode : body.distributorcode,
                                                                           voucherkey : detail2[x].voucherkey
                                                                            }, 
                                                              });
                            if(x == lenVoucher){
                                return res.status(200).json({ err : '200', status:'success', msg: 'Voucher No = ' + detail2[x].voucherkey + ' updated successfully.'});
                            }
                        }else{

                            console.log('masuk sini 5-insert ' + detail2[x].voucherkey);
                             //Check to general voucher
                            let VoucherMLMDataBonus2 = await VoucherMLMDataBonus
                            .findOne({
                              raw: true,
                              where: {
                                status : statuswhere, //'1',
                                claimstatus : claimstatuswhere, //'1',
                                voucherkey : detail2[x].voucherkey
                              },
                              
                            });

                            if(VoucherMLMDataBonus2 == null && typeUpdate == 'u') {
                                //if exist then update status & claimstatus
                                let transaction = await sequelize.transaction();
                                 try {
                                        //detVoucherKey = null;
                                         detVouchera.push({
                                              DistributorCode : body.distributorcode,
                                              VoucherNo : detail2[x].voucherkey,
                                              IssueDate : today,
                                              BonusMonth : '0',
                                              BonusYear : '0',
                                              ExpireDate : today,
                                              VoucherAmt : 0,
                                              VoucherAmtCurr :0,
                                              CurrencyNote : 'IDR',
                                              createnm : 'online voucherno',
                                              createdt : today,
                                              updatenm : body.distributorcode,
                                              updatedt : today,
                                              voucherkey : detail2[x].voucherkey,
                                              status : statusy, //'1',
                                              claimstatus : claimstatusy, //'1',
                                              vchtype : 'O',
                                              countrycode : 'ID',
                                              is_print : '1',
                                              claim_date : today,
                                              loccd : 'k-net',
                                              VoucherAmt_ORI : '0',
                                              voucherkey_ori : detail2[x].voucherno,
                                              remarks : 'Voucher dari promo k-net',
                                        });

                                          // console.log('PERSIAPAN');
                                          // console.log(detVouchera);
                                           await VoucherMLMDataBonus.bulkCreate(
                                              //insert to table tcvoucher
                                                detVouchera
                                                , { validate: true }, {transaction} );

                                          await transaction.commit(); 
                                          
                                          return res.status(200).json({ status:'success' });

                                  } catch (err) {
                                      await transaction.rollback();

                                      if(err.name == 'SequelizeUniqueConstraintError'){
                                          return res.status(409).json({ err : '409', status: 'conflict', message: 'Vocuher No ' + detail2[x].voucherkey + 'is already used' });
                                      }else if(err.name == 'AggregateError'){
                                          return res.status(409).json({ err : '409', status: 'conflict', message: err[0].errors.errors[0].message} );
                                      }else{
                                          return res.status(500).json({ err : '500', status: 'failed', message: 'Internal server error' });
                                      }
                                  }
                              }
                        }
                    }
              
              }else{
                    return res.status(409).json({ err : '409', status: 'conflict', message: 'Some Vocuher No already used or invalid' });
              }
          }else{
              return res.status(409).json({ err : '409', status: 'conflict', message: 'Voucher not founded' });
          }
      }

  };



  return {
    getVoucherCheckNew,
    getVoucherListNew,
    updateByVoucherNoNew,
    updateByVoucherKeyNew
  };
};

module.exports = VoucherMLMCheckControllerNew;
