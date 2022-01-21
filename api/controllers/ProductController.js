//const InsertTestHdr = require('../models/InsertTestHdr');
const Product = require('../models/Product');
const {ProductGroupingKmart,ProductPricingKmart, ProductDetailKmart, ProductCatKmart} = require('../models/ProductKmart');

const Sequelize = require('sequelize');
const sequelize = require('../../config/db/ecomm_production');
const kmartDB = require('../../config/db/k_mart_conn');
const { Op } = require('sequelize')
const {internalError, logSuccess, logError} = require('../services/logger');
const dateFormat = require('dateformat');
const now = new Date();
const axios = require('axios');

const ProductController = () => {

	 const getProductCatList = async (req, res) => {
    const {} = req.body;
    
      try {

        let sql = "SELECT  cat_id, cat_desc, " +
                            " 'www.k-net.co.id/assets/images/kat/'+ cat_id + '.jpg' as img_url " +
                   " FROM master_prd_cat " + 
                   " WHERE status='1' "+
                   " ORDER BY cat_id ";
        
        let data = await sequelize.query(sql);
       
       // console.log(data);
       // let data1 = Object.assign({data});  
        // logger.info(data1[0], req.body);
 
        if (!data) {
         return logError(req, res, 400, 'Record not founded.');
        }
        
        return res.status(200).json(data[0]);   
        // return res.send(JSON.stringifym(data));

      } catch (err) {
        return internalError(req, res,err )
      }
 
  };

  //listing All Product
  const getAllProductList = async (req, res) => {
   const {limit, page} = req.query;
    let offset = parseInt(page);
    let lit = parseInt(limit);

      try {

        let product = await Product.findAndCountAll({

        where : {
          is_starterkit: '0',
          price_w:  { [Op.not]: null },
          price_e:  { [Op.not]: null },
          prdcdcat:  { [Op.not]: '13' }
      },
      limit: lit,
      offset: offset,
        });

        // // let sql = "SELECT a.prdcd, a.prdnm, a.description, a.prdcdcat, a.prdnmcatnm, a.img_url, a.price_w, a.price_e, a.price_cw, a.price_ce, a.bv, a.weight, a.ecomm_status, a.is_discontinue, a.max_order " +
        // //           "FROM V_Ecomm_PriceList_Baru a " +
        // //           "WHERE A.is_starterkit='0' AND a.price_w is not null and a.price_e is not null  and a.prdcdcat<>'13'";
  
        // // let data = await sequelize.query(sql);
       
        // if (!data) {
        //  return logError(req, res, 400, 'Record not founded.');
        // }
        
        return res.status(200).json(product);   
        // return res.send(JSON.stringifym(data));

      } catch (err) {
        console.log(err)
        return internalError(req, res,err )
      }
 
  };


  //listing All Product K-Mart
  const getAllProductListKmart = async (req, res) => {

    // let url = 'https://k-mart.co.id/assets/img/product/'
    let url = 'https://img.k-link.us/product/'
   
        try {

         let dt = await ProductGroupingKmart.findAndCountAll({
           distinct: true,

           where: {
                deleted_at: {
                  [Op.is]: [null]
                }},
           include: [{
                model: ProductDetailKmart,        
                as: 'variation',  
                include: [{
                      model: ProductPricingKmart,

                      attributes: ['price_code', 'price_customer', 'price_member', 'discount', 'bv'],
                      as: 'price',  
                      }],


              }],

         });

          if (!dt) {
          return logError(req, res, 400, 'Data Not Found');
        
        } 

         let dt1 = dt.rows.map(el => el.get({plain:true}))
         let dt2 = dt1.map(el => {
                       if (el.stock == "tersedia"){
                         stockBool = 1
                       } else {
                         stockBool = 0
                       }
                       return Object.assign({}, el, {img:url+el.id+'/'+el.img},{stock:stockBool})
                     return el
                }) 
         let data = {
           count: dt.count,
           rows: dt2
         }


        return res.status(200).json({status:'success', message:'',data});   

      } catch (err) {
        console.log(err)
        return internalError(req, res,err )
      }
 
  };



  const getCatProductListKmart = async (req, res) => {
   
        try {

         let data = await ProductCatKmart.findAll({
         });

         if (!data) {
          return logError(req, res, 400, 'Data Not Found');
        } 
        
         return res.status(200).json({status:'success', message:'',data});   

      } catch (err) {
        console.log(err)
        return internalError(req, res,err )
      }
 
  };

  const updateCatProductListKmart = async (req, res) => {
    let {name, description} = req.body;
    let {id} = req.query
   
        try {

         let data = await ProductCatKmart.update(
         {
           name: name,
           description: description,
         },
         {
           where: {id: id},
         }
         );

         if (!data[0]) {
          return logError(req, res, 400, 'Record update failed!');
        } 

        let dt = {'updated rows': data[0]}
        
        return logSuccess(req, res, 200,dt, 'Product Category ID: '+id+' has been updated successfully') 

      } catch (err) {
        console.log(err)
        return internalError(req, res,err )
      }
 
  };


  const updateProductListKmart = async (req, res) => {
    let {categoryId, name, tag, description, stock, variation, price} = req.body;
    let {productId, productCode} = req.query;
    
    stock = stock == 1 ? stock ="tersedia" : "tidak tersedia";
    
    console.log(stock)

    if (!productId ){
     return logError(req, res, 400, 'id not found!, Please put productId in query parameter');
     }


    let dataProd ={}
    let dataVar ={}
    let dataVarArr =[]
    let dataPrice ={}
    let dataPriceArr =[]

    
        try {

         let  prodValidation = await ProductGroupingKmart.findOne({
            where : {id :productId}
          })

          if (!prodValidation){
            return logError(req, res, 400, 'ProductID not found!');
          }


       if(!variation){

             dataProd = await ProductGroupingKmart.update(
             {
               name: name,
               description: description,
               stock: stock, 
               id_category: categoryId,
               tag: tag,
             },
             {
               where: {id: productId},
             }
             );
       }

       if(variation){
         if (!variation[0].productCode){
               return logError(req, res, 400, 'Please put productCode in body parameter');
               }
         dataProd = await ProductGroupingKmart.update(
             {
               name: name,
               description: description,
               stock: stock, 
               id_category: categoryId,
             },
             {
               where: {id: productId},
             }
             );

         for (param of variation){
           let idKlink= await ProductDetailKmart.findOne({
                   raw: true,
                   where: {product_code: param.productCode},
                   attributes: ['id_klink'],
                 })

             dataVar = await ProductDetailKmart.update(
               {
                 weight: param.weight,
                 stock : param.stock,
                 type : param.type,
                 size: param.size,
                 volume: param.volume,
                 color: param.color,
                 color_code: param.colorCode,
                 gender: param.gender,
                 package: param.package,
               },
               {
                 where: {product_code: param.productCode, product_grouping_id:productId},
               }
               );

              dataVarArr.push(dataVar[0])

            if(param.price){
             let price = param.price 
               for (param1 of price){  
               dataPricing = await ProductPricingKmart.update(
                {
                 price_customer: param1.priceCustomer,
                 price_member : param1.priceMember,
                 discount : param1.discount,
                 bv: param1.bv,
                },
               {
                 where: {id_klink_product: idKlink.id_klink, product_grouping_id:productId, price_code:param1.priceCode},
               });          
            dataPriceArr.push(dataPricing[0])
            }
            }
          }  
       }

         if (!dataProd[0] && !dataVarArr.includes(1) && !dataPriceArr.includes(1)){
          return logSuccess(req, res, 200,{}, 'Success, but no records has been updated!');
        } 

        
        return logSuccess(req, res, 200,{}, 'Product ID '+productId+' has been successfully updated') 

      } catch (err) {
        console.log(err)
        return internalError(req, res,err )
      }
 
  
 
  };



  const createProductListKmart = async (req, res) => {

    let {categoryId, type, name, img, description, tag, stock, paketBundling, variation } = req.body
    let transaction;
    let variationArr = []

    stock = stock == 1 ? stock ="tersedia" : "tidak tersedia";
    

    if (!name || !categoryId || !stock || !variation){
       return logError(req, res, 400, 'Invalid entries, please refers to K-Link Api Documentation');
    }

    try {
      let prodGroupVal = await ProductGroupingKmart.count({
         where : {name:name}
      })

      if(prodGroupVal >= 1){
         return logError(req, res, 400, 'Duplicate product name');
      }

      for (let param of variation){
        if(!param.productCode){
          return logError(req, res, 400, 'Invalid entries: productCode. Please refers to K-Link Api Documentation');
        }

        let prodDetailVal = await ProductDetailKmart.count({
          where : {product_code : param.productCode}
        })

        if (prodDetailVal >= 1){
          return logError(req, res, 400, 'Duplicate productCode variation');
        } 
      }
       
      transaction = await kmartDB.transaction();
      let prodGrouping = await ProductGroupingKmart.create({
           id_category: categoryId,
           type: type,
           name: name,
           alias_name:name,
           img: img,
           description: description,
           tag: tag,
           stock: stock,
           paket_bundling: paketBundling,
           updated_by: 99,
      }, {transaction})

      for (let [i, param] of variation.entries()) {
        let id_klink = prodGrouping.id+name.substring(0,3)+i;
        let val = {
           product_code: param.productCode,
           product_grouping_id: prodGrouping.id,
           id_klink: id_klink,
           weight: param.weight,
           package: param.package,
           type: param.type,
           size: param.size,
           volume: param.olume,
           color: param.color,
           color_code: param.colorCode,
           gender: param.gender,
           stock: param.stock,
           free_ongkir: 0,
           reg_no: '',
        }

        let prodDetail = await ProductDetailKmart.create(val,{transaction})  


        for (let [i,pricing] of param.price.entries()) {
          let val ={
           price_code:pricing.priceCode,
           id_klink_product: id_klink,
           product_grouping_id: prodGrouping.id,
           price_member: pricing.priceMember,
           price_customer: pricing.priceCustomer,
           discount: pricing.discount,
           bv: pricing.bv
          }
          let prodPricing = await ProductPricingKmart.create(val,{transaction})  
        }
      }  

      await transaction.commit();
      let dirId = { productId: prodGrouping.id}
      let response = await axios.post('https://k-mart.co.id/api/image_product/createDir',dirId);
      productId = prodGrouping.id
      
      return logSuccess(req, res, 200,{productId}, 'Product '+name+' has been successfully created ')   

    } catch (err) {
         await transaction.rollback();
        console.log(err)
        return internalError(req, res,err )
    }
  
  }


  const destroyProductListKmart = async (req, res) => {
    let {productId} = req.query

    if(!productId){
      return logError(req, res, 400, 'Please put productId in query paramater');
    }
  
    transaction = await kmartDB.transaction();
    try {

      let prodVal = await ProductGroupingKmart.findOne({
        where :{id:productId}
      })

      if (!prodVal){
        return logError(req, res, 400, 'Product Id not found');
      }

      let prodDelete = await ProductGroupingKmart.destroy({
        where : {id : productId}
      }, {transaction})
      let prodDetailDelete= await ProductDetailKmart.destroy({
        where : {product_grouping_id: productId}
      }, {transaction})
      let prodPricingDelete =await ProductPricingKmart.destroy({
        where : {product_grouping_id: productId}
      }, {transaction})
      await transaction.commit();

      let deleted = {
        ProductDeletedRow: prodDelete,
        VariationDeletedRow: prodDetailDelete,
        PricingDeletedRow: prodPricingDelete
      }

      if(prodDelete){
         return logSuccess(req, res, 200,deleted, 'Product ID '+productId+' has been successfully deleted ')   
      } else {
         return logSuccess(req, res, 200,{deletedRow: prodDelete}, 'Success, but no records has been deleted! ')   
      }
    } catch (err) {
        await transaction.rollback();
        console.log(err)
        return internalError(req, res,err )
    }
  }









  return {
    getProductCatList,
    getAllProductList,
    getAllProductListKmart,
    getCatProductListKmart,
    updateCatProductListKmart,
    updateProductListKmart,
    createProductListKmart,
    destroyProductListKmart
  };
};

module.exports = ProductController;
