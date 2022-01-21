const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const stockistList = 'stockistList';

const StockistList = sequelize.define('mssc', {
      loccd : {
          type: Sequelize.STRING, primaryKey: true, allowNull: false,
              },
      fullnm : {
                type: Sequelize.STRING, 
              },
      addr1 : {
                type: Sequelize.STRING, 
              },
      addr2 : {
                type: Sequelize.STRING, 
              },
      addr3 : {
                type: Sequelize.STRING, 
              },
      city : {
                type: Sequelize.STRING, 
              },
	    state : {
	              type: Sequelize.STRING, 
	              },
	    postcd : {
	              type: Sequelize.STRING, 
	              },
	    country : {
	                type: Sequelize.STRING, 
	              },
	    tel_hm : {
	                type: Sequelize.STRING, 
	              },
	    tel_of : {
	                type: Sequelize.STRING, 
	              },
	    tel_hp : {
                type: Sequelize.STRING, 
              },
 	    pricecode : {
                type: Sequelize.STRING, 
              },
 	    status : {
                type: Sequelize.STRING, 
              },
      scstatus : {
                type: Sequelize.STRING, 
              },
	    whcd : {
                type: Sequelize.STRING, 
              },
	    onlinetype : {
                type: Sequelize.STRING, 
              },
	    memberprefix : {
                type: Sequelize.STRING, 
              },
	    bnsstmsc : {
                type: Sequelize.STRING, 
              },
	    lastcodememb : {
                type: Sequelize.STRING, 
              },
	    grade : {
                type: Sequelize.STRING, 
              },
	    basepercentage : {
                type: Sequelize.STRING, 
              },
	    oversea : {
                type: Sequelize.STRING, 
              },
	    latitude : {
                type: Sequelize.STRING, 
              },
	    longitude : {
                type: Sequelize.STRING, 
              },
	    is_warehouse : {
                type: Sequelize.STRING, 
              },
	    klink_event : {
                type: Sequelize.STRING, 
              },
	    stk_area : {
                type: Sequelize.STRING, 
              },
	    pricecode2 : {
                type: Sequelize.STRING, 
              },

     

}, {freezeTableName: true, timestamps: false,  hasTrigger: true, stockistList });


module.exports = StockistList;



