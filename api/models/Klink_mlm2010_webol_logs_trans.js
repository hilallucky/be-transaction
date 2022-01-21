
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const klink_mlm2010_webol_logs_trans = 'klink_mlm2010_webol_logs_trans';

const Klink_mlm2010_webol_logs_trans = sequelize.define('webol_logs_trans', {
    orderno : {
          type: Sequelize.STRING,  allowNull: false,
        },
	usr_login : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	id_memb : {
	          type: Sequelize.STRING,  allowNull: false,
	        },
	namamember : {
	          type: Sequelize.STRING,  
	        },
	datetrans : {
	          type: Sequelize.STRING,  
	        },
	ipaddress : {
	          type: Sequelize.STRING,  
	        },

}, {freezeTableName: true, timestamps: false, klink_mlm2010_webol_logs_trans, hasTrigger: false });

module.exports = Klink_mlm2010_webol_logs_trans;