const googleMap = require('../services/googlemap.service');

const {internalError, logSuccess, logError} = require('../services/logger');

const GoogleMapController = () => {

	const getDistance = async (req, res) => {

		let {origin, destination} = req.body

		try{
    
        	let data = await googleMap.distanceMatrix({
        		origins: [origin],
        		destinations: [destination],
        		mode: 'driving',
        		avoid: ['tolls', 'highways'],

        		}).asPromise();
        	console.log(data)
		  
		  	return logSuccess(req, res, 200, data)  

		 } catch (err) 
		 {
                console.log(err);
                return internalError(req, res,err )                                                      
          };


    
  };



  const getGeoCode = async (req, res) => {

		let {origin, destination} = req.body

		try{
    
        	let data = await googleMap.geocode({
        		address: origin ,
        		}).asPromise();
        	
		  	return logSuccess(req, res, 200, data)  
		  	

		 } catch (err) 
		 {
                console.log(err);
                 return internalError(req, res,err )                                                
          };


    
  };

  return {
   getDistance,
   getGeoCode
  };

};
module.exports = GoogleMapController;