const TransPayDateTmp = require('../models/TransPayDateTmp');

const TransPayDetTmpController = () => {

  const addTransPayDetTmp = async (req, res) => {
    let { body } = req;

    let expired_pay_time = "";


    try {
      if (!body.expired_pay_time) {
          let data = await TransPayDateTmp.create({
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
            expired_pay_time : body.expired_pay_time,
           
          });
      }else{
         let data = await TransPayDateTmp.create({
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
      }

      // try {
      //   let data = await TransPayDateTmp.create({
      //     orderno : body.orderno,
      //     seqno : body.seqno,
      //     paytype : body.paytype,
      //     docno : body.docno,
      //     payamt : body.payamt,
      //     deposit : body.deposit,
      //     notes : body.notes,
      //     paystatus : body.paystatus,
      //     bank_code_payment : body.bank_code_payment,
      //     charge_admin : body.charge_admin,
         
      //   });
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

const getTransPayDetTmp= async (req, res) => {
    try {
      let header = await TransPayDateTmp.findAll(
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
    addTransPayDetTmp,
    getTransPayDetTmp,
  };
};

module.exports = TransPayDetTmpController;
