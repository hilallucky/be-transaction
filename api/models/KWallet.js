const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');

//`id`, `name`, `company`, `discount`, `logo`, 
//`isActive`, `isCod`, `isCodPay`, `codRate`

const saldo_kwallet = 'saldo';

const KWallet = sequelize.define('va_cust_pay_bal', {

dfno : {
    type: Sequelize.STRING, primaryKey: true, allowNull: false,
  },
novac : {
    type: Sequelize.STRING, 
  },
amount : {
    type: Sequelize.INTEGER, 
  },


}, {freezeTableName: true, timestamps: false, saldo_kwallet });


module.exports = KWallet;

/*
//get saldo VA
SELECT novac, dfno, amount FROM va_cust_pay_bal a WHERE a.dfno = '$idmember'


// potong saldo
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


*/