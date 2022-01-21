// const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/k_mart_conn');

// // const PersonalQueryBV = require('../models/PersonalQueryBV');
// const redis = require('redis');
// const client = redis.createClient();

// const K_MartController = () => {
  
//   const getShippingData = async (req, res) => {
//    const { orderno } = req.body;

//     if (orderno) {

//       try {
       
//         let getDataShip = await sequelize.query("SELECT b.*, a.*, c.*, d.* " +
//                                                 "FROM `klink_transactions` b  " +
//                                                   "INNER JOIN `klink_transactions_shipping` a ON b.id=a.transaction_id  " +
//                                                   "INNER JOIN `klink_shipping_addres` c ON a.`shipping_id`=c.`id` " +
//                                                   "INNER JOIN `sicepat_destination` d ON c.`sicepat_code`= d.`destination_code` " +
//                                                 "WHERE b.invoice IN ('EB2001170006', 'EB2001180002');"
//                                                 );

//          let getDataShipDet = getDataShip[0];
       
//           return res.status(200).json({status:'success', getDataShipDet});
        
//         // let personalGBV2 = await PersonalQueryGBV2(sfno, year, month);

//         // if (!personalGBV2) { // || personalGBV2.length==0) {
//         //   return res.status(400).json({ status: 'failed', message: sfno + ' or period not founded' });
//         // }
//         // client.set(sfno, JSON.stringify(personalGBV2));
//         // client.get(sfno,function(err,reply) {
//         //      console.log(err);
//         //      console.log(reply);
//         //     });
//         // return res.status(200).json({status:'success ', personalGBV2 });     
//       } catch (err) {
//         console.log(err);
//         return res.status(500).json({ status:'failed', message: 'Internal server error' });
//       }
//     }
//         return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
//   };


//   return {
//     getShippingData,
//   };

// };
// module.exports = K_MartController;