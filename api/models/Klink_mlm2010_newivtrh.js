
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_newivtrh = 'klink_mlm2010_newivtrh';

const Klink_mlm2010_newivtrh = sequelize.define('newivtrh', {
    trcd : {
          type: Sequelize.STRING, primaryKey: true, allowNull: false,
        },
	trtype : {
	          type: Sequelize.STRING,  
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
	loccd : {
	          type: Sequelize.STRING,  
	        },
	tdp : {
	          type: Sequelize.INTEGER,  
	        },
	taxrate : {
	          type: Sequelize.INTEGER,  
	        },
	taxamt : {
	          type: Sequelize.INTEGER,  
	        },
	scdiscrate : {
	          type: Sequelize.INTEGER,  
	        },
	scdiscamt : {
	          type: Sequelize.INTEGER,  
	        },
	discamt : {
	          type: Sequelize.INTEGER,  
	        },
	shcharge : {
	          type: Sequelize.INTEGER,  
	        },
	othcharge : {
	          type: Sequelize.INTEGER,  
	        },
	tpv : {
	          type: Sequelize.INTEGER,  
	        },
	tbv : {
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
	whcd : {
	          type: Sequelize.STRING,  
	        },
	docno : {
	          type: Sequelize.STRING,  
	        },
	branch : {
	          type: Sequelize.STRING,  
	        },
	fr_formno : {
	          type: Sequelize.STRING,  
	        },
	to_formno : {
	          type: Sequelize.STRING,  
	        },
	batchno : {
	          type: Sequelize.STRING,  
	        },
	pricecode : {
	          type: Sequelize.STRING,  
	        },
	paytype1 : {
	          type: Sequelize.STRING,  
	        },
	paytype2 : {
	          type: Sequelize.STRING,  
	        },
	paytype3 : {
	          type: Sequelize.STRING,  
	        },
	pay1amt : {
	          type: Sequelize.INTEGER,  
	        },
	pay2amt : {
	          type: Sequelize.INTEGER,  
	        },
	pay3amt : {
	          type: Sequelize.INTEGER,  
	        },
	totpay : {
	          type: Sequelize.INTEGER,  
	        },
	paynote1 : {
	          type: Sequelize.STRING,  
	        },
	paynote2 : {
	          type: Sequelize.STRING,  
	        },
	paynote3 : {
	          type: Sequelize.STRING,  
	        },
	ship : {
	          type: Sequelize.STRING,  
	        },
	shipto : {
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
	shipnote : {
	          type: Sequelize.STRING,  
	        },
	post : {
	          type: Sequelize.STRING,  
	        },
	sctype : {
	          type: Sequelize.STRING,  
	        },
	sp : {
	          type: Sequelize.INTEGER,  
	        },
	sb : {
	          type: Sequelize.INTEGER,  
	        },
	scdisc : {
	          type: Sequelize.STRING,  
	        },
	sentby : {
	          type: Sequelize.STRING,  
	        },
	filenm : {
	          type: Sequelize.STRING,  
	        },
	taxableamt : {
	          type: Sequelize.INTEGER,  
	        },
	orderno : {
	          type: Sequelize.STRING,  
	        },
	sjno : {
	          type: Sequelize.STRING,  
	        },
	generate : {
	          type: Sequelize.STRING,  
	        },
	statusbo : {
	          type: Sequelize.STRING,  
	        },
	taxcd : {
	          type: Sequelize.STRING,  
	        },
	type : {
	          type: Sequelize.STRING,  
	        },
	cnid : {
	          type: Sequelize.STRING,  
	        },
	ordtype : {
	          type: Sequelize.STRING,  
	        },
	status : {
	          type: Sequelize.STRING,  
	        },
	origloccd : {
	          type: Sequelize.STRING,  
	        },
	scurrency_cd : {
	          type: Sequelize.STRING,  
	        },
	fullnm : {
	          type: Sequelize.STRING,  
	        },
	numofkit : {
	          type: Sequelize.INTEGER,  
	        },
	lastkitno : {
	          type: Sequelize.STRING,  
	        },
	sc_dfno : {
	          type: Sequelize.STRING,  
	        },
	sc_co : {
	          type: Sequelize.STRING,  
	        },
	bnsperiod : {
	          type: Sequelize.STRING,  
	        },
	remarks : {
	          type: Sequelize.STRING,  
	        },
	othdisc : {
	          type: Sequelize.INTEGER,  
	        },
	note : {
	          type: Sequelize.STRING,  
	        },
	totinvoice : {
	          type: Sequelize.INTEGER,  
	        },
	receiptno : {
	          type: Sequelize.STRING,  
	        },
	seq : {
	          type: Sequelize.INTEGER,  
	        },
	words : {
	          type: Sequelize.STRING,  
	        },
	batchscno : {
	          type: Sequelize.STRING,  
	        },
	invoiceno : {
	          type: Sequelize.STRING,  
	        },
	applyto : {
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
	category : {
	          type: Sequelize.STRING,  
	        },
	ttptype : {
	          type: Sequelize.STRING,  
	        },
	taxno : {
	          type: Sequelize.STRING,  
	        },
}, {freezeTableName: true, timestamps: false, klink_mlm2010_newivtrh, hasTrigger: false });

module.exports = Klink_mlm2010_newivtrh;