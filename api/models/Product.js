const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_product = 'V_Ecomm_PriceList_Baru';

const Product = sequelize.define('V_Ecomm_PriceList_Baru', {
  
prdcd : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
prdnm : {
    type: Sequelize.STRING, 
  },
description : {
    type: Sequelize.STRING, 
  },
prdcdcat : {
    type: Sequelize.STRING, 
  },
prdnmcatnm : {
    type: Sequelize.STRING, 
  },
img_url : {
    type: Sequelize.STRING, 
  },
price_w : {
    type: Sequelize.STRING, 
  },
price_e : {
    type: Sequelize.STRING, 
  },
price_cw : {
    type: Sequelize.STRING, 
  },
price_ce : {
    type: Sequelize.STRING, 
  },
bv : {
    type: Sequelize.STRING, 
  },
weight : {
    type: Sequelize.STRING, 
  },
ecomm_status : {
    type: Sequelize.STRING, 
  },
is_discontinue: {
    type: Sequelize.STRING, 
  },
max_order : {
    type: Sequelize.STRING, 
  },

}, {freezeTableName: true, timestamps: false, table_product });


module.exports = Product;