const Sequelize = require('sequelize');
const sequelize = require('../../config/db/ecomm_production');

const master_prd_cat = 'master_prd_cat';

const Master_prd_cat = sequelize.define('master_prd_cat', {
    cat_id : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    cat_desc : {
        type: Sequelize.STRING, 
      },
    status : {
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

}, {freezeTableName: true, timestamps: false, hasTrigger: true, master_prd_cat });


module.exports = Master_prd_cat;