const TransShipAddrTmp = require('../models/TransShipAddrTmp');

const TransShipAddrTmpController = () => {

  const addTransShipAddrTmp = async (req, res) => {
    let { body } = req;
      try {
        let insert = await TransShipAddrTmp.create({
          orderno : body.orderno,
          idstk : body.idstk,
          prov_code : body.prov_code,
          kab_code : body.kab_code,
          kec_code : body.kec_code,
          kel_code : body.kel_code,
          post_code : body.post_code,
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
          total_pay_net : body.total_pay_net,
          receiver_name : body.receiver_name,
          stockist_name : body.stockist_name,
          kabupaten_name : body.kabupaten_name,
          province_name : body.province_name,
          sender_address : body.sender_address,
          dest_address : body.dest_address,
          jne_branch : body.jne_branch,
          shipper_telhp : body.shipper_telhp,
          cargo_id : body.cargo_id,
          lat_dest : body.lat_dest,
          long_dest : body.long_dest,
          whcd : body.whcd,
          whnm : body.whnm,
          id_address : body.id_address,

         
        });
        return res.status(200).json( {status: 'sukses', insert});  
      } catch (err) {
        if(err.parent.number == 2627)
        {
            return res.status(409).json({ status: 'gagal', pesan: 'MemberId telah terdaftar' });
        }
        else{
            return res.status(500).json({ pesan: 'Internal server error' });
        }  
      }

  };

const getTransShipAddrTmp= async (req, res) => {
    try {
      let header = await TransShipAddrTmp.findAll(
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
    addTransShipAddrTmp,
    getTransShipAddrTmp,
  };
};

module.exports = TransShipAddrTmpController;
