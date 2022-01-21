const BankList = require('../models/BankList');
const { Op } = require('sequelize') 

// const sequelizeMlm2010 = require('../../config/klink_mlm2010.js');

const BankListController = () => {

"use strict";  
const bankList = async (req, res) => { 
  let { body } = req;


     try {       
          var data;
          data = await BankList
             .findAll({
                raw: true,
                where: {
                  status : '1'
                },
                attributes: ['id', 'bankCode', 'bankDesc', 'charge_connectivity', 'charge_adm_type', 'charge_admin', 
                             'status', 'bankDisplayNm', 'img_url', 'is_installment', 'install_6', 'install_12', 'min_pay'], 
                             
                order: [
                  ['bankDisplayNm', 'ASC']
                ],
              });


        // console.log(data)  
        if(data == "" || data == null || data == '' ){
            return res.status(400).json({ status: 'failed', message: 'Cannot find courier.'});
        }else{
            return res.status(200).json({status:'success ', data });     
        }

      } catch (err) {
          console.log(err);
          return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }

};

  return {
    bankList,
  };

};
module.exports = BankListController;