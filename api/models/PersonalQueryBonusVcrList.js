const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusVcrList = 'queryBonusVcrList';

const PersonalQueryBonusVcrList = sequelize.define('V_HILAL_API_MEM_BONUS_VCR_LIST', {
  
		voucherNo : {
		    type: Sequelize.STRING, 
		  },
		voucherkey : {
		    type: Sequelize.STRING, 
		  },
		bonusMonth : {
		    type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
		  },
		bonusYear : {
		    type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
		  },	
		distributorCode : {
		    type: Sequelize.STRING, primaryKey: true, allowNull: false,
		  },	
		fullnm : {
		    type: Sequelize.STRING, 
		  },	
		vchtype : {
		    type: Sequelize.STRING, 
		  },	
		currencyNote : {
		    type: Sequelize.STRING, 
		  },	
		voucherAmt : {
		    type: Sequelize.INTEGER, 
		  },	
		voucherAmtCurr : {
		    type: Sequelize.INTEGER, 
		  },	
		status : {
		    type: Sequelize.INTEGER, 
		  },	
		state : {
		    type: Sequelize.STRING, 
		  },	
		country : {
		    type: Sequelize.STRING, 
		  },	
		tgl_expire : {
		    type: Sequelize.INTEGER, 
		  },	
		ExpireDate : {
		    type: Sequelize.DATE, 
		  },	
		IssueDate : {
		    type: Sequelize.DATE, 
		  },	
		claimstatus : {
		    type: Sequelize.INTEGER, 
		  },	
		loccd : {
		    type: Sequelize.INTEGER, 
		  },	
		claim_date : {
		    type: Sequelize.DATE, 
		  },	
		periode_bns : {
		    type: Sequelize.STRING, 
		  },	
		PERIODEX : {
		    type: Sequelize.STRING, 
		  },	


}, {freezeTableName: true, timestamps: false, personalQueryBonusVcrList });


module.exports = PersonalQueryBonusVcrList;