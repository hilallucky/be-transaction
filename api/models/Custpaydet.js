const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const custpaydet = 'custpaydet';

const Custpaydet = sequelize.define('custpaydet', {
    trcd: {
              type: Sequelize.STRING,  primaryKey: true, allowNull: false, unique: true, validate: {
                    isUniquetrcd: function(value, next) {
                        Custpaydet.findOne({
                                              where:  {trcd: value}
                                            })
                            .done(function(error, user) {
                                if (error)
                                    return next({message: 'Orderno/Trcd is already registered'});
                                next();
                            });
                    }
              }
          },
    trtype: {
                  type: Sequelize.STRING, 
                      },
    effect: {
                  type: Sequelize.STRING, 
                      },
    etdt: {
                  type: Sequelize.STRING, 
                      },
    trdt: {
                  type: Sequelize.STRING, 
                      },
    dfno: {
                  type: Sequelize.STRING, 
                      },
    custtype: {
                  type: Sequelize.STRING, 
                      },
    docno: {
                  type: Sequelize.STRING, 
                      },
    amount: {
                  type: Sequelize.STRING, 
                      },
    createnm: {
                  type: Sequelize.STRING, 
                      },
    createdt: {
                  type: Sequelize.STRING, 
                      },
    updatenm: {
                  type: Sequelize.STRING, 
                      },
    updatedt: {
                  type: Sequelize.STRING, 
                      },
    PT_SVRID: {
                  type: Sequelize.STRING, 
                      },
    applyto: {
                  type: Sequelize.STRING, 
                      },

}, {freezeTableName: true, timestamps: false,  hasTrigger: true, custpaydet });


module.exports = Custpaydet;



