const Sequelize = require('sequelize');
const sequelize = require('../../config/db/ecomm_production');

const master_prd_bundling = 'master_prd_bundling';

const Master_prd_bundling = sequelize.define('master_prd_bundling', {

    cat_inv_id_child : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    cat_inv_id_parent : {
        type: Sequelize.STRING, 
      },
    cat_desc : {
        type: Sequelize.STRING, 
      },
    qty : {
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


}, {freezeTableName: true, timestamps: false, hasTrigger: true, master_prd_bundling });


module.exports = Master_prd_bundling;