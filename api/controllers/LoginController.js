const Login = require('../models/Login');
const Test = require('../models/Test');
const sequelizeMlm2010 = require('../../config/db/klink_mlm2010.js');
const sequelize = require('../../config/db/database');
const sequelizeMember = require('../../config/db/klink_mlm2010.js');
const {internalError, logSuccess, logError, logAkademiSuccess, logAkademiError} = require('../services/logger');
const { Op } = require('sequelize')

const LoginController = () => {

  
const login = async (req, res) => {
    const { dfno, password } = req.body;
     xdfno = dfno.toUpperCase();

      console.log('mulai');
      try {       
        const data = await Login
          .findOne({
            where: {
              dfno : xdfno ,
              password,
              fullnm:  { [Op.not]: ['TERMINATION', 'CANCEL', 'CENCEL'] },
            },
          });

        if (!data) {
          return logError(req, res, 401, 'Invalid username or password');
        
        } 
          return logSuccess(req, res, 200, data)    
       
      } catch (err) {    
        console.log(err)
          return internalError(req, res,err )
      }

    
  };

const loginDigitalBrainNew= async (req, res) => {
    const { dfno, password } = req.body;
     let xdfno = dfno.toUpperCase();

      
       try {

         const data = await Login
          .findOne({
            where: {
              dfno:xdfno,
              password
            },
          });
         

        if (!data) {
         return logError(req, res, 401, 'Invalid username/password');
        
        } 


          let sql = "SELECT a.dfno, a.fullnm, a.sex, a.password, a.status, a.cat_id " +
                    " FROM db_ecommerce.dbo.V_HILAL_API_LOGIN_TRAINING a " + 
                    " WHERE a.dfno = '" + xdfno + "' AND a.password = '" + password + "' " +
                    " GROUP BY a.dfno, a.fullnm, a.sex, a.password, a.status, a.cat_id " +
                    " ORDER BY a.cat_id";
          let datalogin = await sequelize.query(sql);
         

          // for (var x = 0; x < datalogin[0].length; x++) {
          //     console.log('orderno = ' + datalogin[0][x].fullnm);
          //   }

        if (datalogin[0] == null || datalogin[0] == '') {
         return logError(req, res, 402, 'Training not available for this account');
        } else if (datalogin[0].length > 0) {
            return logSuccess(req, res, 200, datalogin[0])  
        }
            
       
      } catch (err) {   
      console.log(err) 
          return internalError(req, res,err )
      }

    
  };

  const loginAsuransi= async (req, res) => {
    const { dfno, password } = req.body;
     let xdfno = dfno.toUpperCase();

      
       try {

         const data = await Login
          .findOne({
            where: {
              dfno:xdfno,
              password
            },
          });
         

        if (!data) {
         return logError(req, res, 401, 'Invalid username/password');
        
        } 


          
            return logSuccess(req, res, 200, data)  
        
       
      } catch (err) {   
      console.log(err) 
          return internalError(req, res,err )
      }

    
  };

const loginAkademiInspiradzi= async (req, res) => {
    const { idmember, password , user_ip} = req.body;
     let xdfno = idmember.toUpperCase();
     let arrayData = []
     let ladies = "false";
     let mhs = "false";

      
       try {


          let sql = "select a.dfno, a.fullnm, "+
                "a.tel_hp,a.tel_hm,a.tel_of, a.email,a.sex,"+
                "a.addr1,a.addr2,a.addr3,"+
                "a.sfno, b.fullnm as sponsor_nm,"+
                "a.sfno_reg, c.fullnm as recruiter_nm"+
                " from msmemb a"+
                " INNER JOIN msmemb b ON a.sfno=b.dfno"+
                " INNER JOIN msmemb c ON a.sfno_reg=c.dfno"+
                " where a.dfno='" + xdfno + "' AND a.password='" + password + "'";
          let datalogin = await sequelizeMember.query(sql);
          
          if(xdfno.substring(6, 0) == "IDSMHS"){
            mhs = "true";
            // console.log(mhs);
          }

          let sql2 = "SELECT count(dfno) as lbc FROM ASH_LBC_MEMB a where a.dfno='" + xdfno + "' AND a.status='1'"
          let dataladies = await sequelizeMember.query(sql2);
           if (dataladies[0][0].lbc > 0) {
             ladies = "true";    
           }


        if (datalogin[0] == null || datalogin[0] == '') {
         return logAkademiError(req, res, 402, 'Login Not Valid..');
        } else if (datalogin[0].length > 0) {
          let data = datalogin[0];

          for(let param of data){
            let obj = {
              idmember : param.dfno,
              idmember: param.dfno,
              fullname: param.fullnm,
              tel_hp: param.tel_hp,
              tel_home: param.tel_hm,
              tel_office: param.tel_of,
              email: param.email,
              gender: param.sex,
              sponsor_code: param.sfno,
              sponsor_name: param.sponsor_nm,
              recruiter_code: param.sfno_reg,
              recruiter_name: param.recruiter_nm,
              ladies:ladies,
              mahasiswa:mhs
            }
             arrayData.push(obj)
          }

            return logAkademiSuccess(req,res,200, arrayData,'success' )
        }
            
       
      } catch (err) {   
      console.log(err) 
          return internalError(req, res,err )
      }

    
  };


  const test = async (req, res) => {
    const { firstname } = req.body;

   
      try {
        const data = await Test
          .findOne({
            where: {
              firstname,
            },
          });

        if (!data) {
         return logError(req, res, 400, 'Invalid username or password');
        }
        return res.status(200).json({status: 'success ', data });     
      } catch (err) {
        console.log(err);
        
        return internalError(req, res,err )
      }
 
  };

  const getUser = async (req, res) => {
    const { dfno } = req.body;

   
      try {
        // const data = await Login
        //   .findOne({
        //     where: {
        //       dfno,
        //     },
        //   });
          

        // if (!data) {
        //  return logError(req, res, 400, 'Invalid username or password');
        // }
        // return res.status(200).json({status: 'success ', data });     

        let sql = "SELECT TOP 1 [dfno], [fullnm], [idno], [sfno], [fullnm_sp], [sex], [sfno_reg], [fullnm_rec], [tel_hp], [email], " +
                  " [addr1], [addr2], [addr3], [city], [rank], [shortnm], [percentage], [bankid], [bankaccno], [bankaccnm], " +
                  " [virtual_account], [password], [birthdt], [bd_now], [bd_exp_date], [joindt], [distributor], [mobile_sc], " +
                  " [sub_sc], [stockist_sc] " + 
                  " FROM [V_HILAL_API_LOGIN] WHERE [dfno] = '" + dfno + "'";
        let dataMember = await sequelize.query(sql);
       
        if (dataMember[0] == null || dataMember[0] == '') {
          return logError(req, res, 402, 'Invalid ID Member');
        } else if (dataMember[0].length > 0) {
            return logSuccess(req, res, 200, dataMember[0])  
        }

      } catch (err) {
        console.log(err);
        
         return internalError(req, res,err )
      }
 
      
  };

  const checkJaringan = async (req, res) => {
    const { dfno, login } = req.body;

   
      try {

       let data = await sequelizeMlm2010.query('SP_HILAL_WEB_CHECKUPLINE  :dfno, :login', 
         { 
           replacements: 
           { 
               dfno: dfno, 
               login : login
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
 
  };



  return {
    login,
    loginDigitalBrainNew,
    getUser,
    test,
    checkJaringan,
    loginAkademiInspiradzi,
    loginAsuransi
  };

};
module.exports = LoginController;