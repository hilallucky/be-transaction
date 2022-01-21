
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_newivtrd = 'klink_mlm2010_newivtrd';

const Klink_mlm2010_newivtrd = sequelize.define('newivtrd', {
	trcd : {
	          type: Sequelize.STRING,  
	        },
	prdcd : {
	          type: Sequelize.STRING,  
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
	taxrate : {
	          type: Sequelize.INTEGER,  
	        },
	unit : {
	          type: Sequelize.STRING,  
	        },
	scdisc : {
	          type: Sequelize.INTEGER,  
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
	taxcd : {
	          type: Sequelize.STRING,  
	        },
	seqno : {
	          type: Sequelize.INTEGER,  
	        },
	scdiscamt : {
	          type: Sequelize.INTEGER,  
	        },
	filename : {
	          type: Sequelize.STRING,  
	        },
	kit : {
	          type: Sequelize.STRING,  
	        },
	pricecode : {
	          type: Sequelize.STRING,  
	        },
	promocd : {
	          type: Sequelize.STRING,  
	        },
	indexfree : {
	          type: Sequelize.INTEGER,  
	        },
	OLtrcd : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_newivtrd, hasTrigger: false });

module.exports = Klink_mlm2010_newivtrd;