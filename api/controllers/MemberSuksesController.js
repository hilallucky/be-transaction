const MemberSukses = require('../models/MemberSukses');

const MemberSuksesController = () => {

  const addMember = async (req, res) => {
    let { body } = req;
      try {
        let data = await MemberSukses.create({
          sponsorid     : body.sponsorid,
          memberid    : body.memberid,
          membername    : body.membername,
          idno      : body.idno,
          addr1     : body.addr1,
          addr2     : body.addr2,
          addr3     : body.addr3,
          tel_hm      : body.tel_hm,
          tel_hp      : body.tel_hp,
          email     : body.email,
          stk_code    : body.stk_code,
          sex       : body.sex  ,
          birthdt     : body.birthdt,
          country     : body.country,
          acc_no      : body.acc_no,
          acc_name    : body.acc_name,
          bankid      : body.bankid,
          joindt      : body.joindt,
          trx_no      : body.trx_no,
          noapl     : body.noapl,
          kdpos     : body.kdpos,
          state     : body.state,
          ip_address    : body.ip_address,
          prdcd     : body.prdcd,
          password    : body.password,
          userlogin   : body.userlogin,
          recruiterid   : body.recruiterid,
          flag_voucher  : body.flag_voucher,
          voucher_no    : body.voucher_no,
          voucher_key   : body.voucher_key,
          is_landingpage  : body.is_landingpage,
          id_landingpage  : body.id_landingpage,
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
            return res.status(500).json({ status: 'failed', message: 'Internal server error' });
        }  
          
      }

  };

const getMembers= async (req, res) => {
    try {
      let member = await MemberSukses.findAll(
        {
          limit :25,
        }
        );

      return res.status(200).json( member );
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };


  const checkMembers= async (req, res) => {
    let { idno, tel_hp } = req.body;
    try {
      let checkKtp = await MemberSukses.count({
        where: {
          idno
        },
      });
      let checkHp = await MemberSukses.count({
        where: {
          tel_hp
        },
      });

      if (checkKtp == 0 & checkHp == 0){
       return res.status(200).json( {status:'sukses', checkKtp, checkHp} );
      }
      else {
        return res.status(409).json( {status:'failed', checkKtp, checkHp} );
      } 

    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };
 
const updateMember = async (req, res) => {
    let { email } = req.body;
    let { tel_hp } = req.body;
    let { password } = req.body;
    let { acc_no } = req.body;
    let { acc_name } = req.body;
    let { bankid } = req.body;
    let { memberid } = req.body;
    try {
      let data = await MemberSukses.findOne({
            where: {
              memberid,
            },
          });
      if(!data) {
        return res.status(400).json({ msg: 'Bad Request: Member not found' });
      }

      let updatedMember = await data.update({
        email: email,
        tel_hp: tel_hp,
        password : password,
        acc_no: acc_no,
        acc_name: acc_name,
        bankid: bankid,
      });

      return res.status(200).json({ updatedMember });
    } catch (err) {
      console.error(err);

      return res.status(500).json({ msg: 'Internal server error' });
    }
  };




  return {

    addMember,
    getMembers,
    checkMembers,
    updateMember,
  };
};

module.exports = MemberSuksesController;
