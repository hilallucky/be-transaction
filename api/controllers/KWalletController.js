const KWalletSaldo = require('../models/KWalletSaldo');
const KWalletSaldoUpd = require('../models/KWalletSaldoUpd');


const KWalletController = () => {
  
//get saldo by Distributor Code
const getSaldo = async (req, res) => {
    const { dfno } = req.body;
    
    if (dfno) {
      try {       
        const data = await KWalletSaldo
          .findOne({
            where: {
              dfno
            },
          });

        if (!data) {
          return res.status(400).json({ status: 'failed', message: dfno + ' Insufficient Balance' });
        }
        return res.status(200).json({status:'success ', data });     
      } catch (err) {
        return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };


  //Update (Increase/Decrease K-Wallet Balance)
  const kWalletSaldoUpd = async (req, res) => {
    let { body } = req;
      try {
        let data = await KWalletSaldoUpd.create({z
          trcd        : body.trcd, 
          trtype      : body.trtype, 
          effect      : body.effect, 
          etdt        : body.etdt, 
          trdt        : body.trdt, 
          custtype    : body.custtype, 
          applyto     : body.applyto, 
          bankCode    : body.bankCode, 
          bankDesc    : body.bankDesc, 
          novac       : body.novac, 
          dfno        : body.dfno, 
          docno       : body.docno, 
          refno       : body.refno, 
          amount      : body.amount, 
          createdt    : body.createdt, 
          createnm    : body.createnm, 
          updatedt    : body.updatedt, 
          updatenm    : body.updatenm, 
          postedflag  : body.postedflag, 
          posteddt    : body.posteddt, 
          coa         : body.coa, 
          rq_uuid     : body.rq_uuid, 
          tipe_dk     : body.tipe_dk, 
          effect_acc  : body.effect_acc, 
          tipe_dk_acc : body.tipe_dk_acc, 

        });
        return res.status(200).json( {status: 'success', data});  
      }
      catch (err) {

        if(err.name == 'SequelizeUniqueConstraintError')
        {
            return res.status(409).json({ status: 'failed', message: 'UserID is already registered' });
        }

        if(err.name == 'SequelizeValidationError')
        {         
              return res.status(409).json({  status: 'failed', message: 'Unique Validition Error: ' + err.errors[0]['message']  });
           
        }
        else{
          console.log(err);
            return res.status(500).json({ status: 'failed', message: 'Internal server error' });
        }  
          
      }

 };


 /*
//POTONG SALDO
$dbqryx  = $this->load->database("db_ecommerce", TRUE);
    $arr = array(
      "trcd"    => $data['orderid'],
      //TRS = Transaksi K-NET Register Member
      "trtype"  => "TRM",
      "effect"  => "-",
      "effect_acc"  => "+",
      "custtype"=> "M",
      "novac"   => $saldo[0]->novac,
      "dfno" => $idmember,
      "docno" => "",
      "refno" => "",
      "amount" => $amount,
      "createnm" => $idmember,
      "tipe_dk" => "D",
      "tipe_dk_acc" => "K"
      
    );
    //echo "<pre>";
    //print_r($arr);
    //echo "<pre>";
    
    $potSaldo = $dbqryx->insert('va_cust_pay_det',$arr);
    if($potSaldo < 1) {
      $resJson = jsonFalseResponse("Gagal potong saldo..");
      echo json_encode($resJson);
      return;
    }
 */


  //Update (POTONG SALDO K-Wallet)
  const kWalletSaldoDeduct = async (req, res) => {
    // let trcdbody } = req;
    let { email, password } = req.body;
      try {
        let data = await KWalletSaldoUpd.create({
          trcd        : body.trcd, 
          trtype      : body.trtype, 
          effect      : body.effect, 
          etdt        : body.etdt, 
          trdt        : body.trdt, 
          custtype    : body.custtype, 
          applyto     : body.applyto, 
          bankCode    : body.bankCode, 
          bankDesc    : body.bankDesc, 
          novac       : body.novac, 
          dfno        : body.dfno, 
          docno       : body.docno, 
          refno       : body.refno, 
          amount      : body.amount, 
          createdt    : body.createdt, 
          createnm    : body.createnm, 
          updatedt    : body.updatedt, 
          updatenm    : body.updatenm, 
          postedflag  : body.postedflag, 
          posteddt    : body.posteddt, 
          coa         : body.coa, 
          rq_uuid     : body.rq_uuid, 
          tipe_dk     : body.tipe_dk, 
          effect_acc  : body.effect_acc, 
          tipe_dk_acc : body.tipe_dk_acc, 

        });
        return res.status(200).json( {status: 'success', data});  
      }
      catch (err) {

        if(err.name == 'SequelizeUniqueConstraintError')
        {
            return res.status(409).json({ status: 'failed', message: 'UserID is already registered' });
        }

        if(err.name == 'SequelizeValidationError')
        {         
              return res.status(409).json({  status: 'failed', message: 'Unique Validition Error: ' + err.errors[0]['message']  });
           
        }
        else{
          console.log(err);
            return res.status(500).json({ status: 'failed', message: 'Internal server error' });
        }  
          
      }

 };


//get saldo K-Wallet by Distributor Code
const getSaldoKWallet = async (req, res) => {
    const { dfno } = req.body;
    
    if (dfno) {
      try {       
        const data = await KWalletSaldo
          .findOne({
            where: {
              dfno
            },
          });

        if (!data) {
          return res.status(400).json({ status: 'failed', message: dfno + ' Insufficient Balance' });
        }
        return res.status(200).json({status:'success ', data });     
      } catch (err) {
        return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };


  //Update (Increase/Decrease K-Wallet Balance)
  const kWalletSaldoUpd = async (req, res) => {
    // let { body } = req;
    const { dfno } = req.body;

    try {
          let sql = "SELECT A.trcd, CONVERT(VARCHAR(10),a.trdt,103) as trdt, A.novac, " +
                            " A.dfno, B.fullnm, B.idno, A.type, A.refno, A.amount, A.status, " +
                            " A.custtype, A.description, A.remarks " +
                    " FROM va_cust_pay_bal A " +
                    " LEFT OUTER JOIN klink_mlm2010.dbo.msmemb B ON A.dfno=B.dfno " +
                    " WHERE A.dfno = '"+ dfno +"');";

          let dataKWallet = await sequelize.query(sql)

          // console.log(dataKWallet);

          if (dataKWallet[0] == null || dataKWallet[0] == '') {
            return logError(req, res, 402, 'No balance appears.');
          } else if (dataKWallet[0].length > 0) {
            client.set('banner',JSON.stringify(databanner[0]));
            return logSuccess(req, res, 200, databanner[0])  
            // return res.status(200).json({status:'success ', data });
          }

      }catch(err){
        console.log(err) 
        return internalError(req, res,err )
      }



 };





  return {
    kWalletSaldoDeduct,
    kWalletSaldoUpd,
    getSaldo,
    getSaldoKWallet,
  };

};
module.exports = KWalletController;