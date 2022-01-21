const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');
//klink_mlm2010.dbo.msprd
const master_product = 'master_product';

const Master_product = sequelize.define('msprd', {
    prdcd : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    prdnm : {
        type: Sequelize.STRING, 
      },
    description : {
        type: Sequelize.STRING, 
      },
    category : {
        type: Sequelize.STRING, 
      },
    type : {
        type: Sequelize.STRING, 
      },
    unit : {
        type: Sequelize.STRING, 
      },
    dp : {
        type: Sequelize.STRING, 
      },
    pv : {
        type: Sequelize.STRING, 
      },
    cp : {
        type: Sequelize.STRING, 
      },
    bv : {
        type: Sequelize.STRING, 
      },
    status : {
        type: Sequelize.STRING, 
      },
    webstatus : {
        type: Sequelize.STRING, 
      },
    url : {
        type: Sequelize.STRING, 
      },
    image : {
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
    kittype : {
        type: Sequelize.STRING, 
      },
    categorycode : {
        type: Sequelize.STRING, 
      },
    expiredperiod : {
        type: Sequelize.STRING, 
      },


}, {freezeTableName: true, timestamps: false, master_product, hasTrigger: true });


module.exports = Master_product;