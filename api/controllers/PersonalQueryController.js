const Sequelize = require('sequelize');
const sequelize = require('../../config/db/klink_mlm2010');

const PersonalQueryBV = require('../models/PersonalQueryBV');
const PersonalQueryGBV = require('../models/PersonalQueryGBV');
const PersonalQueryGBV2 = require('../models/PersonalQueryGBV2');
const PersonalQueryBonusList = require('../models/PersonalQueryBonusList');
const redis = require('redis');
const client = redis.createClient();

const PersonalQueryController = () => {
  
const getPersonalBV = async (req, res) => {
   const { dfno, year, month } = req.body;

    if (dfno && year && month) {
      try {
        const personalBV = await PersonalQueryBV
          .findOne({
            where: {
              dfno,
              year,
              month
            },
          });
        if (!personalBV || personalBV.length==0) {
          return res.status(400).json({ status: 'failed', message: dfno + ' or period not founded' });
        }
        return res.status(200).json({status:'success ', personalBV });     
      } catch (err) {
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

        client.set(sfno, JSON.stringify(personalGBV));
        client.get(sfno,function(err,reply) {
             console.log(err);
             console.log(reply);
            });

        // console.log("Hasil personalGBV = ");
        // console.log(personalGBV);

        return res.status(200).json({status:'success ', personalGBV });     
      } catch (err) {
        console.log(err);
        return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };

  const getPersonalGBV2 = async (req, res) => {
   const { sfno, year, month } = req.body;

    if (sfno && year && month) {

      try {
       
      let q_gbv = await sequelize.query("SELECT j.dfno, j.fullnm, j.sfno as sp_code, l.fullnm as sp_name, " +
                         "CONVERT(char(10), j.jointdt,103) as jointdt, " +
                         "CAST(ISNULL((SELECT TOP 1 A.adjustedrank " +
                                      "FROM klink_mlm2010.dbo.tbonus A " +
                                      "WHERE A.distributorcode=J.dfno " +
                                      "ORDER BY A.bonusyear DESC, A.bonusmonth DESC), 0) AS INT) AS [level], " +
                         "isnull(k.ppv, 0) as ppv, " +
                         "isnull(k.popv, 0) as popv, " +
                         "isnull(k.pgpv, 0) as pgpv, " +
                         "isnull(YEAR(k.period), " + year + ") as YEAR, " +
                         "isnull(MONTH(k.period), " + month + ") AS MONTH " +
                  "FROM klink_mlm2010.dbo.msmemb j " +
                        "LEFT OUTER JOIN klink_mlm2010.dbo.hsttree k ON j.dfno=k.dfno AND YEAR(k.period)=" + year + " and MONTH(k.period)=" + month + " " +
                        "LEFT OUTER JOIN klink_mlm2010.dbo.msmemb l ON J.sfno = l.dfno " +
                  "WHERE j.sfno='" + sfno + "' " +
                  "ORDER BY j.dfno ASC");

         let personalGBV = q_gbv[0];
       
          return res.status(200).json({status:'success', personalGBV});
        
        // let personalGBV2 = await PersonalQueryGBV2(sfno, year, month);

        // if (!personalGBV2) { // || personalGBV2.length==0) {
        //   return res.status(400).json({ status: 'failed', message: sfno + ' or period not founded' });
        // }
        // client.set(sfno, JSON.stringify(personalGBV2));
        // client.get(sfno,function(err,reply) {
        //      console.log(err);
        //      console.log(reply);
        //     });
        // return res.status(200).json({status:'success ', personalGBV2 });     
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
        return res.status(200).json({status:'success ', personalListBonus });     
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
    getPersonalGBV2,
    getPersonalListBonus,
  };

};
module.exports = PersonalQueryController;