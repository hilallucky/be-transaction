const Sequelize = require('sequelize');
const sequelize = require('../../config/db/db_golf');

const reg_golfer = 'reg_golfer';

const Reg_golfer = sequelize.define('reg_golfer', {
    golfer_id: {
              type: Sequelize.STRING, 
                  },
    golfer_code: {
                  type: Sequelize.STRING, 
                      },
    golfer_name: {
                  type: Sequelize.STRING, 
                      },
    golfer_regno: {
                  type: Sequelize.STRING, 
                      },
    golfer_orderno: {
                  type: Sequelize.STRING, 
                      },
    golfer_hp: {
                  type: Sequelize.STRING, 
                      },
    golfer_email: {
                  type: Sequelize.STRING, 
                      },
    golfer_gender: {
                  type: Sequelize.STRING, 
                      },
    golfer_clubname: {
                  type: Sequelize.STRING, 
                      },
    golfer_handicap: {
                  type: Sequelize.STRING, 
                      },
    golfer_birthdate: {
                  type: Sequelize.STRING, 
                      },
    regType: {
                  type: Sequelize.STRING, 
                      },
    bankCode: {
                  type: Sequelize.STRING, 
                      },
    payAmount: {
                  type: Sequelize.STRING, 
                      },
    payStatus: {
                  type: Sequelize.STRING, 
                      },
    PayDate: {
                  type: Sequelize.STRING, 
                      },
    event_id: {
                  type: Sequelize.STRING, 
                      },
    createdDate: {
                  type: Sequelize.STRING, 
                      },
    updatedDate: {
                  type: Sequelize.STRING, 
                      },

}, {freezeTableName: true, timestamps: false,  hasTrigger: false, reg_golfer });


module.exports = Reg_golfer;



