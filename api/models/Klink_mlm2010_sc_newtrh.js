
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_sc_newtrh = 'klink_mlm2010_sc_newtrh';

const Klink_mlm2010_sc_newtrh = sequelize.define('sc_newtrh', {
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
	batchno : {
	          type: Sequelize.STRING,  
	        },
	docno : {
	          type: Sequelize.STRING,  
	        },
	branch : {
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
	taxable : {
	          type: Sequelize.INTEGER,  
	        },
	taxableamt : {
	          type: Sequelize.INTEGER,  
	        },
	stockdt : {
	          type: Sequelize.STRING,  
	        },
	ordtype : {
	          type: Sequelize.STRING,  
	        },
	createdt : {
	          type: Sequelize.STRING,  
	        },
	cnid : {
	          type: Sequelize.STRING,  
	        },
	orderno : {
	          type: Sequelize.STRING,  
	        },
	sjno : {
	          type: Sequelize.STRING,  
	        },
	type : {
	          type: Sequelize.STRING,  
	        },
	taxcd : {
	          type: Sequelize.STRING,  
	        },
	scdiscrate : {
	          type: Sequelize.INTEGER,  
	        },
	scdiscamt : {
	          type: Sequelize.INTEGER,  
	        },
	fr_formno : {
	          type: Sequelize.STRING,  
	        },
	to_formno : {
	          type: Sequelize.STRING,  
	        },
	sctype : {
	          type: Sequelize.STRING,  
	        },
	scdisc : {
	          type: Sequelize.STRING,  
	        },
	generate : {
	          type: Sequelize.STRING,  
	        },
	statusbo : {
	          type: Sequelize.STRING,  
	        },
	syn2web : {
	          type: Sequelize.STRING,  
	        },
	regtype : {
	          type: Sequelize.STRING,  
	        },
	n_bc : {
	          type: Sequelize.INTEGER,  
	        },
	used_for : {
	          type: Sequelize.STRING,  
	        },
	status : {
	          type: Sequelize.STRING,  
	        },
	placenode : {
	          type: Sequelize.STRING,  
	        },
	applyto : {
	          type: Sequelize.STRING,  
	        },
	autorecon : {
	          type: Sequelize.STRING,  
	        },
	first_trx : {
	          type: Sequelize.STRING,  
	        },
	origloccd : {
	          type: Sequelize.STRING,  
	        },
	bc : {
	          type: Sequelize.STRING,  
	        },
	errlogs : {
	          type: Sequelize.STRING,  
	        },
	csno : {
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
	note : {
	          type: Sequelize.STRING,  
	        },
	othdisc : {
	          type: Sequelize.INTEGER,  
	        },
	batchdt : {
	          type: Sequelize.STRING,  
	        },
	flag_batch : {
	          type: Sequelize.STRING,  
	        },
	batchstatus : {
	          type: Sequelize.STRING,  
	        },
	flag_recover : {
	          type: Sequelize.STRING,  
	        },
	system : {
	          type: Sequelize.STRING,  
	        },
	ttptype : {
	          type: Sequelize.STRING,  
	        },
	filename : {
	          type: Sequelize.STRING,  
	        },
	entrytype : {
	          type: Sequelize.STRING,  
	        },
	sc_co_offline : {
	          type: Sequelize.STRING,  
	        },
	flag_show : {
	          type: Sequelize.STRING,  
	        },
	flag_approval : {
	          type: Sequelize.STRING,  
	        },
	trcd2 : {
	          type: Sequelize.STRING,  
	        },
	OLcsno : {
	          type: Sequelize.STRING,  
	        },
	flag_editable : {
	          type: Sequelize.STRING,  
	        },
	kitprdcd : {
	          type: Sequelize.STRING,  
	        },
	no_deposit : {
	          type: Sequelize.STRING,  
	        },
	id_deposit : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_sc_newtrh, hasTrigger: false });

module.exports = Klink_mlm2010_sc_newtrh;