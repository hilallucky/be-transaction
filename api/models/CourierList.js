const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

const courierList = 'courierList';

const CourierList = sequelize.define('master_logistic_shipper', {
    shipper_id: {
              type: Sequelize.STRING, 
                  },
    shipper_code: {
              type: Sequelize.STRING, 
                  },
    shipper_name: {
              type: Sequelize.STRING, 
                  },
    shortnm: {
              type: Sequelize.STRING, 
                  },
    remarks: {
              type: Sequelize.STRING, 
                  },
    shipper_status: {
              type: Sequelize.STRING, 
                  },
    open: {
              type: Sequelize.STRING, 
                  },
    close: {
              type: Sequelize.STRING, 
                  },
    info_html: {
              type: Sequelize.STRING, 
                  },
    logo_url: {
              type: Sequelize.STRING, 
                  },
    allow_cod: {
              type: Sequelize.STRING, 
                  },
    charge_cod_type: {
              type: Sequelize.STRING, 
                  },
    charge_cod: {
              type: Sequelize.STRING, 
                  },
    url_tracking: {
              type: Sequelize.STRING, 
                  },


}, {freezeTableName: true, timestamps: false,  hasTrigger: true, courierList });


module.exports = CourierList;



