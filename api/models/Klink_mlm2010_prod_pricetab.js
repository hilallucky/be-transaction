const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');
//klink_mlm2010.dbo.pricetab
const pricetab = 'pricetab';

const Pricetab = sequelize.define('pricetab', {
    pricecode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    prdcd : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
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
    notes : {
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

}, {freezeTableName: true, timestamps: false, hasTrigger: true, pricetab });


module.exports = Pricetab;