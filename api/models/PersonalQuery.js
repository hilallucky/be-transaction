/*
getListRecruit
getMemberInfo
checkValidasiVoucher
getSalesMember
getSalesMemberDetail
updateInfoMember
checkEmailHpMember
updateInfoMember2
checkPersonalBV
directDownlineBv
myInfo
getBonusReportMember
getBonusReportMember2
showTrxKnet
showTrxKnetMember
ListBonus
ListBonus2
listVoucherMember
listVoucherMember2
getListVoucherDiskon
checkSalesVchGeneral
listTaxMember
regNotifMember
getMemberInfoByID
getMemberInfoByName
getSponsorInfo
*/

const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/klink_mlm2010');

//module.exports = (sequelize, DataTypes) => {
const PersonalQueryModel = () => {
 
 const getMemberInfo = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {});


  const getMemberInfoByID = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
  };


  const getMemberInfoByName = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
  };



  const getMemberInfoByID = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
  };



  const getSponsorInfo = sequelize.define('User', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    companyId: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Company, {foreignKey: 'companyId', as: 'company'})
  };


//Sales Member -- Start
  // const getSalesMember = sequelize.define('V_ECOMM_DETAIL_KNET_TRX', {
  const getSalesMember = sequelize.define('V_ECOMM_API_DETAIL_KNET_TRX_NEW', {  
    orderno : {
    	type: Sequelize.STRING, 
	  },
	log_dfno : {
	    type: Sequelize.STRING, 
	  },
	log_usrlogin : {
	    type: Sequelize.STRING, 
	  },
	memberid : {
	    type: Sequelize.STRING, 
	  },
	membername : {
	    type: Sequelize.STRING, 
	  },
	bonusmonth : {
	    type: Sequelize.STRING, 
	  },
	pricecode : {
	    type: Sequelize.STRING, 
	  },
	idstk : {
	    type: Sequelize.STRING, 
	  },
	total_pay : {
	    type: Sequelize.INTEGER, 
	  },
	total_bv : {
	    type: Sequelize.INTEGER, 
	  },
	secno : {
	    type: Sequelize.STRING, 
	  },
	delivery_status : {
	    type: Sequelize.STRING, 
	  },
	shipping_cost : {
	    type: Sequelize.STRING, 
	  },
	admin_cost : {
	    type: Sequelize.STRING, 
	  },
	sentTo : {
	    type: Sequelize.STRING, 
	  },
	trx_date : {
	    type: Sequelize.STRING, 
	  },
	receiver_name : {
	    type: Sequelize.STRING, 
	  },
	receiver_addr : {
	    type: Sequelize.STRING, 
	  },
	conoteJNE : {
	    type: Sequelize.STRING, 
	  },
	lat_dest : {
	    type: Sequelize.STRING, 
	  },
	long_dest : {
	    type: Sequelize.STRING, 
	  },
	prdcd : {
	    type: Sequelize.STRING, 
	  },
	prdnm : {
	    type: Sequelize.STRING, 
	  },
	qty : {
	    type: Sequelize.INTEGER, 
	  },
	bv : {
	    type: Sequelize.INTEGER, 
	  },
	price : {
	    type: Sequelize.STRING, 
	  },
	sub_tot_bv : {
	    type: Sequelize.INTEGER, 
	  },
	sub_tot_price : {
	    type: Sequelize.INTEGER, 
	  },
	img_url : {
	    type: Sequelize.STRING, 
	  },

  }, {});
//Sales Member -- End





  return {
    getSalesMember,
  };
};


module.exports = PersonalQueryModel;

/*
const PersonalQueryModel = () => {
  
const getMemberInfo = async (req, res) => {
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

  const kwallet = async (req, res) => {
    const { dfno } = req.body;
      console.log(dfno);
      
      try {
        const data = await KWalletSaldo
          .findOne({
            where: {
              dfno,
            },
          });

        if (!data) {
          return res.status(400).json({ status: 'failed', message: 'Insufficient Balance' });
        }
        return res.status(200).json({status: 'success ', data });     
      } catch (err) {
        console.log(err);
        log.error(err)
         return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }
 };

  return {
    getMemberInfo,
    getSaldo
  };

};
module.exports = PersonalQueryModel;
*/
