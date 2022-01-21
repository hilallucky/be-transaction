const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');
//klink_mlm2010.dbo.mscat
const mscat = 'mscat';

const Mscat = sequelize.define('mscat', {
    catid : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    description : {
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

}, {freezeTableName: true, timestamps: false, mscat });


module.exports = Mscat;