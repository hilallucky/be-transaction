const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_smsgateway = 'smsgateway';

const SmsGatewayAdd = sequelize.define('notifsms_gateway', {

ipaddress : {
    type: Sequelize.STRING,
  },
application : {
    type: Sequelize.STRING,
  },
url : {
    type: Sequelize.STRING,
  },
messages : {
    type: Sequelize.STRING,
  },
sender : {
    type: Sequelize.STRING,
  },
receiverno : {
    type: Sequelize.STRING,
  },
smsprovider : {
    type: Sequelize.STRING,
  },
createdt : {
    type: Sequelize.STRING,
  },
status : {
    type: Sequelize.STRING,
  },
operator : {
    type: Sequelize.STRING,
  },
resposegw : {
    type: Sequelize.STRING,
  },
responsedate : {
    type: Sequelize.STRING,
  },
responsenote : {
    type: Sequelize.STRING,
  },

}, {freezeTableName: true, timestamps: false, table_smsgateway });


module.exports = SmsGatewayAdd;