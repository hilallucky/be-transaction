
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_ordivhdr = 'klink_mlm2010_ordivhdr';

const Klink_mlm2010_ordivhdr = sequelize.define('ordivhdr', {
    dfno : {
          type: Sequelize.STRING,  allowNull: false,
        },
	onlinetype : {
	          type: Sequelize.STRING,  
	        },
	bnsperiod : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	loccd : {
	          type: Sequelize.STRING,  
	        },
	pricecode : {
	          type: Sequelize.STRING,  
	        },
	remarks : {
	          type: Sequelize.STRING,  
	        },
	registerno : {
	          type: Sequelize.STRING, primaryKey: true, allowNull: false,
	        },
	registerdt : {
	          type: Sequelize.STRING,  
	        },
	etdt : {
	          type: Sequelize.STRING,  
	        },
	branch : {
	          type: Sequelize.STRING,  
	        },
	orderno : {
	          type: Sequelize.STRING,  
	        },
	ship : {
	          type: Sequelize.STRING,  
	        },
	shipto : {
	          type: Sequelize.STRING,  
	        },
	shipto : {
          type: Sequelize.STRING,  
        },
	shipnote : {
	          type: Sequelize.STRING,  
	        },
	whcd : {
	          type: Sequelize.STRING,  
	        },
	totinvoice : {
	          type: Sequelize.INTEGER,  
	        },
	tpv : {
	          type: Sequelize.INTEGER,  
	        },
	tbv : {
	          type: Sequelize.INTEGER,  
	        },
	tdp : {
	          type: Sequelize.INTEGER,  
	        },
	npv : {
	          type: Sequelize.INTEGER,  
	        },
	nbv : {
	          type: Sequelize.INTEGER,  
	        },
	ndp : {
	          type: Sequelize.INTEGER,  
	        },
	discamt : {
	          type: Sequelize.INTEGER,  
	        },
	taxamt : {
	          type: Sequelize.INTEGER,  
	        },
	shcharge : {
	          type: Sequelize.INTEGER,  
	        },
	othcharge : {
	          type: Sequelize.INTEGER,  
	        },
	othdisc : {
	          type: Sequelize.INTEGER,  
	        },
	paynote : {
	          type: Sequelize.STRING,  
	        },
	post : {
	          type: Sequelize.STRING,  
	        },
	createnm : {
	          type: Sequelize.STRING,  
	        },
	createdt : {
	          type: Sequelize.STRING,  
	        },
	updatenm : {
	          type: Sequelize.STRING,  
	        },
	updatedt : {
	          type: Sequelize.STRING,  
	        },
	totpay : {
	          type: Sequelize.INTEGER,  
	        },
	iplastupd : {
	          type: Sequelize.STRING,  
	        },
	trcd : {
	          type: Sequelize.STRING,  
	        },
	trdt : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_ordivhdr, hasTrigger: false });

module.exports = Klink_mlm2010_ordivhdr;