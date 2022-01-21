
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_ordivtrd = 'klink_mlm2010_ordivtrd';

const Klink_mlm2010_ordivtrd = sequelize.define('ordivtrd', {
	registerno : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	invoiceno : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	prdcd : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	uom : {
	          type: Sequelize.STRING,  
	        },
	qtyord : {
	          type: Sequelize.INTEGER,  
	        },
	qtyship : {
	          type: Sequelize.INTEGER,  
	        },
	qtyremain : {
	          type: Sequelize.INTEGER,  
	        },
	dp : {
	          type: Sequelize.INTEGER,  
	        },
	pv : {
	          type: Sequelize.INTEGER,  
	        },
	bv : {
	          type: Sequelize.INTEGER,  
	        },
	pricecode : {
	          type: Sequelize.STRING,  
	        },
	taxrate : {
	          type: Sequelize.INTEGER,  
	        },
	trcd : {
	          type: Sequelize.STRING,  
	        },
	unit : {
	          type: Sequelize.STRING,  
	        },
	sp : {
	          type: Sequelize.INTEGER,  
	        },
	sb : {
	          type: Sequelize.INTEGER,  
	        },
	sentby : {
	          type: Sequelize.STRING,  
	        },
	filenm : {
	          type: Sequelize.STRING,  
	        },
	promocd : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	indexfree : {
	          type: Sequelize.INTEGER,  allowNull: false,
	        },
	kit : {
	          type: Sequelize.STRING,  
	        },
	OLinvoiceno : {
	          type: Sequelize.STRING,  
	        },
	OLregisterno : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_ordivtrd, hasTrigger: false });

module.exports = Klink_mlm2010_ordivtrd;