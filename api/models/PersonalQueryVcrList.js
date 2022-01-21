const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryVcrList = 'queryVcrList';

// const PersonalQueryVcrList = sequelize.define('V_HILAL_VOUCHER_LIST', {
const PersonalQueryVcrList = sequelize.define('V_HILAL_API_VOUCHER_LIST', {
  
		vcode : {
		    type: Sequelize.STRING, 
		  },
		vdescription : {
		    type: Sequelize.STRING, 
		  },
		bv_avaliable : {
		    type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
		  },
		dfno : {
		    type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
		  },	
		fullnm : {
		    type: Sequelize.STRING, primaryKey: true, allowNull: false,
		  },	
		ExpireDate : {
		    type: Sequelize.STRING, 
		  },	
		vtype : {
		    type: Sequelize.STRING, 
		  },	
		vdisc : {
		    type: Sequelize.STRING, 
		  },	
		VoucherAmt : {
		    type: Sequelize.INTEGER, 
		  },	
		status : {
		    type: Sequelize.INTEGER, 
		  },	
		BonusMonth : {
		    type: Sequelize.INTEGER, 
		  },	
		BonusYear : {
		    type: Sequelize.STRING, 
		  },	


}, {freezeTableName: true, timestamps: false, personalQueryVcrList });


module.exports = PersonalQueryVcrList;