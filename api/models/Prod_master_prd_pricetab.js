const Sequelize = require('sequelize');
const sequelize = require('../../config/db/ecomm_production');

const master_prd_pricetab = 'master_prd_pricetab';

const Master_prd_pricetab = sequelize.define('master_prd_pricetab', {
    period_month : {
        type: Sequelize.STRING, 
      },
    period_year : {
        type: Sequelize.STRING, 
      },
    pricecode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    cat_inv_id : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    country_id : {
        type: Sequelize.STRING, 
      },
    hq_id : {
        type: Sequelize.STRING, 
      },
    branch_id : {
        type: Sequelize.STRING, 
      },
    cp : {
        type: Sequelize.STRING, 
      },
    dp : {
        type: Sequelize.STRING, 
      },
    bv : {
        type: Sequelize.STRING, 
      },
    tax : {
        type: Sequelize.STRING, 
      },
    remarks : {
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


}, {freezeTableName: true, timestamps: false, hasTrigger: true, master_prd_pricetab });


module.exports = Master_prd_pricetab;