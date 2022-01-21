
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_ordivtrh = 'klink_mlm2010_ordivtrh';

const Klink_mlm2010_ordivtrh = sequelize.define('ordivtrh', {
    ordtype : {
          type: Sequelize.STRING,  
        },
	dfno : {
	          type: Sequelize.STRING,  
	        },
	orderno : {
	          type: Sequelize.STRING,  
	        },
	remarks : {
	          type: Sequelize.STRING,  
	        },
	seq : {
	          type: Sequelize.INTEGER,  
	        },
	invoiceno : {
	          type: Sequelize.STRING, primaryKey: true, allowNull: false,
	        },
	invoicedt : {
	          type: Sequelize.STRING,  
	        },
	etdt : {
	          type: Sequelize.STRING,  
	        },
	bnsperiod : {
	          type: Sequelize.STRING,  
	        },
	loccd : {
	          type: Sequelize.STRING,  
	        },
	pricecode : {
	          type: Sequelize.STRING,  
	        },
	ship : {
	          type: Sequelize.STRING,  
	        },shipto : {
          type: Sequelize.STRING,  
        },
	registerno : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	registerdt : {
	          type: Sequelize.STRING,  
	        },
	branch : {
	          type: Sequelize.STRING,  
	        },
	whcd : {
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
	othdisc : {
	          type: Sequelize.INTEGER,  
	        },
	note : {
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
	trcd : {
	          type: Sequelize.STRING,  
	        },
	trtype : {
	          type: Sequelize.STRING,  
	        },
	trdt : {
	          type: Sequelize.STRING,  
	        },
	totpay : {
	          type: Sequelize.INTEGER,  
	        },
	paycash : {
	          type: Sequelize.INTEGER,  
	        },
	payvoucher : {
	          type: Sequelize.INTEGER,  
	        },
	subtotal : {
	          type: Sequelize.INTEGER,  
	        },
	shipname : {
	          type: Sequelize.STRING,  
	        },
	shipcity : {
	          type: Sequelize.STRING,  
	        },
	shipstate : {
	          type: Sequelize.STRING,  
	        },
	shipaddr1 : {
	          type: Sequelize.STRING,  
	        },
	shipaddr2 : {
	          type: Sequelize.STRING,  
	        },
	shipzip : {
	          type: Sequelize.STRING,  
	        },
	shipcountry : {
	          type: Sequelize.STRING,  
	        },
	shipemail : {
	          type: Sequelize.STRING,  
	        },
	shipnote : {
	          type: Sequelize.STRING,  
	        },
	bankaccno : {
	          type: Sequelize.STRING,  
	        },
	bankaccnm : {
	          type: Sequelize.STRING,  
	        },
	bankid : {
	          type: Sequelize.STRING,  
	        },
	bankbranch : {
	          type: Sequelize.STRING,  
	        },
	bankcity : {
	          type: Sequelize.STRING,  
	        },
	cctype : {
	          type: Sequelize.STRING,  
	        },
	ccnum : {
	          type: Sequelize.STRING,  
	        },
	ccexpiry : {
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
	paynote1 : {
	          type: Sequelize.STRING,  
	        },
	paynote2 : {
	          type: Sequelize.STRING,  
	        },
	paynote3 : {
	          type: Sequelize.STRING,  
	        },
	taxable : {
	          type: Sequelize.INTEGER,  
	        },
	taxableamt : {
	          type: Sequelize.INTEGER,  
	        },
	batchno : {
	          type: Sequelize.STRING,  
	        },
	docno : {
	          type: Sequelize.STRING,  
	        },
	bill : {
	          type: Sequelize.STRING,  
	        },
	billto : {
	          type: Sequelize.STRING,  
	        },
	billname : {
	          type: Sequelize.STRING,  
	        },
	billcity : {
	          type: Sequelize.STRING,  
	        },
	billstate : {
	          type: Sequelize.STRING,  
	        },
	billaddr1 : {
	          type: Sequelize.STRING,  
	        },
	billaddr2 : {
	          type: Sequelize.STRING,  
	        },
	billzip : {
	          type: Sequelize.STRING,  
	        },
	billcountry : {
	          type: Sequelize.STRING,  
	        },
	billemail : {
	          type: Sequelize.STRING,  
	        },
	iplastupd : {
	          type: Sequelize.STRING,  
	        },
	sc_dfno : {
	          type: Sequelize.STRING,  
	        },
	batchscno : {
	          type: Sequelize.STRING,  
	        },
	dfno2 : {
	          type: Sequelize.STRING,  
	        },
	flag_paid : {
	          type: Sequelize.STRING,  
	        },
	receiptno : {
	          type: Sequelize.STRING,  
	        },
	applyto : {
	          type: Sequelize.STRING,  
	        },
	category : {
	          type: Sequelize.STRING,  
	        },
	GOLregisterno : {
	          type: Sequelize.STRING,  
	        },
	GOLinvoiceno : {
	          type: Sequelize.STRING,  
	        },
	GOLreceiptno : {
	          type: Sequelize.STRING,  
	        },
	OLstatus : {
	          type: Sequelize.STRING,  
	        },


}, {freezeTableName: true, timestamps: false, klink_mlm2010_ordivtrh, hasTrigger: false });

module.exports = Klink_mlm2010_ordivtrh;