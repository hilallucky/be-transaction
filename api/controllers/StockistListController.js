const stokistList = require('../models/StockistList');
const geolib = require('geolib');  // https://www.npmjs.com/package/geolib
const { Op } = require('sequelize')
const { literal } = require('sequelize')
const sortArray = require('array-sort'); // https://www.npmjs.com/package/array-sort
const { body } = require('express-validator');

const StockistListController = () => {

  const stockistListByDistance = async (req, res) => {
    let { lat,long } = req.body;
    let distance =[]
    let result= []


    try {
    
    let list = await stokistList
     .findAll({
            raw: true,
            where:{
              sctype : '1',
              scstatus : '1',
              onlinetype : 'O',
              latitude: {
                          [Op.notIn]: ['null','0']
                        },
              longitude: {
                          [Op.notIn]: ['null','0']
                        }
            },
          });

          for(let v of list){
            distance.push(geolib.getDistance(
                { 
                  latitude: lat, 
                  longitude: long 
                },
                { 
                  latitude: v.latitude, 
                  longitude: v.longitude
                }
                ))

              };

          list.forEach((stockist,i) => stockist.distance = distance[i])
          let stockistList = sortArray(list,'distance')
          
          return res.status(200).json({status: 'sukses', stockistList});             
    } catch (err) {
                  console.log(err);
                 return res.status(500).json( {status: 'failed', message: 'internal error'});                                 
             } 
  };

  const stockistOrderByDistance = async (req, res) =>{
      let {lat, long, startNo, endNo} = req.body;
      let result = [];
      let stockistRes =[]

      try {    
        let list = await stokistList.findAll({raw: true,
                                              where:{sctype: { [Op.in]: ['1','3'] },
                                                     scstatus : '1',
                                                     onlinetype : 'O',
                                                     latitude: { [Op.notIn]: ['null','0'] },
                                                     longitude: { [Op.notIn]: ['null','0'] },
                                                    },
                                              attributes: ['loccd', 'fullnm', [literal("addr1 + ' ' + addr2"), 'addr'], 'postcd', 'whcd', 'tel_hm', 'tel_of','tel_hp', 'pricecode', 'status', 'scstatus', 'longitude', 'latitude', 'is_warehouse'],
                                            });
        let stockistList = geolib.orderByDistance({latitude: lat, longitude: long}, list).slice(startNo, endNo);
        console.log("stockistList.length = " + stockistList.length);
        for (var i = 0; i < stockistList.length; i++) {
              stockistRes.push({loccd: stockistList[i].loccd,
                                fullnm: stockistList[i].fullnm,
                                addr: stockistList[i].addr,
                                postcd: stockistList[i].postcd,
                                tel_hm: stockistList[i].tel_hm,
                                tel_of: stockistList[i].tel_of,
                                tel_hp: stockistList[i].tel_hp,
                                pricecode: stockistList[i].pricecode,
                                scstatus: stockistList[i].scstatus, 
                                longitude: stockistList[i].longitude,
                                latitude: stockistList[i].latitude,
                                is_warehouse: stockistList[i].is_warehouse,
                                distance: geolib.getDistance({latitude: lat, longitude: long },
                                                             {latitude: stockistList[i].latitude, longitude: stockistList[i].longitude}),
                                distance_km: geolib.convertDistance(geolib.getDistance({latitude: lat, longitude: long },
                                                                                        {latitude: stockistList[i].latitude, longitude: stockistList[i].longitude}), 
                                                                    'km')
                               })
        };
                
        return res.status(200).json({status: 'sukses', data: stockistRes});             
      } catch (err) {
         console.log(err);
         return res.status(500).json( {status: 'failed', message: 'internal error'});                                 
      }  
  }


  return {
   stockistListByDistance,
   stockistOrderByDistance
  };

};

module.exports = StockistListController;
