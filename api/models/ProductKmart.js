const Sequelize = require('sequelize');
const sequelize = require('../../config/db/k_mart_conn');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_products_grouping = 'klink_products_grouping';
const klink_products_pricing = 'klink_products_pricing';
const klink_products_detail = 'klink_products_detail';

const klink_products_cat= 'klink_categories';


const ProductGroupingKmart = sequelize.define('klink_products_grouping', {
  
id : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,  autoIncrement: true,
  },
id_category : {
    type: Sequelize.STRING, 
  },
type : {
    type: Sequelize.STRING, 
  },
name : {
    type: Sequelize.STRING, 
  },
img : {
    type: Sequelize.STRING, 
  },
alias_name: {
    type: Sequelize.STRING, 
  },
description : {
    type: Sequelize.STRING, 
  },
tag : {
    type: Sequelize.STRING, 
  },
flag : {
    type: Sequelize.STRING, 
  },
stock : {
    type: Sequelize.STRING, 
  },
paket_bundling : {
    type: Sequelize.STRING, 
  },
createdAt: { type: Sequelize.DATE, field: 'created_at' },
updatedAt: { type: Sequelize.DATE, field: 'updated_at' },
// deletedAt: { type: Sequelize.DATE, field: 'deleted_at' }


}, {freezeTableName: true, timestamps: true, underscored: true, table_products_grouping });



const ProductPricingKmart = sequelize.define('klink_products_pricing', {
  
id : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false, autoIncrement: true,
  },
product_grouping_id : {
    type: Sequelize.STRING, allowNull: false,
  },
 id_klink_product : {
    type: Sequelize.STRING, allowNull: false,
  },
price_code : {
    type: Sequelize.STRING, allowNull: false,
  },
price_customer : {
    type: Sequelize.STRING, allowNull: false,
  },
price_member : {
    type: Sequelize.STRING, allowNull: false,
  },
discount : {
    type: Sequelize.STRING, 
  },
bv : {
    type: Sequelize.STRING, allowNull: false,
  },
updated_at : {
    type: Sequelize.STRING, 
  },
  createdAt: { type: Sequelize.DATE, field: 'created_at' },
  updatedAt: { type: Sequelize.DATE, field: 'updated_at' },

}, {freezeTableName: true, timestamps: true, klink_products_pricing,  });


const ProductDetailKmart = sequelize.define('klink_products_detail', {
  
id : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false, autoIncrement: true,
  },
id_klink : {
    type: Sequelize.STRING, 
  },
product_grouping_id : {
    type: Sequelize.STRING,  allowNull: false
  },
reg_no : {
    type: Sequelize.STRING, 
  },
product_code : {
    type: Sequelize.STRING, allowNull: false
  },
weight : {
    type: Sequelize.STRING, 
  },
type : {
    type: Sequelize.STRING, 
  },
size : {
    type: Sequelize.STRING, 
  },
volume : {
    type: Sequelize.STRING, 
  },
color : {
    type: Sequelize.STRING, 
  },
color_code   : {
    type: Sequelize.STRING, 
  },
gender : {
    type: Sequelize.STRING, 
  },
package : {
    type: Sequelize.STRING, 
  },
stock : {
    type: Sequelize.STRING, 
  },
free_ongkir : {
    type: Sequelize.STRING, 
  },
createdAt: { type: Sequelize.DATE, field: 'created_at' },
updatedAt: { type: Sequelize.DATE, field: 'updated_at' },

}, {freezeTableName: true, timestamps: true, klink_products_detail,  });

const ProductCatKmart = sequelize.define('klink_categories', {
  
id: {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
id_klink: {
    type: Sequelize.STRING, 
  },
id_parent : {
    type: Sequelize.STRING, 
  },
name : {
    type: Sequelize.STRING, 
  },
description : {
    type: Sequelize.STRING, 
  },

}, {freezeTableName: true, timestamps: false, klink_products_cat,  });


ProductGroupingKmart.hasMany(ProductDetailKmart,{foreignKey: "product_grouping_id", as :'variation'});
ProductDetailKmart.hasMany(ProductPricingKmart,{sourceKey :"id_klink", foreignKey: "id_klink_product", as :'price'});

module.exports = {ProductGroupingKmart,ProductPricingKmart, ProductDetailKmart, ProductCatKmart};