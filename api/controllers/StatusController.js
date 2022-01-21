
const StatusController = () => {

"use strict";  
const status = async (req, res) => {
  let { body } = req;


     try {       

            return res.status(200).json({status:'success '});           

      } catch (err) {
     
          return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }

};

  return {
    status,
  };

};
module.exports = StatusController;