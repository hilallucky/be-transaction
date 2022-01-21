const PersonalQueryBV = require('../models/PersonalQueryBV');
const PersonalQueryGBV = require('../models/PersonalQueryGBV');
const PersonalQueryBonusList = require('../models/PersonalQueryBonusList');
const redis = require('redis');
const client = redis.createClient();
const dateFormat = require('dateformat');

const PersonalQueryBVController = () => {
  
const getPersonalBV = async (req, res) => {
   const { dfno, year, month } = req.body;

    if (dfno && year){// && month) {
      console.log('monthss :=='+month);
      try {
        let personalBV;
        if(month > 0){
          personalBV = await PersonalQueryBV.findOne({
                                                            where: {dfno, year, month},
                                                          });
        }else if(month == 0 && month !== ""){
          personalBV = await PersonalQueryBV.findAll({
                                                            where: {dfno, year},
                                                            order: [['year', 'ASC'], ['month', 'ASC']],
                                                          });
        }else{
          return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
        }
        if (!personalBV || personalBV.length==0) {
          return res.status(400).json({ status: 'failed', message: dfno + ' or period not founded' });
        }

        let monthNow = dateFormat(Date.now(), "yyyym");
        let monthformat = year+("0" + month).slice(-2);      
        let yearNow = dateFormat(Date.now(), "yyyy");

        if (monthNow - monthformat >= 2 || (month == 0 && yearNow > year)){
          // console.log('masuk set cache');
          client.hset('pbv:'+dfno, year+'/'+month,JSON.stringify(personalBV));
        }

        return res.status(200).json({status:'success', personalBV });     
      } catch (err) {
        console.log(err)
        return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };

  const getPersonalGBV = async (req, res) => {
   const { sfno, year, month } = req.body;

    if (sfno && year && month) {

      try {
        const personalGBV = await PersonalQueryGBV
          .findAll({
            raw: true,
            where: {
              sfno,
              year,
              month
            },

            order: [
              ['fullnm', 'ASC'],
            ],
          });
        if (!personalGBV || personalGBV.length==0) {
          return res.status(400).json({ status: 'failed', message: sfno + ' or period not founded' });
        }

        let monthNow = dateFormat(Date.now(), "yyyym");
        let monthformat = year+("0" + month).slice(-2);      

        // Cache BV jika lewat dari 3 bulan
        if (monthNow - monthformat >= 3){
        client.hset('gbv:'+sfno, year+'/'+month,JSON.stringify(personalGBV));
        }

        return res.status(200).json({status:'success', personalGBV });     
      } catch (err) {
        console.log(err);
        return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };


  const getPersonalListBonus = async (req, res) => {
   const { distributorcode, bonusyear } = req.body;
   //console.log(log.message);
    if (distributorcode && bonusyear) {
      try {
        const personalListBonus = await PersonalQueryBonusList
          .findAll({
            where: {
              distributorcode,
              bonusyear
            },

            order: [
              ['bonusyear', 'ASC'],
              ['bonusmonth', 'ASC'],
            ],
          });
        if (!personalListBonus || personalListBonus.length==0) {
          return res.status(400).json({ status: 'failed', message: distributorcode + ' in year ' + bonusyear + ' period not founded' });
        }
        return res.status(200).json({status:'success', personalListBonus });     
      } catch (err) {
        //logging: false;
        //console.log(err);
        //logging: console.log;
        //logging: winston.debug;       
        return res.status(500).json({ status:'failed', message: console.log(err) + 'Internal server error' });
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };
  return {
    getPersonalBV,
    getPersonalGBV,
    getPersonalListBonus
  };

};
module.exports = PersonalQueryBVController;