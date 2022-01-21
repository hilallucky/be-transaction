const TransDetPrdSukses = require('../models/TransDetPrdSukses');

const TransDetPrdSuksesController = () => {

  const addTransDetPrdSukses = async (req, res) => {
    let { body } = req;
      try {
        let insert = await TransDetPrdSukses.create({
          orderno : body.orderno,
          prdcd : body.prdcd,
          prdnm : body.prdnm,
          qty : body.qty,
          bvr : body.bvr,
          dpr : body.dpr,
          pricecode : body.pricecode,
          sentTo : body.sentTo,
          ByrSisaSales : body.ByrSisaSales,
          cpr : body.cpr,
          profit_d : body.profit_d,

         
        });
        return res.status(200).json( {status: 'sukses', insert});  
      } catch (err) {
        console.log(err);
        if(err.parent.number == 2627)
        {
            return res.status(409).json({ status: 'gagal', pesan: 'MemberId telah terdaftar' });
        }
        else{
            return res.status(500).json({ pesan: 'Internal server error' });
        }  
      }

  };

const getTransDetPrdSukses= async (req, res) => {
    try {
      let header = await TransDetPrdSukses.findAll(
        {
          limit :25,
        }
        );

      return res.status(200).json( header );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };



  return {
    addTransDetPrdSukses,
    getTransDetPrdSukses,
  };
};

module.exports = TransDetPrdSuksesController;
