const CourierList = require('../models/CourierList');
const { Op } = require('sequelize')

// const sequelizeMlm2010 = require('../../config/klink_mlm2010.js');

const CourierListController = () => {

"use strict";  
const courierListController = async (req, res) => {
  let { body } = req;

    var searchParam = null;

    // console.log(body);

     try {       
          var data;
          data = await CourierList
             .findAll({
                raw: true,
                where: {
                  shipper_status : '1'
                },
                attributes: ['shipper_id', 'shipper_code', 'shipper_name', 'shortnm', 'remarks', 
                             'shipper_status', 'open', 'close', 'info_html', 'logo_url', 
                             'allow_cod','url_tracking'], 
                order: [
                  ['shipper_name', 'ASC']
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
    courierListController,
  };

};
module.exports = CourierListController;