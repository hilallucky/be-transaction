const VoucherMLMData = require('../models/VoucherMLMData');
const VoucherMLMDataBonus = require('../models/VoucherMLMDataBonus');
const VoucherMLMDataGeneral = require('../models/VoucherMLMDataGeneral');

const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');


const MLMDataMemberCheckController = () => {

"use strict";
//Detail Check Voucher By Distributor, Voucher No
const getVoucherCheck = async (req, res) => {
    const { distributorcode, voucherno } = req.body;
      var mlmDataMemberCheckRet = [];
      var mlmDataBonusVoucherRet = [];
      var mlmDataGeneralVoucherRet = [];
      var retResponse = [];
      let expireddateX = null;
      let today = new Date();

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
          let mlmDataBonusVoucher = await VoucherMLMDataBonus
          .findOne({
            raw: true,
            where: {
              DistributorCode : distributorcode, 
              voucherno : voucherno
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
                    VoucherNo : mlmDataBonusVoucher.VoucherNo, 
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
                      voucherName : 'product voucher',
                      voucherNo : mlmDataBonusVoucher.VoucherNo,
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
                      voucherName : 'cash voucher',
                      voucherNo : mlmDataBonusVoucher.VoucherNo,
                      voucherType : mlmDataBonusVoucher.vchtype,
                      voucherDesc : 'Cash Voucher',
                      voucherWithBV : '1',
                      voucherDiscType : vdisctype,
                      voucherRate : mlmDataBonusVoucher.VoucherAmt,
                      voucherStatus : 'active'
                  });
              }

              if(mlmDataBonusVoucher == "" || mlmDataBonusVoucher == null){ //if record not founde at bonus voucher data
                  return res.status(409).json({status : 'failed', message : 'Voucher No not founded.'});
              }else{
                  
                  let ExpireDatex = dateFormat(new Date(mlmDataBonusVoucher.ExpireDate), "yyyymm");
                  let todayx = dateFormat(new Date(today), "yyyymm");

                  if (todayx > ExpireDatex){
                      return res.status(409).json({status : 'failed', message : 'Voucher No ' + mlmDataBonusVoucher.VoucherNo + ' expired at ' + dateFormat(new Date(ExpireDatex), "yyyy-mm-dd")});
                  }else if(mlmDataBonusVoucher.claimstatus == '1'){ //if voucher already used/claimed
                      return res.status(409).json({status : 'failed', message : 'Already used in ' + mlmDataBonusVoucher.loccd + ' at ' + dateFormat(new Date(mlmDataBonusVoucher.claim_date), "yyyy-mm-dd")});
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
                          if(mlmDataMemberCheckRet[0].date_now == mlmDataMemberCheckRet[0].bd_now && 
                             mlmDataMemberCheckRet[0].date_now <= mlmDataMemberCheckRet[0].bd_exp_date && 
                             mlmDataGeneralVoucherRet[i].vtype == '1'){
                              //set response for Birthday voucher
                              retResponse.push({
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
                  return res.status(409).json({status : 'failed', message : 'Voucher No not founded.'});
              }
               
          }

          if(retResponse == ""){ //if record not found at bonus voucher data
              return res.status(409).json({status : 'failed', message : 'Voucher No not founded.'});
          }else{
               return res.status(200).json(retResponse[0]); 
          }

      } catch (err) {
        console.log(err);
         return res.status(500).json( { status:'failed', message: 'Internal server error' });
      }
 
  };

  //Get List Voucher based on login ID
  const getVoucherList = async (req, res) => {
    const { distributorcode } = req.body;
      var mlmDataMemberCheckRet = [];
      var mlmDataBonusVoucherRet = [];
      var mlmDataGeneralVoucherRet = [];
      var retResponse = [];
      let expireddateX = null;
      let today = new Date();

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
          let mlmDataBonusVoucher = await VoucherMLMDataBonus
          .findOne({
            raw: true,
            where: {
              DistributorCode : distributorcode, 
              ExpireDate : ' >= ' + dateFormat(new Date(mlmDataBonusVoucher.IssueDate), "yyyy-mm-dd")
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
                    VoucherNo : mlmDataBonusVoucher.VoucherNo, 
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
              if(mlmDataBonusVoucher.vchtype == 'P' && 
                 dateFormat(new Date(today), "yyyymm") <= dateFormat(new Date(mlmDataBonusVoucher.ExpireDate), "yyyymm")){
                  retResponse.push({
                      voucherName : 'product voucher',
                      voucherNo : mlmDataBonusVoucher.VoucherNo,
                      voucherType : mlmDataBonusVoucher.vchtype,
                      voucherDesc : 'Product Voucher',
                      voucherWithBV : '0',
                      voucherDiscType : vdisctype,
                      voucherRate : mlmDataBonusVoucher.VoucherAmt,
                      voucherStatus : 'active'
                  });
              }
              
              //Check if voucher relevant to Cash Voucher
              if(mlmDataBonusVoucher.vchtype == 'C' && 
                 dateFormat(new Date(today), "yyyymm") <= dateFormat(new Date(mlmDataBonusVoucher.ExpireDate), "yyyymm")){
                  retResponse.push({
                      voucherName : 'cash voucher',
                      voucherNo : mlmDataBonusVoucher.VoucherNo,
                      voucherType : mlmDataBonusVoucher.vchtype,
                      voucherDesc : 'Cash Voucher',
                      voucherWithBV : '1',
                      voucherDiscType : vdisctype,
                      voucherRate : mlmDataBonusVoucher.VoucherAmt,
                      voucherStatus : 'active'
                  });
              }

              if(mlmDataBonusVoucher == "" || mlmDataBonusVoucher == null){ //if record not founde at bonus voucher data
                  return res.status(409).json({status : 'failed', message : 'Voucher No not founded.'});
              }else{
                  if(mlmDataBonusVoucher.claimstatus == '1'){ //if voucher already used/claimed
                      return res.status(409).json({status : 'failed', message : 'Already used in ' + mlmDataBonusVoucher.loccd + ' at ' + dateFormat(new Date(mlmDataBonusVoucher.claim_date), "yyyy-mm-dd")});
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
              console.log(mlmDataGeneralVoucher);
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
                          if(mlmDataMemberCheckRet[0].date_now == mlmDataMemberCheckRet[0].bd_now && 
                             mlmDataMemberCheckRet[0].date_now <= mlmDataMemberCheckRet[0].bd_exp_date && 
                             mlmDataGeneralVoucherRet[i].vtype == '1'){
                              //set response for Birthday voucher
                              retResponse.push({
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
                                   voucherName : '1st time transaction',
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
                  return res.status(409).json({status : 'failed', message : 'Voucher No not founded.'});
              }
               
          }

          if(retResponse == ""){ //if record not found at bonus voucher data
              return res.status(409).json({status : 'failed', message : 'Voucher No not founded.'});
          }else{
               return res.status(200).json(retResponse[0]); 
          }

      } catch (err) {
        console.log(err);
         return res.status(500).json( { status:'failed', message: 'Internal server error' });
      }
 
  };

  
  return {
    getVoucherCheck,
    getVoucherList
  };
};

module.exports = MLMDataMemberCheckController;
