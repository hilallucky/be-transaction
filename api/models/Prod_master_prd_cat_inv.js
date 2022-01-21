const Sequelize = require('sequelize');
const sequelize = require('../../config/db/ecomm_production');

const master_prd_cat_inv = 'master_prd_cat_inv';

const Master_prd_cat_inv = sequelize.define('master_prd_cat_inv', {
    cat_inv_id : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    cat_id : {
        type: Sequelize.STRING, 
      },
    parent_cat_inv_id : {
        type: Sequelize.STRING, 
      },
    cat_inv_desc : {
        type: Sequelize.STRING, 
      },
    inv_type : {
        type: Sequelize.STRING, 
      },
    status : {
        type: Sequelize.STRING, 
      },
    bo_inv_status : {
        type: Sequelize.STRING, 
      },
    bo_status : {
        type: Sequelize.STRING, 
      },
    sc_status : {
        type: Sequelize.STRING, 
      },
    sub_status : {
        type: Sequelize.STRING, 
      },
    ms_status : {
        type: Sequelize.STRING, 
      },
    ecomm_status : {
        type: Sequelize.STRING, 
      },
    web_status : {
        type: Sequelize.STRING, 
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
    createnm : {
        type: Sequelize.STRING, 
      },
    createdt : {
        type: Sequelize.STRING, 
      },
    img_name : {
        type: Sequelize.STRING, 
      },
    weight : {
        type: Sequelize.STRING, 
      },
    product_info : {
        type: Sequelize.STRING(4000), 
      },
    is_starterkit : {
        type: Sequelize.STRING, 
      },
    is_discontinue : {
        type: Sequelize.STRING, 
      },
    is_charge_ship : {
        type: Sequelize.STRING, 
      },
    flag_is_do : {
        type: Sequelize.STRING, 
      },
    description : {
        type: Sequelize.STRING, 
      },
    video : {
        type: Sequelize.STRING, 
      },
    download_filename : {
        type: Sequelize.STRING, 
      },
    flag_non_available : {
        type: Sequelize.STRING, 
      },
    updatenm : {
        type: Sequelize.STRING, 
      },
    updatedt : {
        type: Sequelize.STRING, 
      },
    max_order : {
        type: Sequelize.STRING, 
      },
    search_tag : {
        type: Sequelize.STRING, 
      },
    cat_inv_desc_bckup : {
        type: Sequelize.STRING, 
      },
    is_bestseller : {
        type: Sequelize.STRING, 
      },
    is_hotproduct : {
        type: Sequelize.STRING, 
      },
    is_newproduct : {
        type: Sequelize.STRING, 
      },
    prd_group_lp : {
        type: Sequelize.STRING, 
      },
    prd_group_lp_desc : {
        type: Sequelize.STRING, 
      },
    family_groupcode : {
        type: Sequelize.STRING, 
      },
    family_groupcode_desc : {
        type: Sequelize.STRING, 
      },
    prd_start_on : {
        type: Sequelize.STRING, 
      },
    prd_end_on : {
        type: Sequelize.STRING, 
      },
    is_product_training : {
        type: Sequelize.STRING, 
      },
    registerType : {
        type: Sequelize.STRING, 
      },


}, {freezeTableName: true, timestamps: false, hasTrigger: true, master_prd_cat_inv });


module.exports = Master_prd_cat_inv;