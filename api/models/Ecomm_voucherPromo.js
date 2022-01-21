const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

const tbl_ecomm_voucherPromo = 'dataVoucherGift';

const Ecomm_voucherPromo = sequelize.define('ecomm_voucherPromo', {

id : {
    type: Sequelize.INTEGER, 
  },
voucherno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
dfno : {
    type: Sequelize.STRING, allowNull: false,
  },
fullnm : {
    type: Sequelize.STRING, 
  },
voucherAmt : {
    type: Sequelize.STRING, 
  },
is_freeproduct : {
    type: Sequelize.STRING, 
  },
status : {
    type: Sequelize.STRING, 
  },
claimStatus : {
    type: Sequelize.STRING, 
  },
voucherkey : {
    type: Sequelize.STRING, 
  },
createddt : {
    type: Sequelize.STRING, 
  },
activateddt : {
    type: Sequelize.STRING, 
  },
ip_activated : {
    type: Sequelize.STRING, 
  },
browsertype_actived : {
    type: Sequelize.STRING, 
  },
claimeddt : {
    type: Sequelize.STRING, 
  },
ip_claimed : {
    type: Sequelize.STRING, 
  },
browsertype_claimed : {
    type: Sequelize.STRING, 
  },
createdby : {
    type: Sequelize.STRING, 
  },
vouchertype : {
    type: Sequelize.STRING, 
  },
appname : {
    type: Sequelize.STRING, 
  },
getorderno : {
    type: Sequelize.STRING,  validate: {
                                        isUniqueOrderno: function(value, next) {
                                            Ecomm_voucherPromo.findOne({
                                                      where: {getorderno: value},attributes: ['getorderno']})
                                                .done(function(error, user) {
                                                    if (error)
                                                        return next({message: 'Orderno already used before!'});
                                                      next();
                                                });

                                        },
                                      }
  },
claimedorderno : {
    type: Sequelize.STRING, 
  },
expireddt : {
    type: Sequelize.STRING, 
  },
bvAllowed : {
    type: Sequelize.STRING, 
  },  
vchtype : {
    type: Sequelize.STRING, 
  },  
specificPrdOnly : {
    type: Sequelize.STRING, 
  },  
specificPrdcd : {
    type: Sequelize.STRING, 
  },

}, {freezeTableName: true, timestamps: false, tbl_ecomm_voucherPromo });


module.exports = Ecomm_voucherPromo;