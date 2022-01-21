const Golfer_reg = require('../models/Golfer_reg');
const Sequelize = require('sequelize');
const sequelize = require('../../config/db/db_golf');
const { internalError, logSuccess, logError } = require("../services/logger");

const GolferRegController = () => {

  const addRegGolfer = async (req, res) => {
    let { body } = req;
    console.log(body.golfer_code)
      try {
        let data = await Golfer_reg.create({
                                          golfer_id : body.golfer_id,
                                          golfer_code : body.golfer_code,
                                          golfer_name : body.golfer_name,
                                          golfer_regno : body.golfer_regno,
                                          golfer_orderno : body.golfer_orderno,
                                          golfer_hp : body.golfer_hp,
                                          golfer_email : body.golfer_email,
                                          golfer_gender : body.golfer_gender,
                                          golfer_clubname : body.golfer_clubname,
                                          golfer_handicap : body.golfer_handicap,
                                          golfer_birthdate : body.golfer_birthdate,
                                          regType : body.regType,
                                          bankCode : body.bankCode,
                                          payAmount : body.payAmount,
                                          payStatus : body.payStatus,
                                          PayDate : body.PayDate,
                                          event_id : body.event_id,
                                          createdDate : body.createdDate,
                                          updatedDate : body.updatedDate,
                                        });
        return logSuccess(req, res, 200, data); 
      } 

      catch (err) {
        return internalError(req, res, err);
      }

  };

const getRegGolfers= async (req, res) => {
  const{event_id} = req.body;
    try {
      // let dataGolfers = await Golfer_reg.findAll({
      //                                         raw: true,
      //                                         where: {
      //                                           event_id : event_id
      //                                         },
      //                                         attributes: ['golfer_id', 'golfer_code', 'golfer_name', 'golfer_regno', 'golfer_orderno', 'golfer_hp', 
      //                                                      'golfer_email', 'golfer_gender', 'golfer_clubname', 'golfer_handicap', 'golfer_birthdate', 
      //                                                      'regType', 'bankCode', 'payAmount', 'payStatus', 'PayDate', 'event_id', 'createdDate', 'updatedDate'], 
      //                                         order: [
      //                                           ['golfer_id', 'ASC']
      //                                         ],
      //                                       });

      let golfers = "SELECT a.golfer_id, a.golfer_code, a.golfer_name, a.golfer_regno, a.golfer_orderno, a.golfer_hp, a.golfer_email, a.golfer_gender, " +
                    " a.golfer_clubname, a.golfer_handicap, a.golfer_birthdate, a.regType, a.bankCode, a.payAmount, a.payStatus, a.PayDate, a.event_id, " +
                    " a.createdDate, a.updatedDate, b.id, b.event_code, b.date, b.location, b.theme, b.event_desc, b.event_status " +
                    " FROM reg_golfer a LEFT OUTER JOIN event b on a.event_id = b.id " +
                    " WHERE event_id = '"+ event_id +"'" +
                    " ORDER BY a.golfer_id, a.event_id " ;
      // console.log(sql);
      let dataGolfers = await sequelize.query(golfers);

      // console.log(dataGolfers[0][0]);
      if(!dataGolfers[0][0]){
        return logError(req, res, 409, "Data not founded.");
      }
      return logSuccess(req, res, 200, dataGolfers[0][0]); 
    } catch (err) {
       return internalError(req, res, err);
    }
  };

 
const updateRegGolfers = async (req, res) => {
    let { golfer_id, golfer_code, golfer_name, golfer_regno, golfer_orderno, golfer_hp, golfer_email, 
          golfer_gender, golfer_clubname, golfer_handicap, golfer_birthdate, regType, bankCode, 
          payAmount, payStatus, PayDate, event_id} = req.body;

    try {
      let data = await Golfer_reg.findAll({
            where: {
              where: {golfer_id : golfer_id, event_id : event_id}, 
            },
          });
      if(!data) {
        return internalError(req, res, err);
      }

      let updatedGolfer = await data.update({
                                              golfer_code : golfer_code,
                                              golfer_name : golfer_name,
                                              golfer_regno : golfer_regno,
                                              golfer_orderno : golfer_orderno,
                                              golfer_hp : golfer_hp,
                                              golfer_email : golfer_email,
                                              golfer_gender : golfer_gender,
                                              golfer_clubname : golfer_clubname,
                                              golfer_handicap : golfer_handicap,
                                              golfer_birthdate : golfer_birthdate,
                                              regType : regType,
                                              bankCode : bankCode,
                                              payAmount : payAmount,
                                              payStatus : payStatus,
                                              PayDate : PayDate,
                                              event_id : event_id,
                                            });

      return logSuccess(req, res, 200, updatedGolfer); 
    } catch (err) {
      return internalError(req, res, err);
    }
  };

const deleteRegGolfers = async (req, res) => {
    // const { orderno } = req.body;
    let { body } = req;
    let transaction

    try{
      let dataGolfer = await Golfer_reg.findAll({
                                        where: {golfer_id : body.golfer_id, event_id : body.event_id}, 
                                        attributes: ['golfer_id', 'golfer_code', 'golfer_name', 'golfer_regno', 'golfer_orderno', 'golfer_hp', 
                                                     'golfer_email', 'golfer_gender', 'golfer_clubname', 'golfer_handicap', 'golfer_birthdate', 
                                                     'regType', 'bankCode', 'payAmount', 'payStatus', 'PayDate', 'event_id', 'createdDate', 'updatedDate'], 
                                        order: [
                                                ['golfer_id', 'ASC']
                                              ],
                                  })
     // console.log(dataGolfer);
     if(!dataGolfer[0]){ //userlogin di data tidak sama dengan yang login
       return logError(req, res, 409, "Data not founded.");
      }else{
        
        try {

          transaction = await sequelize.transaction();
          await Golfer_reg.destroy({
            where: {golfer_id : body.golfer_id, event_id : body.event_id},  
          }, {transaction} ); 

          await transaction.commit(); 

          return logSuccess(req, res, 200, "golfer_id = " + body.golfer_id  + " deleted successfully.");    
        } catch (err) {
          return internalError(req, res, err);
        }
      }
    }catch(error){
      // return res.status(400).json({ status:'failed', msg: "Orderno = " + body.orderno + ' not founded.' });
      return internalError(req, res, error);
    } 
};



  return {
    addRegGolfer,
    getRegGolfers,
    updateRegGolfers,
    deleteRegGolfers,
  };
};

module.exports = GolferRegController;
