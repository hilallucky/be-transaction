const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const table_ecomm_memb_ok_sgo_Field = 'membertmp';

const MemberTmp = sequelize.define('ecomm_memb_ok_sgo', {
  
      sponsorid: {
          type: Sequelize.STRING, allowNull: false,
        },
      memberid: {
          type: Sequelize.STRING, primaryKey: true, allowNull: false,
        },
      membername: {
          type: Sequelize.STRING, 
        },
      idno: {
          type: Sequelize.TEXT, allowNull: false, validate: {
              isUniqueIdno: function(value, next) {

                  MemberTmp.findOne({
                      where: {idno: value},
                      attributes: ['idno']
                  })
                      .done(function(error, user) {
                          if (error)
                              return next({message: 'KTP (idno) is already registered'});
                          next();
                      });
              }
          }
        },
      addr1: {
          type: Sequelize.TEXT, 
        },
      addr2: {
          type: Sequelize.TEXT, 
        },
      addr3: {
          type: Sequelize.TEXT, 
        },
      tel_hm: {
          type: Sequelize.STRING, 
        },
      tel_hp: {
          type: Sequelize.STRING, allowNull: false, validate: {
              isUniqueHP: function(value, next) {
                  MemberTmp.findOne({
                      where: {tel_hp: value},
                      attributes: ['tel_hp']
                  })
                      .done(function(error, user) {
                          if (error)
                              return next({message: 'Mobile Phone is already in use'});
                          next();
                      });
              }
          }
        },
      email: {
          type: Sequelize.TEXT, 

        },
      stk_code: {
          type: Sequelize.TEXT, 
        },
      sex: {
          type: Sequelize.STRING, 
        },
      birthdt: {
          type: Sequelize.STRING, 
        },
      country: {
          type: Sequelize.STRING, 
        },
      acc_no: {
          type: Sequelize.TEXT, 
        },
      acc_name: {
          type: Sequelize.TEXT, 
        },
      bankid: {
          type: Sequelize.STRING, 
        },
      joindt: {
          type: Sequelize.STRING, 
        },
      trx_no: {
          type: Sequelize.STRING, 
        },
      noapl: {
          type: Sequelize.STRING, 
        },
      kdpos: {
          type: Sequelize.STRING, 
        },
      state: {
          type: Sequelize.TEXT, 
        },
      ip_address: {
          type: Sequelize.STRING, 
        },
      prdcd: {
          type: Sequelize.STRING, 
        },
      password: {
          type: Sequelize.STRING, 
        },
      userlogin: {
          type: Sequelize.STRING, 
        },
      recruiterid: {
          type: Sequelize.STRING, allowNull: false,
        },
      flag_voucher: {
          type: Sequelize.STRING, 
        },
      voucher_no: {
          type: Sequelize.STRING, 
        },
      voucher_key: {
          type: Sequelize.STRING, 
        },
      is_landingpage: {
          type: Sequelize.STRING, 
        },
      id_landingpage: {
          type: Sequelize.STRING, 
        },



}, {freezeTableName: true, timestamps: false, hasTrigger: true, table_ecomm_memb_ok_sgo_Field });


module.exports = MemberTmp;