const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const personalTransQueryDet = 'personalTransQueryDet';

const PersonalTransQueryDet = sequelize.define('V_HILAL_API_TRANS_ALL', {
      orderno : {
          type: Sequelize.STRING, 
        },
      prdcd : {
                type: Sequelize.STRING, 
              },
      prdnm : {
                type: Sequelize.STRING, 
              },
      qtyord : {
                type: Sequelize.STRING, 
              },


}, {freezeTableName: true, timestamps: false,   personalTransQueryDet });


module.exports = PersonalTransQueryDet;