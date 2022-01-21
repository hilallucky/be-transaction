
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_billivhdr = 'klink_mlm2010_billivhdr';

const Klink_mlm2010_billivhdr = sequelize.define('billivhdr', {
    trcd : {
          type: Sequelize.STRING, primaryKey: true, allowNull: false,
        },
	etdt : {
	          type: Sequelize.STRING,  
	        },
	trdt : {
	          type: Sequelize.STRING,  
	        },
	dfno : {
	          type: Sequelize.STRING,  
	        },
	applyto : {
	          type: Sequelize.STRING, allowNull: false,
	        },
	payamt : {
	          type: Sequelize.INTEGER,  
	        },
	note1 : {
	          type: Sequelize.STRING,  
	        },
	note2 : {
	          type: Sequelize.STRING,  
	        },
	note3 : {
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
	loccd : {
	          type: Sequelize.STRING,  
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
	totinvoice : {
	          type: Sequelize.INTEGER,  
	        },
	othdisc : {
	          type: Sequelize.INTEGER,  
	        },
	paynote : {
	          type: Sequelize.STRING,  
	        },
	totpay : {
	          type: Sequelize.INTEGER,  
	        },
	dono : {
	          type: Sequelize.STRING,  
	        },
	statusbo : {
	          type: Sequelize.STRING,  
	        },
	flag_ship : {
	          type: Sequelize.STRING,  
	        },
	post_chasier : {
	          type: Sequelize.STRING,  
	        },
	postdt_chasier : {
	          type: Sequelize.STRING,  
	        },
	post_finance : {
	          type: Sequelize.STRING,  
	        },
	postdt_finance : {
	          type: Sequelize.STRING,  
	        },
	post_acct : {
	          type: Sequelize.STRING,  
	        },
	postdt_acct : {
	          type: Sequelize.STRING,  
	        },
	flagOL : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_billivhdr, hasTrigger: false });

module.exports = Klink_mlm2010_billivhdr;