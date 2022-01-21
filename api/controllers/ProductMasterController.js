const master_prd_cat_inv = require('../models/Prod_master_prd_cat_inv'),
      master_prd_pricetab = require('../models/Prod_master_prd_pricetab'),
      master_prd_bundling = require('../models/Prod_master_prd_bundling');
const msprd = require('../models/Klink_mlm2010_prod_msprd'),
      pricetab = require('../models/Klink_mlm2010_prod_pricetab'),
      newera_prdcat = require('../models/Klink_mlm2010_prod_newera_prdcat'),
      newera_prddet = require('../models/Klink_mlm2010_prod_newera_prddet');
const sequelize = require('../../config/db/database');
const sequelize_klink_mlm2010 = require('../../config/db/klink_mlm2010');
const dateFormat = require('dateformat');
const {
        internalError,
        logSuccess,
        logError,
        logReturn,
        logOrderError,
        logOrderTempSuccess,
      } = require("../services/logger");
const { Op } = require('sequelize')

const ProductMasterController = () => {

"use strict";  
const productMasterAdd = async (req, res) => { 
  let { body } = req;
  let master_prd_cat_inv_val = [], msprd_val = [], 
      master_prd_pricetab_val = [], pricetab_val = [], 
      master_prd_bundling_val = [], 
      newera_prdcat_val = [], newera_prddet_val = [],
      today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss'),
      month_now = dateFormat(Date.now(),'m'),
      year_now = dateFormat(Date.now(),'yyyy');

  if(body.length){
    for (let i = 0; i < body.length; i++) {
      //STEP 1. CHECK EXISTING PRODUCT
      let check_product = await master_prd_cat_inv.findOne({
        where: { cat_inv_id: body[i].prd_code },
        attributes: ["cat_inv_id"],
      });

      if(check_product){ // if exist
        let cat_inv_id = check_product.dataValues.cat_inv_id;
        console.log("cat_inv_id == "+cat_inv_id);
        return logError(req, res, 401, body[i].prd_code+" already exist, cannot add duplicate value.");
      }else{ // if new record then add to tables
        //set values to master_prd_cat_inv_val
        let weight;
        weight = body[i].prd_weight;
        if(weight >= 70){ //(!body[i].unit_weight_type || body[i].unit_weight_type == "gr" || body[i].unit_weight_type == "gram" || createnm.includes("app.k-mart")|| updatenm.includes("app.k-mart")){
          weight = body[i].prd_weight / 1000;
        }


        master_prd_cat_inv_val.push({
          cat_inv_id: body[i].prd_code, 
          cat_id: body[i].cat_code, 
          parent_cat_inv_id: body[i].parent_prd_code, 
          cat_inv_desc: body[i].prd_desc, 
          inv_type: body[i].prd_is_bundling, 
          status: body[i].status, 
          ecomm_status: body[i].apps_status, 
          createnm: body[i].username, 
          createdt: today, 
          img_name: body[i].prd_image_url, 
          weight: weight, //body[i].prd_weight, 
          product_info: body[i].prd_info, 
          description: body[i].prd_desc, 
          max_order: body[i].prd_max_order, 
          search_tag: body[i].prd_search_tag, 
          is_hotproduct: body[i].prd_is_hot, 
          is_newproduct: body[i].prd_is_new, 
          prd_group_lp: body[i].prd_group_lp,
          prd_start_on: body[i].prd_start_on, 
          prd_end_on: body[i].prd_end_on, 
        });

        //set values to msprd_val
        msprd_val.push({
          prdcd: body[i].prd_code, 
          prdnm: body[i].prd_desc, 
          description: body[i].prd_desc, 
          category: body[i].cat_code, 
          status: body[i].status, 
          webstatus: body[i].apps_status, 
          url: body[i].prd_image_url, 
          image: body[i].prd_image_url, 
          notes: body[i].prd_notes, 
          createnm: body[i].username, 
          createdt: today, 
          popular: body[i].prd_is_hot, 
          bestseller: body[i].prd_is_hot, 
          topsearch: body[i].prd_is_hot, 
          scstatus: '0', 
          categorycode: body[i].cat_code, 
          remarks: body[i].prd_notes, 
        });


        for (let j = 0; j < body[i].product_price.length; j++) {
          let product_price = body[i].product_price[j];
          //set values to master_prd_pricetab_val
          master_prd_pricetab_val.push({
            period_month: month_now, 
            period_year: year_now, 
            pricecode: product_price.price_code, 
            cat_inv_id: body[i].prd_code, 
            cp: product_price.price_consument, 
            dp: product_price.price_distributor, 
            bv: product_price.price_bv, 
            remarks: body[i].prd_notes, 
            createnm: body[i].username, 
            createdt: today,
            country_id : 'ID',
            hq_id : 'BID06',
            branch_id : 'B001'
          });

          //set values to pricetab_val
          pricetab_val.push({
            pricecode: product_price.price_code, 
            prdcd: body[i].prd_code, 
            dp: product_price.price_distributor, 
            pv: product_price.price_bv, 
            cp: product_price.price_consument, 
            bv: product_price.price_bv, 
            notes: body[i].appname, 
            createnm: body[i].username, 
            createdt: today,
          });
        }


        if(body[i].prd_is_bundling == 'B'){ //if product is BUNDLING/PACKAGE

            //set values to newera_prdcat_val header bundling
            newera_prdcat_val.push({
              prdcd: body[i].prd_code, 
              prdcdName: body[i].prd_desc, 
              desc: body[i].prd_desc, 
              createnm: body[i].username, 
              createdt: today,
            });

          for (let k = 0; k < body[i].product_bundle.length; k++) {
            let product_bundle = body[i].product_bundle[k];
            //set values to master_prd_bundling_val detail product bundling 
            master_prd_bundling_val.push({
              cat_inv_id_child: product_bundle.prd_bundle_detail_prd_code, 
              cat_inv_id_parent: body[i].prd_code, 
              cat_desc: product_bundle.prd_bundle_detail_desc, 
              qty: product_bundle.prd_bundle_detail_qty, 
              status: body[i].status, 
              remarks: body[i].notes, 
              createnm: body[i].username, 
              createdt: today, 
            });
            //set values to newera_prddet_val detail product bundling 
            newera_prddet_val.push({
              prdcdDet: product_bundle.prd_bundle_detail_prd_code, 
              prdcdNmDet: product_bundle.prd_bundle_detail_desc, 
              prdcdCat: product_bundle.prd_bundle_detail_cat_code, 
              qty: product_bundle.prd_bundle_detail_qty, 
              createnm: body[i].username, 
              createdt: today,
              remark: body[i].notes, 
            });
          }
        }


        let transaction, transaction_klink_mlm2010;
        try {
          transaction = await sequelize.transaction();
          transaction_klink_mlm2010 = await sequelize_klink_mlm2010.transaction();
          await master_prd_cat_inv.bulkCreate(
            master_prd_cat_inv_val,
            { transaction },
            { validate: true }
          );

          await master_prd_pricetab.bulkCreate(
            master_prd_pricetab_val,
            { transaction },
            { validate: true }
          );

          await master_prd_bundling.bulkCreate(
            master_prd_bundling_val,
            { transaction },
            { validate: true }
          );

          await msprd.bulkCreate(
            msprd_val,
            { transaction_klink_mlm2010 },
            { validate: true }
          );

          await pricetab.bulkCreate(
            pricetab_val,
            { transaction_klink_mlm2010 },
            { validate: true }
          );

          await newera_prdcat.bulkCreate(
            newera_prdcat_val,
            { transaction_klink_mlm2010 },
            { validate: true }
          );

          await newera_prddet.bulkCreate(
            newera_prddet_val,
            { transaction_klink_mlm2010 },
            { validate: true }
          );

          await transaction.commit();
          await transaction_klink_mlm2010.commit();
          // logSuccess(req, res, 200, { login: login, trans: trans });
          return logSuccess(req, res, 200, { data: master_prd_cat_inv_val});
        } catch (err) {
          await transaction.rollback();
          await transaction_klink_mlm2010.rollback();

          if (err.name == "SequelizeUniqueConstraintError") {
            return res
              .status(409)
              .json({
                status: "conflict",
                message: "Product code "+body[i].prd_code+" is already registered",
              });
          }
          if (err.name == "AggregateError") {
            return res
              .status(409)
              .json({
                status: "conflict",
                message: err[0].errors.errors[0].message,
              });
          } else {
            console.log(err);
            internalError(req, res, err);
          }
        }
      };

        // return logSuccess(req, res, 200, { body: JSON.stringify(body)});
      }
      // product_master.push({});
    
    
    }else{
      return logError(req, res, 409, "Error array value.");
    }
  };

  const productMasterEdit = async (req, res) => { 
    let {body} = req;
    let master_prd_cat_inv_val = [], msprd_val = [], 
        master_prd_pricetab_val = [], pricetab_val = [], 
        master_prd_bundling_val = [], 
        newera_prdcat_val = [], newera_prddet_val = [],
        today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss'),
        month_now = dateFormat(Date.now(),'m'),
        year_now = dateFormat(Date.now(),'yyyy'),
        product_code = [];
    // if(body){
    //   return res.status(200).json({ status:'success', message: 'success' });
    // else{
    //   return res.status(401).json({ status:'false', message: 'edit' });
    // }

    if(body.length){
      for (let i = 0; i < body.length; i++) {
        //STEP 1. CHECK EXISTING PRODUCT
        let check_product = await master_prd_cat_inv.findOne({
          where: { cat_inv_id: body[i].prd_code },
          attributes: ["cat_inv_id"],
        });

        let status_product = '1';
        if (body[i].update_type == 'U') { // if update then status follow the request
          status_product = body[i].status;
        }else if (body[i].update_type == 'D') { // if DELETE then status = D
          status_product = 'D';
        }

        if(check_product){ //if exist can update or delete
          if(body[i].update_type == 'U' || body[i].update_type == 'D'){ //update only

            console.log("check_product :==" +check_product);
            let weight;
            weight = body[i].prd_weight;
            if(weight >= 70){ //(!body[i].unit_weight_type || body[i].unit_weight_type == "gr" || body[i].unit_weight_type == "gram" || createnm.includes("app.k-mart")|| updatenm.includes("app.k-mart")){
              weight = body[i].prd_weight / 1000;
            }

            let transaction, transaction_klink_mlm2010;
            try {
              transaction = await sequelize.transaction();
              console.log('body[i].prd_code :== ' +body[i].prd_code);
              console.log('sampe sini ya :== ' +body[i].prd_info);
              await master_prd_cat_inv.update({
                  cat_inv_id: body[i].prd_code, 
                  cat_id: body[i].cat_code, 
                  parent_cat_inv_id: body[i].parent_prd_code, 
                  cat_inv_desc: body[i].prd_desc, 
                  inv_type: body[i].prd_is_bundling, 
                  status: status_product, 
                  ecomm_status: body[i].apps_status, 
                  updatenm: body[i].username, 
                  updatedt: today, 
                  img_name: body[i].prd_image_url, 
                  weight: weight, //body[i].prd_weight, 
                  product_info: body[i].prd_info, 
                  description: body[i].prd_desc, 
                  max_order: body[i].prd_max_order, 
                  search_tag: body[i].prd_search_tag, 
                  is_hotproduct: body[i].prd_is_hot, 
                  is_newproduct: body[i].prd_is_new, 
                  prd_group_lp: body[i].prd_group_lp,
                  prd_start_on: body[i].prd_start_on, 
                  prd_end_on: body[i].prd_end_on, 
                }, 
                { where: {cat_inv_id: body[i].prd_code}},
                {transaction}
              );



              for (let j = 0; j < body[i].product_price.length; j++) {
                let product_price = body[i].product_price[j];
                //set values to master_prd_pricetab_val
                await master_prd_pricetab.update({
                  period_month: month_now, 
                  period_year: year_now, 
                  pricecode: product_price.price_code, 
                  cat_inv_id: body[i].prd_code, 
                  cp: product_price.price_consument, 
                  dp: product_price.price_distributor, 
                  bv: product_price.price_bv, 
                  remarks: body[i].prd_notes, 
                  updatenm: body[i].username, 
                  updatedt: today,
                  country_id : 'ID',
                  hq_id : 'BID06',
                  branch_id : 'B001'}, 
                  {where: {cat_inv_id: body[i].prd_code, pricecode: product_price.price_code,}},
                  { transaction }
                );

                //set values to pricetab_val
                await pricetab.update({
                  pricecode: product_price.price_code, 
                  prdcd: body[i].prd_code, 
                  dp: product_price.price_distributor, 
                  cp: product_price.price_consument, 
                  pv: product_price.price_bv, 
                  bv: product_price.price_bv, 
                  notes: body[i].appname, 
                  updatenm: body[i].username, 
                  updatedt: today,}, 
                  {where: {prdcd: body[i].prd_code, pricecode: product_price.price_code,}},
                  { transaction_klink_mlm2010 }
                );
              }
              
              if(body[i].prd_is_bundling == 'B'){ //if product is BUNDLING/PACKAGE
                //set values to newera_prdcat_val header bundling
                await newera_prdcat.update({
                  prdcd: body[i].prd_code, 
                  prdcdName: body[i].prd_desc, 
                  desc: body[i].prd_desc, 
                  createnm: body[i].username, 
                  createdt: today,}, 
                  {where: {prdcd: body[i].prd_code,}},
                  { transaction_klink_mlm2010 },
                );


                for (let k = 0; k < body[i].product_bundle.length; k++) {
                  let product_bundle = body[i].product_bundle[k];
                  //set values to master_prd_bundling_val detail product bundling 
                  await master_prd_bundling.update({
                    cat_inv_id_child: product_bundle.prd_bundle_detail_prd_code, 
                    cat_inv_id_parent: body[i].prd_code, 
                    cat_desc: product_bundle.prd_bundle_detail_desc, 
                    qty: product_bundle.prd_bundle_detail_qty, 
                    status: status_product, 
                    remarks: body[i].notes, 
                    updatenm: body[i].username, 
                    updatedt: today, },
                    {where: {cat_inv_id_child: product_bundle.prd_bundle_detail_prd_code, 
                             cat_inv_id_parent: body[i].prd_code,}},
                    { transaction }
                  );

                  //set values to newera_prddet_val detail product bundling 
                  await newera_prddet.update({
                      prdcdDet: product_bundle.prd_bundle_detail_prd_code, 
                      prdcdNmDet: product_bundle.prd_bundle_detail_desc, 
                      prdcdCat: product_bundle.prd_bundle_detail_cat_code, 
                      qty: product_bundle.prd_bundle_detail_qty, 
                      updatenm: body[i].username, 
                      updatedt: today,
                      remark: body[i].notes, }, 
                    {where: {prdcdDet: product_bundle.prd_bundle_detail_prd_code, 
                             prdcdCat: product_bundle.prd_bundle_detail_cat_code}},
                    { transaction_klink_mlm2010 }
                  );
                }
              }


            //set values to msprd_val
              transaction_klink_mlm2010 = await sequelize_klink_mlm2010.transaction();
              await msprd.update({
                  prdcd: body[i].prd_code, 
                  prdnm: body[i].prd_desc, 
                  description: body[i].prd_desc, 
                  category: body[i].cat_code, 
                  status: status_product, 
                  webstatus: body[i].apps_status, 
                  url: body[i].prd_image_url, 
                  image: body[i].prd_image_url, 
                  notes: body[i].prd_notes, 
                  updatenm: body[i].username, 
                  updatedt: today, 
                  popular: body[i].prd_is_hot, 
                  bestseller: body[i].prd_is_hot, 
                  topsearch: body[i].prd_is_hot, 
                  scstatus: '0', 
                  categorycode: body[i].cat_code, 
                  remarks: body[i].prd_notes, 
                }, {where: {prdcd: body[i].prd_code,}},
                { transaction_klink_mlm2010 },
                { validate: true }
              );

              await transaction.commit();
              await transaction_klink_mlm2010.commit();
              // logSuccess(req, res, 200, { login: login, trans: trans });

               master_prd_cat_inv_val.push({
                cat_inv_id: body[i].prd_code, 
                cat_id: body[i].cat_code, 
                parent_cat_inv_id: body[i].parent_prd_code, 
                cat_inv_desc: body[i].prd_desc, 
                inv_type: body[i].prd_is_bundling, 
                status: body[i].status, 
                ecomm_status: body[i].apps_status, 
                createnm: body[i].username, 
                createdt: today, 
                img_name: body[i].prd_image_url, 
                weight: body[i].prd_weight, 
                product_info: body[i].prd_info, 
                description: body[i].prd_desc, 
                max_order: body[i].prd_max_order, 
                search_tag: body[i].prd_search_tag, 
                is_hotproduct: body[i].prd_is_hot, 
                is_newproduct: body[i].prd_is_new, 
                prd_group_lp: body[i].prd_group_lp,
                prd_start_on: body[i].prd_start_on, 
                prd_end_on: body[i].prd_end_on, 
              });


              return logSuccess(req, res, 200, { data: master_prd_cat_inv_val});
            } catch (err) {
              await transaction.rollback();
              // await transaction_klink_mlm2010.rollback();

              if (err.name == "SequelizeUniqueConstraintError") {
                return res
                  .status(409)
                  .json({
                    status: "conflict",
                    message: "Product code "+body[i].prd_code+" is already registered",
                  });
              }
              if (err.name == "AggregateError") {
                return res
                  .status(409)
                  .json({
                    status: "conflict",
                    message: err[0].errors.errors[0].message,
                  });
              } else {
                console.log(err);
                internalError(req, res, err);
              }
            }


          }else if(body[i].update_type == 'XXXX'){
            product_code.push({cat_inv_id: body[i].prd_code, });
            let transaction, transaction_klink_mlm2010;
            try {
              transaction = await sequelize.transaction();
              await master_prd_cat_inv.destroy(product_code, { transaction }, { validate: true });

              await master_prd_pricetab.destroy(
                master_prd_pricetab_val,
                { transaction },
                { validate: true }
              );

              await master_prd_bundling.destroy(
                master_prd_bundling_val,
                { transaction },
                { validate: true }
              );

              transaction_klink_mlm2010 = await sequelize_klink_mlm2010.transaction();
              await msprd.destroy(
                msprd_val,
                { transaction_klink_mlm2010 },
                { validate: true }
              );

              await pricetab.destroy(
                pricetab_val,
                { transaction_klink_mlm2010 },
                { validate: true }
              );

              await newera_prdcat.destroy(
                newera_prdcat_val,
                { transaction_klink_mlm2010 },
                { validate: true }
              );

              await newera_prddet.destroy(
                newera_prddet_val,
                { transaction_klink_mlm2010 },
                { validate: true }
              );

              await transaction.commit();
              await transaction_klink_mlm2010.commit();
              // logSuccess(req, res, 200, { login: login, trans: trans });
              return logSuccess(req, res, 200, { data: master_prd_cat_inv_val});
            } catch (err) {
              await transaction.rollback();
              await transaction_klink_mlm2010.rollback();

              if (err.name == "SequelizeUniqueConstraintError") {
                return res
                  .status(409)
                  .json({
                    status: "conflict",
                    message: "Product code "+body[i].prd_code+" is already registered",
                  });
              }
              if (err.name == "AggregateError") {
                return res
                  .status(409)
                  .json({
                    status: "conflict",
                    message: err[0].errors.errors[0].message,
                  });
              } else {
                console.log(err);
                internalError(req, res, err);
              }
            }

            console.log(numAffectedRows) // if we had 3 pugs with the age of 7, this will be 3

          }else if(body[i].update_type == 'A'){
            let productMasterAdd = require('./ProductMasterController');
            console.log("body :== "+body[i])
            let addResulst = await productMasterAdd(body[i], res);
          }
        }else{
          console.log("cat_inv_id == "+body[i].prd_code);
          return logError(req, res, 401, body[i].prd_code+" doesn't exist.");
        }
      }

    }else{
      return logError(req, res, 409, "Error array value.");
    }


  }




const productMasterAddOnly = async (param) => { 
  let body = param;
  console.log(body);
  // return 
  // let master_prd_cat_inv_val = [], msprd_val = [], 
  //     master_prd_pricetab_val = [], pricetab_val = [], 
  //     master_prd_bundling_val = [], 
  //     newera_prdcat_val = [], newera_prddet_val = [],
  //     today = dateFormat(Date.now(),'yyyy-mm-dd HH:MM:ss'),
  //     month_now = dateFormat(Date.now(),'m'),
  //     year_now = dateFormat(Date.now(),'yyyy');

  // if(body.length){
  //   for (let i = 0; i < body.length; i++) {
  //     //STEP 1. CHECK EXISTING PRODUCT
  //     let check_product = await master_prd_cat_inv.findOne({
  //       where: { cat_inv_id: body[i].prd_code },
  //       attributes: ["cat_inv_id"],
  //     });

  //     if(check_product){ // if exist
  //       let cat_inv_id = check_product.dataValues.cat_inv_id;
  //       console.log("cat_inv_id == "+cat_inv_id);
  //       return logError(req, res, 401, body[i].prd_code+" already exist, cannot add duplicate value.");
  //     }else{ // if new record then add to tables
  //       //set values to master_prd_cat_inv_val
  //       master_prd_cat_inv_val.push({
  //         cat_inv_id: body[i].prd_code, 
  //         cat_id: body[i].cat_code, 
  //         parent_cat_inv_id: body[i].parent_prd_code, 
  //         cat_inv_desc: body[i].prd_desc, 
  //         inv_type: body[i].prd_is_bundling, 
  //         status: body[i].status, 
  //         ecomm_status: body[i].apps_status, 
  //         createnm: body[i].username, 
  //         createdt: today, 
  //         img_name: body[i].prd_image_url, 
  //         weight: body[i].prd_weight, 
  //         product_info: body[i].prd_info, 
  //         description: body[i].prd_desc, 
  //         max_order: body[i].prd_max_order, 
  //         search_tag: body[i].prd_search_tag, 
  //         is_hotproduct: body[i].prd_is_hot, 
  //         is_newproduct: body[i].prd_is_new, 
  //         prd_group_lp: body[i].prd_group_lp,
  //         prd_start_on: body[i].prd_start_on, 
  //         prd_end_on: body[i].prd_end_on, 
  //       });

  //       //set values to msprd_val
  //       msprd_val.push({
  //         prdcd: body[i].prd_code, 
  //         prdnm: body[i].prd_desc, 
  //         description: body[i].prd_desc, 
  //         category: body[i].cat_code, 
  //         status: body[i].status, 
  //         webstatus: body[i].apps_status, 
  //         url: body[i].prd_image_url, 
  //         image: body[i].prd_image_url, 
  //         notes: body[i].prd_notes, 
  //         createnm: body[i].username, 
  //         createdt: today, 
  //         popular: body[i].prd_is_hot, 
  //         bestseller: body[i].prd_is_hot, 
  //         topsearch: body[i].prd_is_hot, 
  //         scstatus: '0', 
  //         categorycode: body[i].cat_code, 
  //         remarks: body[i].prd_notes, 
  //       });


  //       for (let j = 0; j < body[i].product_price.length; j++) {
  //         let product_price = body[i].product_price[j];
  //         //set values to master_prd_pricetab_val
  //         master_prd_pricetab_val.push({
  //           period_month: month_now, 
  //           period_year: year_now, 
  //           pricecode: product_price.price_code, 
  //           cat_inv_id: body[i].prd_code, 
  //           cp: product_price.price_consument, 
  //           dp: product_price.price_distributor, 
  //           bv: product_price.price_bv, 
  //           remarks: body[i].prd_notes, 
  //           createnm: body[i].username, 
  //           createdt: today,
  //           country_id : 'ID',
  //           hq_id : 'BID06',
  //           branch_id : 'B001'
  //         });

  //         //set values to pricetab_val
  //         pricetab_val.push({
  //           pricecode: product_price.price_code, 
  //           prdcd: body[i].prd_code, 
  //           dp: product_price.price_consument, 
  //           pv: product_price.price_bv, 
  //           cp: product_price.price_distributor, 
  //           bv: product_price.price_bv, 
  //           notes: body[i].appname, 
  //           createnm: body[i].username, 
  //           createdt: today,
  //         });
  //       }


  //       if(body[i].prd_is_bundling == 'B'){ //if product is BUNDLING/PACKAGE

  //           //set values to newera_prdcat_val header bundling
  //           newera_prdcat_val.push({
  //             prdcd: body[i].prd_code, 
  //             prdcdName: body[i].prd_desc, 
  //             desc: body[i].prd_desc, 
  //             createnm: body[i].username, 
  //             createdt: today,
  //           });

  //         for (let k = 0; k < body[i].product_bundle.length; k++) {
  //           let product_bundle = body[i].product_bundle[k];
  //           //set values to master_prd_bundling_val detail product bundling 
  //           master_prd_bundling_val.push({
  //             cat_inv_id_child: product_bundle.prd_bundle_detail_prd_code, 
  //             cat_inv_id_parent: body[i].prd_code, 
  //             cat_desc: product_bundle.prd_bundle_detail_desc, 
  //             qty: product_bundle.prd_bundle_detail_qty, 
  //             status: body[i].status, 
  //             remarks: body[i].notes, 
  //             createnm: body[i].username, 
  //             createdt: today, 
  //           });
  //           //set values to newera_prddet_val detail product bundling 
  //           newera_prddet_val.push({
  //             prdcdDet: product_bundle.prd_bundle_detail_prd_code, 
  //             prdcdNmDet: product_bundle.prd_bundle_detail_desc, 
  //             prdcdCat: product_bundle.prd_bundle_detail_cat_code, 
  //             qty: product_bundle.prd_bundle_detail_qty, 
  //             createnm: body[i].username, 
  //             createdt: today,
  //             remark: body[i].notes, 
  //           });
  //         }
  //       }


  //       let transaction, transaction_klink_mlm2010;
  //       try {
  //         transaction = await sequelize.transaction();
  //         await master_prd_cat_inv.bulkCreate(
  //           master_prd_cat_inv_val,
  //           { transaction },
  //           { validate: true }
  //         );

  //         await master_prd_pricetab.bulkCreate(
  //           master_prd_pricetab_val,
  //           { transaction },
  //           { validate: true }
  //         );

  //         await master_prd_bundling.bulkCreate(
  //           master_prd_bundling_val,
  //           { transaction },
  //           { validate: true }
  //         );

  //         transaction_klink_mlm2010 = await sequelize_klink_mlm2010.transaction();
  //         await msprd.bulkCreate(
  //           msprd_val,
  //           { transaction_klink_mlm2010 },
  //           { validate: true }
  //         );

  //         await pricetab.bulkCreate(
  //           pricetab_val,
  //           { transaction_klink_mlm2010 },
  //           { validate: true }
  //         );

  //         await newera_prdcat.bulkCreate(
  //           newera_prdcat_val,
  //           { transaction_klink_mlm2010 },
  //           { validate: true }
  //         );

  //         await newera_prddet.bulkCreate(
  //           newera_prddet_val,
  //           { transaction_klink_mlm2010 },
  //           { validate: true }
  //         );

  //         await transaction.commit();
  //         await transaction_klink_mlm2010.commit();
  //         // logSuccess(req, res, 200, { login: login, trans: trans });
  //         return logSuccess(req, res, 200, { data: master_prd_cat_inv_val});
  //       } catch (err) {
  //         await transaction.rollback();
  //         await transaction_klink_mlm2010.rollback();

  //         if (err.name == "SequelizeUniqueConstraintError") {
  //           return res
  //             .status(409)
  //             .json({
  //               status: "conflict",
  //               message: "Product code "+body[i].prd_code+" is already registered",
  //             });
  //         }
  //         if (err.name == "AggregateError") {
  //           return res
  //             .status(409)
  //             .json({
  //               status: "conflict",
  //               message: err[0].errors.errors[0].message,
  //             });
  //         } else {
  //           console.log(err);
  //           internalError(req, res, err);
  //         }
  //       }
  //     };

  //       // return logSuccess(req, res, 200, { body: JSON.stringify(body)});
  //     }
  //     // product_master.push({});
    
    
  //   }else{
  //     return logError(req, res, 409, "Error array value.");
  //   }
  };

  return {
    productMasterAdd,
    productMasterEdit
  };

};
module.exports = ProductMasterController;