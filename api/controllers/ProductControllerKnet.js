const sequelize = require('../../config/db/database');
const redis = require('redis');
const client = redis.createClient();
const {internalError, logSuccess, logError} = require('../services/logger');
const ShippingcController = require("../controllers/ShippingcController");
const MiscController = require("../controllers/MiscController");

const ProductControllerKnet = () =>{

	const getProductAllPerPage = async(req, res) => {
		const {limit, page, srcval} = req.body;
	    let offset	= parseInt(page);
	    let lit 	= parseInt(limit);
	 	// console.log('masuk ke sini');
	 	// let hasil = 'hasilnya euy....';
	 	// return hasil;
	    
	    let srcvalx = " AND (prdnm LIKE '%$" + srcval + "%' or a.searchPrd LIKE '%" + srcval + "%') ";
	    if(srcval == "all"){
	    	srcvalx = "";
	    }

		try{
			let sql = " DECLARE @pageSize INT = " + limit  +
					  "	SELECT * FROM ( SELECT PageNumber =  CEILING(CAST(ROW_NUMBER() OVER(ORDER BY prdcd ASC) AS FLOAT)/@pageSize), " +
									    	 "	a.prdcd, a.prdnm, a.searchPrd, a.prdcdcat, a.prdnmcatnm, a.img_url, " +
									         "  a.price_w, a.price_e, a.price_cw, a.price_ce, a.bv, a.weight, " +
									         "  a.ecomm_status, a.is_discontinue, a.max_order, " +
									         "  a.is_bestseller, a.is_hotproduct, a.is_newproduct " +
									"	FROM V_Ecomm_PriceList_Baru a " +
									"	WHERE A.is_starterkit='0' AND a.price_w is not null and a.price_e is not null " +
												srcvalx +
								"	) product_all " +
					"	WHERE product_all.PageNumber = " + page +
					"	ORDER BY product_all.prdnm; ";

			let dataProduct = await sequelize.query(sql);
			// console.log(dataProduct[0]);	
	 
	        if (!dataProduct) {
	         return logError(req, res, 400, 'Record not founded.');
	        }else{
	        	client.hset('productknet', limit + ":" + page,JSON.stringify(dataProduct[0]));
	        }
        
			// return logSuccess(req, res, 200, dataProduct[0], 'Get product for page ' + page + ', success.') 
			return res.status(200).json(dataProduct[0]);  



		}catch(err){
			return internalError(req, res, err);
		}

	};


	// const cekProductByParamArr = async(prdcd, dp, cp, bv, pricecode, detailPrd, res) => {
	const cekProductByParamArr = async(field, res) => {

		let errMsg, errCode, errCount = 0; //errCount tambahkan 1 jika ada error
		let whcd, id_address, is_free_sip_from_member, id_lp, idstk, id_memb, is_cod, sentTo, appname;
		let id_addressShip, service_type_id, service_type_name, pay_insurrance, payShipFe;
		let totalBV, totPayDP, totPayCP, totalDP, totalCP, total_weight, weight, qtyOrd, grdtotalBV, grdtotalDP, grdtotalCP, grdWeight;
		let totalAllWeight = 0;
		let resDet = [];
		let isiRes, dataShippAddr;

		let pricecode, orderno;
		let detail, sql, dataProduct;
		let arrPrd, arrQty, arrBV, arrDP, arrCP;
		let arrPrdX, arrQtyX, arrBVX, arrDPX, arrCPX;
		
		// let { body } = field;
		let body  = field;
		// console.log("body = " + body);
		// console.log(body.length);
		console.log("Mulai proses cekProductByParamArr");
		for (let i = 0; i < body.length; i++) {
			console.log("Mulai for i = " + i);
			pricecode = body[i].pricecode;
			orderno = body[i].orderno;
			total_bv = body[i].total_bv;
			totPayDP = body[i].totPayDP;
			totPayCP = body[i].totPayCP;
			whcd = body[i].whcd;
			id_addressHdr = body[i].id_address;	
			is_free_sip_from_member	= body[i].is_free_sip_from_member;
			id_lp = body[i].id_lp;
			idstk = body[i].idstk;
			id_memb = body[i].id_memb;
			pay_insurrance = body[i].pay_insurrance;
			is_cod = body[i].is_cod;
			sentTo = body[i].sentTo;
			payShipFe = body[i].payShip;
			appname =  body[i].appname;

			dataShippAddr = body[i].shippAddr[0];
			total_weight = dataShippAddr.total_weight;
			id_addressShip = dataShippAddr.id_address;
			service_type_id = dataShippAddr.service_type_id;
			service_type_name = dataShippAddr.service_type_name;

			// console.log("detailPrd = " + body[i].detailPrd[0].prdcd);
			// console.log("mulai map dari detail untuk orderno = " + orderno);
          	detail = body[i].detail;
          	// console.log("detail nya adalah = " + detail);
          
			arrPrd = detail.map( function(el) { return "'" + el.prdcd + "'"; });
			arrQty = detail.map( function(el) { return "'" + el.qty + "'"; });
			arrBV = detail.map( function(el) { return "'" + el.bvr + "'"; });
			arrDP = detail.map( function(el) { return "'" + el.dpr + "'"; });
			arrCP = detail.map( function(el) { return "'" + el.cpr + "'"; });
			// arrpricecode = body[i].detailPrd.map( function(el) { return "'" + el.pricecode + "'"; });
			
			arrPrdX = detail.map( function(el) { return el.prdcd; });
			arrQtyX = detail.map( function(el) { return el.qty; });
			arrBVX = detail.map( function(el) { return  el.bvr; });
			arrDPX = detail.map( function(el) { return el.dpr; });
			arrCPX = detail.map( function(el) { return el.cpr; });

			console.log("orderno = " +orderno);
			// console.log("total_weight = " + total_weight);	
			// console.log("arrQtyX = " +arrQtyX);

			try{
				sql = " SELECT a.prdcd, a.prdnm, a.price_w, a.price_e, a.price_cw, a.price_ce, a.bv, a.weight, " +
								   	"  a.ecomm_status, a.is_discontinue, a.max_order " +
						  "	FROM V_Ecomm_PriceList_Baru a " +
						  "	WHERE A.prdcd IN ("+ arrPrd +")";
						// "	ORDER BY A.prdnm; ";

				dataProduct = await sequelize.query(sql);
				// console.log(dataProduct[0]);	
		 
		        if (!dataProduct) {
		        	errCount = errCount + 1;
		         	// return logError("", res, 400, 'Product not founded.');
		         	return errCount;
		        }else{
		   //      	//Cek Product 

		   //      	//1. Apakah Jumlah Record Product Sesuai dengan jumlah Array Product
		   			let prdcdY, prdnmY;
		   			let prdcdLen, dataProductLen;
		   			let BVY, dpY, cpY, weightY, ecomm_statusY, is_discontinueY, max_orderY;

		        	prdcdLen = arrPrdX.length;
		        	dataProductLen = dataProduct[0].length;

		        	// console.log("prdcdLen = "+ prdcdLen);
		        	// console.log("dataProductLen = "+ dataProductLen);

		        	if(prdcdLen != dataProductLen){ //Jika tidak sama, maka return error
		        		errMsg = "Cart contain illegal product(s).";
						errCode = 400;
						errCount = errCount + 1;
		        	}else{ //jika sama, maka lanjut ke pengecekan berikutnya
		        		// console.log("masuk else sama dengan");

		        		prdcdY = dataProduct[0].map( function(el) { return el.prdcd; });
		        		prdnmY = dataProduct[0].map( function(el) { return el.prdnm; });
		        		BVY = dataProduct[0].map( function(el) { return el.bv; });

		        		if(pricecode == '12W4' || pricecode == '12W3'){ //Harga Barat (A)
		        			dpY = dataProduct[0].map( function(el) { return el.price_w; });
		        			cpY = dataProduct[0].map( function(el) { return el.price_cw; });
		        		}else if(pricecode == '12E4' || pricecode == '12E3'){ //Harga Timur (B)
		        			dpY = dataProduct[0].map( function(el) { return el.price_e; });
		        			cpY = dataProduct[0].map( function(el) { return el.price_ce; });
		        		}
		        		
		        		weightY = dataProduct[0].map( function(el) { return el.weight; });
		        		ecomm_statusY = dataProduct[0].map( function(el) { return el.ecomm_status; });
		        		is_discontinueY = dataProduct[0].map( function(el) { return el.is_discontinue; });
		        		max_orderY = dataProduct[0].map( function(el) { return el.max_order; });

		        		// console.log("prdcdY = " + prdcdY);
		        		// console.log("prdnmY = " + prdnmY);
		        		// console.log("dpY = " + dpY);
		        		// console.log("arrPrdX = " + arrPrdX);

		        		//========================================================================================================================================
		        		//MULAI CEK SELANJUTNYA (2,3,4)
		        		//2. Apakah BV & Harga (Minimal) Sesuai Dengan Di Database
		        		//3. Apakah Melebihi Max Order
						//4. Apakah Ada Product Yang Sudah Discontinue
						//========================================================================================================================================
			        	// console.log("hasil dataProduct = "+ dataProduct[0].prdcd);
			        	
			        	let prdcdDb;
			        	let checkPrd, bvDb, dpDb, cpDb, max_orderDb, weightDb;
			        	let prdcdFe;
			        	let bvFe, dpFe, cpFe, qtyFe;

						for (let k = 0; k < dataProductLen; k++) {
							
							if(k == 0){ 
								totalBV = 0; 
								totalDP = 0; 
								totalCP = 0;
								weight = 0;
								grdtotalBV = 0;
								grdtotalDP = 0;
								grdtotalCP = 0;
								qtyOrd = 0;
								grdWeight = 0
							}

							prdcdDb = dataProduct[0][k].prdcd;
							bvDb = dataProduct[0][k].bv;
							totalBV = totalBV + bvDb;

							if(pricecode == '12W4' || pricecode == '12W3' || pricecode == '12W'){ //Harga Barat (A)
								console.log("masuk ke 12W = " + pricecode);
			        			dpDb = dataProduct[0][k].price_w;
			        			cpDb = dataProduct[0][k].price_cw;
			        		}else if(pricecode == '12E4' || pricecode == '12E3' || pricecode == '12E'){ //Harga Timur (B)
			        			console.log("masuk ke 12E = " + pricecode);
			        			dpDb = dataProduct[0][k].price_e;
			        			cpDb = dataProduct[0][k].price_ce;
			        		}
			        		weightDb = dataProduct[0][k].weight;
							max_orderDb = dataProduct[0][k].max_order;
							totalDP = totalDP + dpDb;
							totalCP = totalCP + cpDb;

							// console.log("prdcdDb = " + prdcdDb);
							// console.log("bvDb = " + bvDb);
							// console.log("dpDb = " + dpDb);
							// console.log("cpDb = " + cpDb);
							console.log("weightDb = " + weightDb);
							// console.log("max_orderDb = " + max_orderDb);

							checkPrd = arrPrdX.indexOf(dataProduct[0][k].prdcd);

							if(checkPrd >= 0){

								prdcdFe = arrPrdX[checkPrd];
								bvFe = arrBVX[checkPrd];
								dpFe = arrDPX[checkPrd];
								cpFe = arrCPX[checkPrd];
								qtyFe = arrQtyX[checkPrd];

								grdtotalBV = grdtotalBV + (bvDb * qtyFe);
								grdtotalDP = grdtotalDP + (dpDb * qtyFe);
								grdtotalCP = grdtotalCP + (cpDb * qtyFe);
								grdWeight = grdWeight + (weightDb * qtyFe);


								// console.log("prdcdFe = " + prdcdFe);
								// console.log("bvDb == bvFe => " + bvDb + " == " + bvFe);
								// console.log("dpDb == dpFe => " + dpDb + " == " + dpFe);
								// console.log("cpDb <= cpFe => " + cpDb + " <= " + cpFe);
								// console.log("qtyFe <= max_orderDb => " + qtyFe + " <= " + max_orderDb);

								// console.log("grdtotalBV = " + grdtotalBV);
								// console.log("grdtotalDP = " + grdtotalDP);
								// console.log("grdtotalCP = " + grdtotalCP);
								// console.log("grdWeight = " + grdWeight);

								console.log("errCount 01 = " + errCount);

								if(bvDb == bvFe && dpDb == dpFe && cpDb <= cpFe && qtyFe <= max_orderDb){
									// errCount = 0;
									return "hallooooo";
								}else{
									errCount = errCount + 1;
								}

								console.log("errCount 01A = " + errCount);

							}else{
								errCount = errCount + 1;
							}

							console.log("errCount 01B = " + errCount);
							
						}
						//end check no =============================================================================

		        	}

		        }
	        
			}catch(err){
				errCount = errCount + 1;
				// return res.status(400).json({ message: 'Bad Request: ' + err, data: {errCount}  });
				return {status:409, msg: 'Bad Request: ' + err, data: {errCount, totalBV, totalDP, totalCP}};
			}

			// console.log("totalAllWeight 01 = " + totalAllWeight);
			// console.log("total_weight 01 = " + total_weight);

			totalAllWeight =parseFloat(totalAllWeight + grdWeight).toFixed(2); //Total berat berdasarkan data dari db;
			// console.log("Total beratnya adalah = " + parseFloat(grdWeight).toFixed(2));

			if(totalAllWeight <= 1) {
				totalAllWeight = 1;
			}
			//============================START Check berat antara di body req dengan hasil dari db=================================
			// console.log("errCount 02 = " + errCount);
			if(totalAllWeight < total_weight){
				errCount = errCount + 1;
				return {status:400, msg: 'Different weight between request and database for order = ' + orderno, data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
			}
			//============================END Check berat antara di body req dengan hasil dari db====================================


			/*
			//=============================START Check ongkos kirim, jika pengiriman ke alamat=======================================
			//cek apakah harganya konsumen atau distributor
			if(sentTo == "2"){
				console.log("Mulai proses START Check ongkos kirim");
				
				let checkPrice;
				try{
					let checkPrice = await MiscController().checkPriceStatus({id_lp: id_lp, cp: totPayCP, dp: totPayDP});
					let priceNonCharge = checkPrice.priceNonCharge;
					let priceWithShippingFe = parseInt(priceNonCharge) + parseInt(payShipFe);
					// console.log("priceWithShippingFe = " + priceWithShippingFe);				
				
					try{
						console.log("Mulai shippingCost");
						let codeShipping = "REG";
						if(is_cod == "1"){ // jika COD, maka code: "COD", joka NON COD maka code: "REG"
							codeShipping = "COD";
						}

						console.log(appname);

						
						let dataShipping;

						if(appname == "digitalbrain.co.id"){
							console.log("masuk ke if");
							dataShipping = ({
											      token: 'klj',
											      whcd: whcd,
											      loccd: whcd,
											      id_member: id_memb,
											      jenis_alamat: id_addressShip,
											      rec_id: id_addressShip,
											      ekspedisi: service_type_id,
											      berat: parseFloat(totalAllWeight),
											      harga_barang: priceNonCharge,
											      asuransi: parseFloat(pay_insurrance),
											      package: {
											                    code: codeShipping, //service_type_name, //'REG',
											                    service: service_type_name,
											                    fee: parseFloat(payShipFe),
											                    asuransi: pay_insurrance,
			                    								totalfee: priceWithShippingFe																				                  }
											  });
						}else{
							console.log("masuk ke if");
							dataShipping = ({
											      token: 'klj',
											      whcd: whcd,
											      loccd: whcd,
											      id_member: id_memb,
											      jenis_alamat: id_addressShip,
											      ekspedisi: service_type_id,
											      berat: parseFloat(totalAllWeight),
											      harga_barang: priceNonCharge,
											      asuransi: parseFloat(pay_insurrance),
											      package: {
											                    code: codeShipping, //service_type_name, //'REG',
											                    service: service_type_name,
											                    fee: parseFloat(payShipFe),
											                    asuransi: pay_insurrance,
			                    								totalfee: priceWithShippingFe																				                  }
											  });
						}

						console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
						console.log(dataShipping);
						console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
						let shippingCost = await ShippingcController().checkPayShip(dataShipping);

						// return res.json("resStatus");
						// console.log("shippingCost");
						// console.log(shippingCost);
						// console.log("shippingCost.status = " + shippingCost.status);
						// console.log("shippingCost.data.data_api[0] = ");
						// console.log(shippingCost.data.data.data_api);
						
						let dataPriceShipping = shippingCost.data.data.data_api;
						let isCodeSame = 0;
						console.log("START****************************************");
						console.log("dataPriceShipping.length = " + dataPriceShipping.length);
						for (let l = 0; l < dataPriceShipping.length; l++) {
							let dataPriceShippingCode = dataPriceShipping[l].code;
							// console.log("codeShipping = " + codeShipping);
							// console.log("dataPriceShippingCode = " + dataPriceShippingCode);
							// console.log("dataPriceShipping[" + l +"].data_api.fee = " + dataPriceShipping[l].fee);
							if(dataPriceShippingCode == codeShipping){ // jika code sama, maka bandingkan harga/ongkos kirim
								console.log("Mulai tambah 1 isCodeSame = " + isCodeSame);
								isCodeSame = isCodeSame + 1;
								if(parseInt(payShipFe) < parseInt(shippingCost.data.fee)){ //ongkir dari frontend minimal harus sama atau lebih besar dari ShippingController, Jika lebih kecil maka return error
									console.log("Ada selisih Ongkir antara frontend dengan vendor 01");
									errCount = errCount + 1;
									return {status:400, msg: 'Check untally shipping cost (01) in order = ' + orderno, data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
								}
								break;
							}else if(dataPriceShippingCode != codeShipping){ // jika code tidak sama, maka set isCodeSame = 0 dan return error
								console.log("(Else) Tidak tambah 1 isCodeSame = " + isCodeSame);
								isCodeSame = 0;
							}
						}

						

						// console.log("isCodeSame = " + isCodeSame);
						if(isCodeSame == 0){
							errCount = errCount + 1;
							return {status:400, msg: 'Check shipping type (not same) in order = ' + orderno, data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
						}
						
						// console.log("END****************************************");
						// console.log("shippingCost payShipFe = " + parseInt(payShipFe));
						if(shippingCost.status == true){

							console.log("Masuk ke cek shippingCost.status = " + shippingCost.status);
							

							// let dataPriceShipping = shippingCost.data.data.data_api;
							// for (let l = 0; i < dataPriceShipping.length; i++) {
							// 	let dataPriceShippingCode = dataPriceShipping[l].code;

							// 	if(dataPriceShippingCode == codeShipping){ // jika code sama, maka bandingkan harga/ongkos kirim

							// 	}else (if(dataPriceShippingCode != codeShipping)){

							// 	}
							// }


							// console.log("shippingCost.data.status = " + shippingCost.data.status);
							console.log("Check Shipping Tidak ada kendala");
							if(parseInt(payShipFe) < parseInt(shippingCost.data.fee)){ //ongkir dari frontend minimal harus sama atau lebih besar dari ShippingController, Jika lebih kecil maka return error
								console.log("Ada selisih Ongkir antara frontend dengan vendor");
								errCount = errCount + 1;
								return {status:400, msg: 'Check untally shipping cost in order = ' + orderno, data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
							}
						}else{
							console.log("Check Shipping ada kendala else");
							errCount = errCount + 1;
							return {status:400, msg: 'Check detail data shipping in order (01) = ' + orderno, data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
						}
					}catch(err){
						console.log("Check Shipping ada kendala catch dari try shippingCost");
						errCount = errCount + 1;
						return {status:400, msg: 'Check detail data shipping in order (02) = ' + orderno, data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
					}
				}catch(err){
					console.log("Check checkPriceStatus ada kendala catch dari try checkPriceStatus");
					errCount = errCount + 1;
					return {status:400, msg: 'Check detail data shipping in order (03) = ' + orderno, data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
				}

			

				console.log("Check Shipping selesai");
				// console.log("totalAllWeight = " + totalAllWeight);
				// console.log("total_weight = " + total_weight);
				if(totalAllWeight <= 1) {
					totalAllWeight = 1;
				}

				if(totalAllWeight < total_weight){
					console.log("Check masuk ke totalAllWeight");
					errCount = errCount + 1;
					return {status:400, msg: 'Different weight between request and database for order = ' + orderno, data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
				}

				console.log("Check Berat selesai");
			}
			//=============================END Check ongkos kirim============================================
			*/


			let dataProductX = dataProduct[0];
			//Create result Data untuk response
			resDet.push({
				orderno:orderno, pricecode:pricecode, totalBV: totalBV, totalDP: totalDP, totalCP: totalCP, grdtotalBV: grdtotalBV, grdtotalDP: grdtotalDP, grdtotalCP: grdtotalCP, dataProductX: dataProductX,
			});	

			console.log("Siap2 masuk ke cek akhir");

			//Jika errCount > 0, artinya ada data product dari frontend yang tidak sesuai dengan database
			if(i == (body.length - 1)){
				console.log(resDet);

				if (total_bv != grdtotalBV || totPayDP != grdtotalDP || totPayCP < grdtotalCP) { //COMPARE antara body.total_bv dengan grdtotalBV, body.total_bv dengan grdtotalDP, body.total_bv dengan grdtotalCP
					errCount = errCount + 1;
					return {status:400, msg: 'Untally Total Header & Detail (BV/DP)', data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
				}

				if(errCount > 0){
					// return {status:400, msg: 'Illegal Record founded ', data: {errCount, resDet}};
					return {status:400, msg: 'Illegal Record founded ', data: {errCount, resDet}}; //totalBV, totalDP, totalCP, dataProductX}};
				}else{
					// console.log("body.length = " + body.length);
					// console.log(errCount);
					return {status:200, msg: 'Success check product(s)', data: {errCount, resDet}}; // totalBV, totalDP, totalCP, dataProductX}};
				}
			}

		}

	};




	const cekaja = async(prdcd) => {
		console.log(prdcd);
		let query = "select * from table where field in (" + prdcd + ")";
		console.log(query);
	}

	const cekProductByParam = async(req, res) => {
		let { body } = req;
		// console.log(req.body[detailPrd]);
		// for (let i = 0; i < body.length; i++) {
		// 	var arrPrd = body[i].detailPrd.omap( function(el) { return "'" + el.prdcd + "'"; });
		// 	var arrQty = body[i].detailPrd.map( function(el) { return "'" + el.qty + "'"; });
		// 	var arrBV = body[i].detailPrd.map( function(el) { return "'" + el.bvr + "'"; });
		// 	var arrDP = body[i].detailPrd.map( function(el) { return "'" + el.dpr + "'"; });
		// 	var arrCP = body[i].detailPrd.map( function(el) { return "'" + el.cpr + "'"; });
		// 	var arrpricecode = body[i].detailPrd.map( function(el) { return "'" + el.pricecode + "'"; });
		// 	let query = "select * from table where field in (" + arrPrd + ")";
			
		// 	// return res.json(query);

		// 	// console.log(arrPrd, arrQty);
		// 	// console.log(query);
		// 	// cekaja(arrPrd);
		// 	// cekProductByParamArr(arrPrd, arrDP, arrCP, arrBV, arrpricecode, body[i].detailPrd, res);
		// }

		// console.log(body);
		console.log('hshshshshshshs');
		let retData;
		retData = await cekProductByParamArr(body);

		dataResponse = retData.data.resDet;
		console.log("retData.data.errCount = " +retData.data.errCount);
		console.log("retData.data.orderno = " +dataResponse[0].orderno);
		console.log("retData.data.pricecode = " +dataResponse[0].pricecode);
		console.log("dataRespnse[0].totalBV = " +dataResponse[0].totalBV);
		console.log("dataResponse[0].totalDP = " +dataResponse[0].totalDP);
		console.log("dataResponse[0].totalCP = " +dataResponse[0].totalCP);
		console.log("retData.data.orderno = " +dataResponse[1].orderno);
		console.log("retData.data.pricecode = " +dataResponse[0].pricecode);
		console.log("dataResponse[1].totalBV = " +dataResponse[1].totalBV);
		console.log("dataResponse[1].totalDP = " +dataResponse[1].totalDP);
		console.log("dataResponse[1].totalCP = " +dataResponse[1].totalCP);
		return res.json(retData);
	};

	return {
		getProductAllPerPage,
		cekProductByParamArr,
		cekProductByParam,
		cekaja
	};

};

module.exports = ProductControllerKnet;
