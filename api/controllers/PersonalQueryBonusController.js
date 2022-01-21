//const InsertTestHdr = require('../models/InsertTestHdr');
//const insertTestDet = require('../models/InsertTestDet');

const PersonalQueryBonusList = require('../models/PersonalQueryBonusList');
const PersonalQueryBonusSelf = require('../models/PersonalQueryBonusSelf'); //Bonus Statement Header
const PersonalQueryBonusDetail3 = require('../models/PersonalQueryBonusDetail3'); //Bonus Statement Detail3(all bonus figure)
const PersonalQueryBonusSales = require('../models/PersonalQueryBonusSales'); //Bonus Statement Sales List(all Sales List)
const PersonalQueryBonusDownline = require('../models/PersonalQueryBonusDownline'); //Bonus Statement Group BV Downline(all Group BV Downline List)
const PersonalQueryBonusDevelopment = require('../models/PersonalQueryBonusDevelopment'); //Bonus Statement Development(Development List)
const PersonalQueryBonusLeadership = require('../models/PersonalQueryBonusLeadership'); //Bonus Statement Leadership(Leadership List)
const PersonalQueryBonusLeadershipSumm = require('../models/PersonalQueryBonusLeadershipSumm'); //Bonus Statement Leadership Summ(Leadership Summ List)
const PersonalQueryBonusUnilevel = require('../models/PersonalQueryBonusUnilevel'); //Bonus Statement Unilevel(Unilevel List)
const PersonalQueryBonusUnilevelSumm = require('../models/PersonalQueryBonusUnilevelSumm'); //Bonus Statement Unilevel Summ(Unilevel Summ List)
const PersonalQueryBonusInitiative = require('../models/PersonalQueryBonusInitiative'); //Bonus Statement Initiative(Initiative List)

const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');


const PersonalQueryBonusController = () => {

	//listing bonus berdasarkan Distributor & Tahun
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
        return res.status(500).json({ status:'failed', message: console.log(err) + 'Internal server error' });
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };


//Detail Bonus Report By Distributor, Year, Month
const getPersonalDetailBonus = async (req, res) => {
    const { distributorcode, bonusyear, bonusmonth } = req.body;

      try {
        let bonusHeaderSelf = await PersonalQueryBonusSelf
          .findOne({
            raw: true,
            where: {
              distributorcode, 
              bonusyear, 
              bonusmonth
            },
          });

          let bonusDetail = await PersonalQueryBonusDetail3
          .findOne({
            raw: true,
            where: {
              distributorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
          });

          let bonusSalesList = await PersonalQueryBonusSales
          .findAll({
            raw: true,
            where: {
              distributorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
            
            order: [
              ['trcd', 'ASC'],
            ],
          });

          let bonusDownlineBVList = await PersonalQueryBonusDownline
          .findAll({
            raw: true,
            where: {
              sponsorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
            
            order: [
              ['fullnm', 'ASC'],
            ],
          });

          //Plan A Marketing Plan K-Link 2017 edition

          let bonusDevelopmentList = await PersonalQueryBonusDevelopment
          .findAll({
            raw: true,
            where: {
              distributorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
            
            order: [
              ['overrideorder', 'ASC'],
            ],
          });

          let bonusLeadershipList = await PersonalQueryBonusLeadership
          .findAll({
            raw: true,
            where: {
              distributorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
            
            order: [
              ['odistributorcode', 'ASC'],
            ],
          });

          let bonusLeadershipSummList = await PersonalQueryBonusLeadershipSumm
          .findAll({
            raw: true,
            where: {
              distributorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
            
            order: [
              ['distributorcode', 'ASC'],
              ['distributorlevel', 'ASC'],
            ],
          });

          //Plan B Marketing Plan K-Link 2017 edition (Infinity deleted, Unilevel 2%), initiative

          let bonusUnilevelList = await PersonalQueryBonusUnilevel
          .findAll({
            raw: true,
            where: {
              distributorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
            
            order: [
              ['odistributorcode', 'ASC'],
            ],
          });

          let bonusUnilevelSummList = await PersonalQueryBonusUnilevelSumm
          .findAll({
            raw: true,
            where: {
              distributorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
            
            order: [
              ['distributorcode', 'ASC'],
              ['distributorlevel', 'ASC'],
            ],
          });
          
          let bonusInitiativeList = await PersonalQueryBonusInitiative
          .findAll({
            raw: true,
            where: {
              distributorcode : distributorcode, 
              bonusyear : bonusyear, 
              bonusmonth : bonusmonth,
            },
            
            order: [
              ['distributorcode', 'ASC'],
              ['odistributorcode', 'ASC'],
            ],
          });

        let header = Object.assign(bonusHeaderSelf, {bonusDetail}, {bonusSalesList}, 
                                   {bonusDownlineBVList}, {bonusDevelopmentList}, {bonusDevelopmentList},
                                   {bonusLeadershipList}, {bonusLeadershipSummList}, {bonusUnilevelList},
                                   {bonusUnilevelSummList}, {bonusInitiativeList});
       

         return res.status(200).json(header);     
      } catch (err) {
        console.log(err);
  
         return res.status(500).json( { status:'failed', message: 'Internal server error' });
      }
 
  };

  
/*
  const insert = async (req, res) => {
    const {remark,remark_det} = req.body;
    let transaction
    if (remark){
      try {
        transaction = await sequelize.transaction();

       let dataTestHdr = await InsertTestHdr.create({
          remark : remark,
        }, {transaction} );
        let id_hdr = await dataTestHdr.id;

        let dataTestDet = await insertTestDet.create({
          id_hdr : id_hdr,
          remark_det :remark_det 
        }, {transaction} ); 

        await transaction.commit();   
        return res.status(200).json({dataTestHdr, dataTestDet});
      } catch (err) {
        await transaction.rollback();
        return res.status(409).json({ msg: 'conflict' } );
      }
     } else {

       return res.status(500).json({ msg: 'Internal server error' });
     }
    
  };


const getRemark = async (req, res) => {
    const { id } = req.body;

   
      try {
        let hdr = await InsertTestHdr
          .findOne({
            raw: true,
            where: {
              id,
            },
          });

          let leadershipBonus = await insertTestDet
          .findOne({
            raw: true,
            where: {
              id_hdr: id,
            },
          });

          let initiativeBonus = await insertTestDet
          .findOne({
            raw: true,
            where: {
              id_hdr: id,
            },
          });

        let header = Object.assign(hdr,{leadershipBonus},{initiativeBonus});
       

         return res.status(200).json(header);     
      } catch (err) {
        console.log(err);
  
         return res.status(500).json( { status:'failed', message: 'Internal server error' });
      }
 
  };
*/

  return {
    getPersonalListBonus,
    getPersonalDetailBonus,
  };
};

module.exports = PersonalQueryBonusController;
