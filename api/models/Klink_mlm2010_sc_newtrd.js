
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_sc_newtrd = 'klink_mlm2010_sc_newtrd';

const Klink_mlm2010_sc_newtrd = sequelize.define('sc_newtrd', {
	trcd : {
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
	taxrate : {
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
	scdisc : {
	          type: Sequelize.INTEGER,  
	        },
	seqno : {
	          type: Sequelize.INTEGER,  
	        },
	scdiscamt : {
	          type: Sequelize.INTEGER,  
	        },
	syn2web : {
	          type: Sequelize.STRING,  
	        },
	qty_used : {
	          type: Sequelize.INTEGER,  
	        },
	qty_avail : {
	          type: Sequelize.INTEGER,  
	        },
	filename : {
	          type: Sequelize.STRING,  
	        },
	promocd : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	pricecode : {
	          type: Sequelize.STRING,  
	        },
	indexfree : {
	          type: Sequelize.INTEGER,  allowNull: false,
	        },
	bv_split : {
	          type: Sequelize.INTEGER,  
	        },
	interval_split : {
	          type: Sequelize.INTEGER,  
	        },
	is_bv_fix : {
	          type: Sequelize.STRING,  
	        },
	qtyxdp : {
	          type: Sequelize.INTEGER,  
	        },
	qtyxbv : {
	          type: Sequelize.INTEGER,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_sc_newtrd, hasTrigger: false });

module.exports = Klink_mlm2010_sc_newtrd;