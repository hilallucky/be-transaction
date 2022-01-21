
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_newivtrp = 'klink_mlm2010_newivtrp';

const Klink_mlm2010_newivtrp = sequelize.define('newivtrp', {
	trcd : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	seqno : {
	          type: Sequelize.INTEGER,  allowNull: false,
	        },
	paytype : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	docno : {
	          type: Sequelize.STRING,  
	        },
	payamt : {
	          type: Sequelize.INTEGER,  
	        },
	deposit : {
	          type: Sequelize.INTEGER,  
	        },
	notes : {
	          type: Sequelize.STRING,  
	        },
	trcd2 : {
	          type: Sequelize.STRING, allowNull: false,
	        },
	voucher : {
	          type: Sequelize.STRING,  
	        },
	vchtype : {
	          type: Sequelize.STRING,  
	        },
	OLtrcd : {
	          type: Sequelize.STRING,  
	        },
	OLtrcd2 : {
	          type: Sequelize.STRING,  
	        },
}, {freezeTableName: true, timestamps: false, klink_mlm2010_newivtrp, hasTrigger: false });

module.exports = Klink_mlm2010_newivtrp;