const TransPayDateSukses = require('../models/TransPayDateSukses');

const TransPayDateSuksesController = () => {

  const addTransPayDateSukses = async (req, res) => {
    let { body } = req;
      try {
        let data = await TransPayDateSukses.create({
          orderno : body.orderno,
          seqno : body.seqno,
          paytype : body.paytype,
          docno : body.docno,
          payamt : body.payamt,
          deposit : body.deposit,
          notes : body.notes,
          paystatus : body.paystatus,
          bank_code_payment : body.bank_code_payment,
          charge_admin : body.charge_admin,
         
        });
        return res.status(200).json( {status: 'sukses', data});  
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

const getTransPayDateSukses= async (req, res) => {
    try {
      let header = await TransPayDateSukses.findAll(
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
    addTransPayDateSukses,
    getTransPayDateSukses,
  };
};

module.exports = TransPayDateSuksesController;
