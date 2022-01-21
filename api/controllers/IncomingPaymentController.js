// const sequelize = require('../../config/db/database');
const Custpaydet = require('../models/Custpaydet');
const sequelizeMlm2010 = require("../../config/db/klink_mlm2010.js");
const { internalError, logSuccess, logError } = require("../services/logger");
crypto = require("crypto");

const IncomingPaymentController = () => {
	const getIncPaymentByStockist = async (req, res) => {
		const { loccd } = req.body;
		// let loccd	= loccd;
		// return hasil;

		try {
			let sql =
				"SELECT CONVERT(VARCHAR(10), A.createdt, 126) as createdt, a.dfno, dbo.getCustName( a.dfno, a.custtype, a.PT_SVRID ) fullnm, a.trcd, " +
				" a.custtype, a.amount, a.balamt " +
				" FROM custpaybal a " +
				" WHERE a.balamt>0 and a.dfno in ('" +
				loccd +
				"') and a.[status]='O' and a.custtype='S' " +
				" ORDER BY a.createdt desc;";

			let dataIP = await sequelizeMlm2010.query(sql);
			// console.log(dataIP[0]);

			if (!dataIP) {
				return logError(req, res, 400, "Record not founded.");
			} else {
				return res.status(200).json(dataIP[0]);
			}
		} catch (err) {
			return internalError(req, res, err);
		}
	};

	const insertIncPaymentDetailsOld = async (req, res) => {
		// const {trcd, trtype, effect, etdt, trdt, dfno, custtype, amount, createnm, applyto} = req.body;
		let { body } = req;
      	var incPayment = [];

    	// console.log(body)
    	if (body.length > 0) {

	      for (let i = 0; i < body.length; i++) {
	          incPayment.push({
                              trcd : body[i].trcd,
                              trtype : body[i].trtype,
                              effect : body[i].effect,
                              etdt : body[i].etdt,
                              trdt : body[i].trdt,
                              dfno : body[i].dfno,
                              custtype : body[i].custtype,
                              amount : body[i].amount,
                              createnm : body[i].createnm,
                              applyto : body[i].applyto
	                        });
	        }
		}

    	let transaction;
      	try {
      		// console.log(incPayment);
      			transaction = await sequelizeMlm2010.transaction();

	      		let data  = await Custpaydet.bulkCreate(
		            incPayment, { validate: true }, { transaction },
			      );

	      		await transaction.commit();
      			logSuccess(req, res, 200, data);
		  // let data = await Custpaydet.bulkCreate({
          //                                 trcd : body.trcd,
          //                                 trtype : body.trtype,
          //                                 effect : body.effect,
          //                                 etdt : body.etdt,
          //                                 trdt : body.trdt,
          //                                 dfno : body.dfno,
          //                                 custtype : body.custtype,
          //                                 amount : body.amount,
          //                                 createnm : body.createnm,
          //                                 applyto : body.applyto
          //                               });
        	// return logSuccess(req, res, 200, data); 
   //      let sql = "INSERT INTO Custpaydet(trcd, trtype, effect, etdt, trdt, dfno, custtype, amount, createnm, applyto) "+
   //      		  "VALUES('" + body.trcd + "', '" + body.trtype + "', '" + body.effect + "', '" + body.etdt + "', '" + 
   //      		   body.trdt + "', '" + body.dfno + "', '" + body.custtype + "', '" + body.amount + "', '" + 
   //      		   body.createnm + "', '" + body.applyto + "')";

			// let dataIP = await sequelizeMlm2010.query(sql);
			// console.log(dataIP[0]);

			// if (!dataIP) {
			// 	return logError(req, res, 400, "Record not founded.");
			// } else {
				// return res.status(200).json(dataIP[0]);
			// }
			// console.log('sukses euy...')
      } catch (err) {
      	await transaction.rollback();

	      if (err.name == "SequelizeUniqueConstraintError") {
	        return res
	          .status(409)
	          .json({
	            status: "conflict",
	            message: "Orderno is already registered",
	          });
	      }
	      if (err.name == "AggregateError") {
	        return res
	          .status(409)
	          .json({
	            status: "conflict",
	            message: err[0].errors.errors[0].message,
	          });
	      } else {
	        console.log(err);
	        internalError(req, res, err);
	      }
	    }
      // 	console.log(err)
      //   return internalError(req, res, err);
      // }
	};


	const insertIncPaymentDetailsX = async (req, res) => {
		// const {trcd, trtype, effect, etdt, trdt, dfno, custtype, amount, createnm, applyto} = req.body;
		let { body } = req;
		let dataRes = [];

    	// console.log(body)
    	if (body.length > 0) {

	      for (let i = 0; i < body.length; i++) {
	      	  let incPayment = [];
	          incPayment.push({
                              trcd : body[i].trcd,
                              trtype : body[i].trtype,
                              effect : body[i].effect,
                              etdt : body[i].etdt,
                              trdt : body[i].trdt,
                              dfno : body[i].dfno,
                              custtype : body[i].custtype,
                              amount : body[i].amount,
                              createnm : body[i].createnm,
                              applyto : body[i].applyto
	                        });
	          // console.log(incPayment);
	        	try {
			        let data = await Custpaydet.create(incPayment[0]);
			        dataRes.push(data);
			        return logSuccess(req, res, 200, data); 
		      	}catch (err) {
		        	return internalError(req, res, err);
		      	}

	        }
		}

	};

	const insertIncPaymentDetails = async (req, res) => {
		// const {trcd, trtype, effect, etdt, trdt, dfno, custtype, amount, createnm, applyto} = req.body;
		let { body } = req;
		let sql = "";
		let trcdX = "";

    	// console.log(body)
    	if (body.length > 0) {

	      for (let i = 0; i < body.length; i++) {
	      		// console.log(body[i].trcd);
	          	sql = "INSERT INTO Custpaydet(trcd, trtype, effect, etdt, trdt, dfno, custtype, amount, createnm, applyto) "+
        		  	  "VALUES('" + 	body[i].trcd + "', '" + 
        		  					body[i].trtype + "', '" + 
        		  					body[i].effect + "', '" + 
        		  					body[i].etdt + "', '" + 
        		  					body[i].trdt + "', '" + 
        		  					body[i].dfno + "', '" + 
        		  					body[i].custtype + "', '" + 
        		  					body[i].amount + "', '" + 
        		  					body[i].createnm + "', '" + 
        		  					body[i].applyto + "'); " + sql;

        		trcdX = "'" + body[i].trcd + "'," +  trcdX
	        }
	        
	        trcdX = trcdX.slice(0, trcdX.length - 1);
	        //start check data based on trcd
	        try{
		        let checkIP = "SELECT trcd, trtype, effect, etdt, trdt, dfno, custtype, amount, createnm, applyto " +
		        			  "FROM Custpaydet WHERE trcd IN ("+ trcdX +") " +
		        			  "GROUP BY trcd, trtype, effect, etdt, trdt, dfno, custtype, amount, createnm, applyto";

		        let datacheckIP = await sequelizeMlm2010.query(checkIP);

		        if (datacheckIP[0] == "" || datacheckIP[0] == '' ) {
					//START if no date exist, then insert into table Custpaydet
					let data = await sequelizeMlm2010.query(sql);
					// console.log(trcdX + " -- hasilnya -- " + data);
					if (!data) {
						return logError(req, res, 400, "Record not founded.");
					} else {
						return logSuccess(req, res, 200, data[0]); 
					}
					//END if no date exist, then insert into table Custpaydet
				} else {
					return logError(req, res, 400, datacheckIP[0][0].trcd + ", One of transaction already exist");
				}
				//end check data based on trcd
			}catch (err) {
				return internalError(req, res, err);
			}

		}

	};


	const hmacValidate = async (param, headers) => {
		let secret = "populi";

		let test = crypto.createHmac('sha256', secret).update(JSON.stringify(param)).digest("base64");
		console.log(test);
		calculated_hmac = crypto
			.createHmac("sha256", secret)
			.update(JSON.stringify(param));
		return headers == calculated_hmac;
	};

	const getIncPaymentFromServicePayment = async (req, res) => {
		let header =  req.header('x-servicepayment');
		let signature = await hmacValidate(req.body, header);
		console.log(signature);
		if (signature){
		logSuccess(req, res, 200, {}, "data received");
	} else{
		logError(req,res,401,"validation error")
	}
	};

	return {
		getIncPaymentByStockist,
		getIncPaymentFromServicePayment,
		insertIncPaymentDetailsOld,
		insertIncPaymentDetails
	};
};

module.exports = IncomingPaymentController;