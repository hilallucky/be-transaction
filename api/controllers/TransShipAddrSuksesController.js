const TransShipAddrSukses = require('../models/TransShipAddrSukses');

const TransShipAddrSuksesController = () => {

  const addTransShipAddrSukses = async (req, res) => {
    let { body } = req;
      try {
        let data = await TransShipAddrSukses.create({
          orderno : body.orderno,
          idstk : body.idstk,
          prov_code : body.prov_code,
          kab_code : body.kab_code,
          kec_code : body.kec_code,
          kel_code : body.kel_code,
          post_code : body.post_code,
          receiver_name : body.receiver_name,
          addr1 : body.addr1,
          addr2 : body.addr2,
          addr3 : body.addr3,
          email : body.email,
          tel_hp1 : body.tel_hp1,
          tel_hp2 : body.tel_hp2,
          conoteJNE : body.conoteJNE,
          service_type_id : body.service_type_id,
          service_type_name : body.service_type_name,
          flag_send_conote : body.flag_send_conote,
          total_item : body.total_item,
          total_weight : body.total_weight,
          cargo_id : body.cargo_id,
          delivery_status : body.delivery_status,
          lat_dest : body.lat_dest,
          long_dest : body.long_dest,
          whcd : body.whcd,
          whnm : body.whnm,
          id_address : body.id_address,


         
        });
        return res.status(200).json( {status: 'sukses', data});  
      } catch (err) {
        console.log(err);
        if(err.parent.number == 2627)
        {
            return res.status(409).json({ status: 'gagal', pesan: 'OrderId telah terdaftar' });
        }
        else{
            return res.status(500).json({ pesan: 'Internal server error' });
        }  
      }

  };

const getTransShipAddrSukses= async (req, res) => {
    try {
      let header = await TransShipAddrSukses.findAll(
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
    addTransShipAddrSukses,
    getTransShipAddrSukses,
  };
};

module.exports = TransShipAddrSuksesController;
