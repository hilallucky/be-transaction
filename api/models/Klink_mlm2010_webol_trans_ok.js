
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_webol_trans_ok = 'klink_mlm2010_webol_trans_ok';

const Klink_mlm2010_webol_trans_ok = sequelize.define('webol_trans_ok', {
    id : {
          type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
        },
	orderno : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	bankaccno : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	token : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	id_memb : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	nmmember : {
	          type: Sequelize.STRING,  
	        },
	total_pay : {
	          type: Sequelize.INTEGER,  allowNull: false,
	        },
	total_bv : {
	          type: Sequelize.INTEGER,  allowNull: false,
	        },
	pricecode : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	bonusmonth : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	datetrans : {
	          type: Sequelize.STRING,  
	        },
	idstk : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	nmstkk : {
	          type: Sequelize.STRING,  
	        },
	status : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	secno : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	flag_trx : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	sentTo : {
	          type: Sequelize.STRING,  
	        },
	SSRno : {
	          type: Sequelize.STRING,  
	        },
	REGISTERno : {
	          type: Sequelize.STRING,  
	        },
	CNno : {
	          type: Sequelize.STRING,  
	        },
	KWno : {
	          type: Sequelize.STRING,  
	        },
	IPno : {
	          type: Sequelize.STRING,  
	        },
	CNstatus : {
	          type: Sequelize.STRING,  
	        },
	KWstatus : {
	          type: Sequelize.STRING,  
	        },
	IPstatus : {
	          type: Sequelize.STRING,  
	        },
	dateKW : {
	          type: Sequelize.STRING,  
	        },
	dateCN : {
	          type: Sequelize.STRING,  
	        },
	dateIP : {
	          type: Sequelize.STRING,  
	        },
	usrKW : {
	          type: Sequelize.STRING,  
	        },
	eod_status : {
	          type: Sequelize.STRING,  
	        },
	is_ecommerce : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_webol_trans_ok, hasTrigger: false });

module.exports = Klink_mlm2010_webol_trans_ok;