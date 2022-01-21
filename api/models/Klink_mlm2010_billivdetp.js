
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_billivdetp = 'klink_mlm2010_billivdetp';

const Klink_mlm2010_billivdetp = sequelize.define('billivdetp', {
	trcd : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	seqno : {
	          type: Sequelize.INTEGER,
	        },
	paytype : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	docno : {
	          type: Sequelize.STRING,  
	        },
	payamt : {
	          type: Sequelize.INTEGER,  allowNull: false,
	        },
	deposit : {
	          type: Sequelize.INTEGER,  
	        },
	notes : {
	          type: Sequelize.STRING,  
	        },
	OLtrcd : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_billivdetp, hasTrigger: false });

module.exports = Klink_mlm2010_billivdetp;