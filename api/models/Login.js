const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_login = 'login';

const Login = sequelize.define('V_HILAL_API_LOGIN', {
  
dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
fullnm : {
    type: Sequelize.STRING, 
  },
idno : {
    type: Sequelize.STRING, 
  },
sfno : {
    type: Sequelize.STRING, 
  },
fullnm_sp : {
    type: Sequelize.STRING, 
  },
sfno_reg : {
    type: Sequelize.STRING, 
  },
fullnm_rec : {
    type: Sequelize.STRING, 
  },
sex : {
    type: Sequelize.STRING, 
  },
tel_hp : {
    type: Sequelize.STRING, 
  },
email : {
    type: Sequelize.STRING, 
  },
addr1 : {
    type: Sequelize.STRING, 
  },
addr2 : {
    type: Sequelize.STRING, 
  },
addr3 : {
    type: Sequelize.STRING, 
  },
city : {
    type: Sequelize.STRING, 
  },
rank: {
    type: Sequelize.STRING, 
  },
shortnm : {
    type: Sequelize.STRING, 
  },
percentage: {
    type: Sequelize.STRING, 
  },
bankid : {
    type: Sequelize.STRING, 
  },
bankaccno : {
    type: Sequelize.STRING, 
  },
bankaccnm : {
    type: Sequelize.STRING, 
  },
virtual_account: {
    type: Sequelize.STRING, 
  },
password : {
    type: Sequelize.STRING, 
  },
birthdt: {
    type: Sequelize.STRING, 
  },
bd_now: {
    type: Sequelize.STRING, 
  },
bd_exp_date: {
    type: Sequelize.STRING, 
  },
joindt : {
    type: Sequelize.STRING, 
  },
distributor : {
    type: Sequelize.STRING, 
  },
mobile_sc : {
    type: Sequelize.STRING, 
  },
sub_sc : {
    type: Sequelize.STRING, 
  },
stockist_sc : {
    type: Sequelize.STRING, 
  },


}, {freezeTableName: true, timestamps: false, table_login });


module.exports = Login;