//const SmsGatewayAdd = require('../models/SmsGatewayAdd');
const axios = require('axios');

const SmsGatewayAddController = () => {

  
	//untuk menyimpan sms yang sudah akan dikirim
	const addSmsGW = async (req, res) => {
    let { body } = req;
      try {
        let insert = await SmsGatewayAdd.create({
			id    : body.id,
			ipaddress    : body.ipaddress,
			application    : body.application,
			url    : body.url,
			messages    : body.messages,
			sender    : body.sender,
			receiverno    : body.receiverno,
			smsprovider    : body.smsprovider,
			createdt    : body.createdt,
			status    : body.status,
			operator    : body.operator,
			resposegw    : body.resposegw,
			responsedate    : body.responsedate,
			responsenote    : body.responsenote,
        });
       	return res.status(200).json( {status: 'sukses', insert}); 
    	} catch (err) {
         	console.log(err);
        	if(err.parent.number == 2627)
        	{
            	return res.status(409).json({ status: 'gagal', pesan: 'SMS sudah pernah dikirim' });
        	}else{
            	return res.status(500).json({ pesan: 'Internal server error' });
        	}  
      }
	};	 

/*
	//untuk mengambil sms yang sudah pernah dikirim
	const getSmsGW = async (req, res) => {
		try{
			 let sms = await SmsGatewayAdd.findAll({
			 	limit 25,
			 });

			 return res.status(200).json(sms);
		}catch(err){
			console.log(err);
			return res.status(500).json({ msg: 'Internal Server Error' });
		}
	};
*/
	//untuk kirim sms via provider sprintf
	const sendSMS = async (req, res) => {
		/*
		//const axios = require('axios')
		axios.defaults.headers.post['Access-Control-Allow-Origin']='*';
		axios.defaults.headers.post['Content-Type']='application/json';
		axios.defaults.headers.post['Access-Control-Request-Headers']='origin, x-requested-with';
		//axios.defaults.headers.post['Origin']='https://smsgw.sprintasia.net/api/msg.php';
		axios.post('https://smsgw.sprintasia.net/api/msg.php', {
		  u: 'KLink1ndo',
		  p: 'v58ZcM2L',
		  d: '081807278131',
		  m: 'test'
		})
		.then((res) => {
		  console.log(`statusCode: ${res.statusCode}`)
		  console.log(res)
		  if (!res) {
	          return res.status(400).json({ status: 'failed', message: 'MemberID  is wrong' });
	        }
	        return res.status(200).json({status:'success ', res }); 
		})
		.catch((error) => {
		  console.error(error)
		})
		*/
	 params = {
        u: 'KLink1ndo',
		  p: 'v58ZcM2L',
		  d: '081807278131',
		  m: 'test'
      }

    let res = await axios.post('https://smsgw.sprintasia.net/api/msg.php', params);

    console.log(res.data);


	}

//};


  return {
    sendSMS,
  };

};
module.exports = SmsGatewayAddController;