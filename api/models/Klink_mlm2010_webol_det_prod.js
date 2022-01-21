
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_webol_det_prod = 'klink_mlm2010_webol_det_prod';

const Klink_mlm2010_webol_det_prod = sequelize.define('webol_det_prod', {
	orderno : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	prdcd : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	prdnm : {
	          type: Sequelize.STRING,  
	        },
	qty : {
	          type: Sequelize.INTEGER,  
	        },
	bvr : {
	          type: Sequelize.INTEGER,  allowNull: false,
	        },
	dpr : {
	          type: Sequelize.INTEGER,  allowNull: false,
	        },
	pricecode : {
	          type: Sequelize.STRING,  
	        },
	sentTo : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_webol_det_prod, hasTrigger: false });

module.exports = Klink_mlm2010_webol_det_prod;