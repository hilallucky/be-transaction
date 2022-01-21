const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');
//klink_mlm2010.dbo.newera_PRDCAT
const newera_PRDCAT = 'newera_PRDCAT';

const Newera_PRDCAT = sequelize.define('newera_PRDCAT', {
    prdcd : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    prdcdName : {
        type: Sequelize.STRING, 
      },
    Desc : {
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
    priceDist : {
        type: Sequelize.STRING, 
      },
    priceCust : {
        type: Sequelize.STRING, 
      },
    bvDist : {
        type: Sequelize.STRING, 
      },
    pricecode : {
        type: Sequelize.STRING, 
      },
    SMS : {
        type: Sequelize.STRING, 
      },
    WEB : {
        type: Sequelize.STRING, 
      },
    StartDate : {
        type: Sequelize.STRING, 
      },
    EndDate : {
        type: Sequelize.STRING, 
      },
    group_flag : {
        type: Sequelize.STRING, 
      },

}, {freezeTableName: true, timestamps: false, newera_PRDCAT });


module.exports = Newera_PRDCAT;