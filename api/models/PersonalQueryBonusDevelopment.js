const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const personalQueryBonusDevelopment = 'queryBonusDevelopment';

const PersonalQueryBonusDevelopment = sequelize.define('V_HILAL_API_MEM_BONUS_DEVELOPMENT', {
  
    bonusyear : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },

    bonusmonth : {
        type: Sequelize.INTEGER, primaryKey: true, allowNull: false,
      },

    distributorcode : {
        type: Sequelize.STRING, primaryKey: true, allowNull: false,
      },

    overridep : {
        type: Sequelize.INTEGER, 
      },
    overridebv : {
        type: Sequelize.INTEGER, 
      },
    effectiveoverrate : {
        type: Sequelize.INTEGER, 
      },
    overrideamount : {
        type: Sequelize.INTEGER, 
      },
    overrideorder : {
        type: Sequelize.INTEGER, 
      },

}, {freezeTableName: true, timestamps: false, personalQueryBonusDevelopment });


module.exports = PersonalQueryBonusDevelopment;