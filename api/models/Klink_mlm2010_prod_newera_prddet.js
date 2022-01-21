const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');
//klink_mlm2010.dbo.newera_PRDCAT
const newera_PRDDET = 'newera_PRDDET';

const Newera_PRDDET = sequelize.define('newera_PRDDET', {
    prdcdDet : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    prdcdNmDet : {
        type: Sequelize.STRING, 
      },
    prdcdCat : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },
    priceDistCat : {
        type: Sequelize.STRING, 
      },
    qty : {
        type: Sequelize.STRING, 
      },
    priceCustCat : {
        type: Sequelize.STRING, 
      },
    bvDistCat : {
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
    pricecode : {
        type: Sequelize.STRING, 
      },
    prdcdDet_ori : {
        type: Sequelize.STRING, 
      },
    remark : {
        type: Sequelize.STRING, 
      },


}, {freezeTableName: true, timestamps: false, newera_PRDDET });


module.exports = Newera_PRDDET;