const TransHeaderProd = require('../models/_TransHeaderSuksesProdTest');
const TransdetTransData = require('../models/TransDetPrdSukses');
const TransPayDateProd = require('../models/TransPayDateSukses');
const TransShipAddrProd = require('../models/TransShipAddrSukses');
const TransHeaderTmp = require('../models/TransHeaderTmp');
const TransPayDateTmp = require('../models/TransPayDateTmp');
const TransShipAddrTmp = require('../models/TransShipAddrTmp');
const Log_login = require('../models/Log_login');
const Log_trans = require('../models/Log_trans');
// const sequelize = require('../../config/db/database');
const sequelize = require('../../config/db/ecomm_production.js');
const {internalError, logSuccess, logError, logReturn, logOrderError, logOrderProdSuccess} = require('../services/logger');
const dateFormat = require('dateformat');

const MiscController = require('../controllers/MiscController');

//Controller untuk insert ke database klink_mlm2010 hanya untuk transaksi yang sukses saja
"use strict";
const Klink_mlm2010_InsertController = () => {
	

	async function getOrderData(arrdata){

     	var detTransData = [];

		try {
			let getDataTransProd = "SELECT * " +
								"FROM V_HILAL_GETORDER_TO_KLINK_MLM2010 A " +
								"WHERE A.orderno IN '" + arrdata + "' " +
								"ORDER BY A.seqno, CONVERT(VARCHAR(20), A.datetrans, 120) ASC, A.orderno;"           
            let dataTrans = await sequelize.query(getDataTransProd);
           
            if (!dataTrans) {
              	let msg = 'Record not founded.'
               	return logOrderError(req, res, 400, msg);
            }else{
              for (var x = 0; x < dataTrans[0].length; x++) {
                detTransData.push({ 
                                id_memb : dataprd[0][x].id_memb,
								usr_login : dataprd[0][x].usr_login,
								nmmember : dataprd[0][x].nmmember,
								total_bv : dataprd[0][x].total_bv,
								pricecode : dataprd[0][x].pricecode,
								bonusmonth : dataprd[0][x].bonusmonth,
								datetrans : dataprd[0][x].datetrans,
								nmstkk : dataprd[0][x].nmstkk,
								status : dataprd[0][x].status,
								flag_trx : dataprd[0][x].flag_trx,
								cnstatus : dataprd[0][x].cnstatus,
								kwstatus : dataprd[0][x].kwstatus,
								ipstatus : dataprd[0][x].ipstatus,
								datekw : dataprd[0][x].datekw,
								datecn : dataprd[0][x].datecn,
								dateip : dataprd[0][x].dateip,
								usrkw : dataprd[0][x].usrkw,
								eod_status : dataprd[0][x].eod_status,
								is_ecommerce : dataprd[0][x].is_ecommerce,
								status_vt_pay : dataprd[0][x].status_vt_pay,
								orderno : dataprd[0][x].orderno,
								is_umroh : dataprd[0][x].is_umroh,
								secno : dataprd[0][x].secno,
								seqno : dataprd[0][x].seqno,
								token : dataprd[0][x].token,
								pref_trans_type1 : dataprd[0][x].pref_trans_type1,
								pref_trans_type2 : dataprd[0][x].pref_trans_type2,
								pref_trans_type3 : dataprd[0][x].pref_trans_type3,
								bank_code_payment_y : dataprd[0][x].bank_code_payment_y,
								is_login : dataprd[0][x].is_login,
								total_pay : dataprd[0][x].total_pay,
								totpaydp : dataprd[0][x].totpaydp,
								totpaycp : dataprd[0][x].totpaycp,
								profit_member : dataprd[0][x].profit_member,
								profit_member_new : dataprd[0][x].profit_member_new,
								payadm : dataprd[0][x].payadm,
								id_lp : dataprd[0][x].id_lp,
								bankaccno : dataprd[0][x].bankaccno,
								cnno : dataprd[0][x].cnno,
								flag_generated : dataprd[0][x].flag_generated,
								ssrno_ori : dataprd[0][x].ssrno_ori,
								registerno_ori : dataprd[0][x].registerno_ori,
								cnno_ori : dataprd[0][x].cnno_ori,
								kwno_ori : dataprd[0][x].kwno_ori,
								ipno_ori : dataprd[0][x].ipno_ori,
								prefix_ssr : dataprd[0][x].prefix_ssr,
								prefix_cn : dataprd[0][x].prefix_cn,
								prefix_kw : dataprd[0][x].prefix_kw,
								prefix_reg : dataprd[0][x].prefix_reg,
								ordtype : dataprd[0][x].ordtype,
								ttptype : dataprd[0][x].ttptype,
								dt : dataprd[0][x].dt,
								stk3 : dataprd[0][x].stk3,
								stk : dataprd[0][x].stk,
								idstk : dataprd[0][x].idstk,
								sentto : dataprd[0][x].sentto,
								ysc_type : dataprd[0][x].ysc_type,
								tglbn : dataprd[0][x].tglbn,
								yy : dataprd[0][x].yy,
								mm : dataprd[0][x].mm,
								dd : dataprd[0][x].dd,
								p_prefix_y : dataprd[0][x].p_prefix_y,
								category_y : dataprd[0][x].category_y,
								p_etdt_y : dataprd[0][x].p_etdt_y,
								is_cod : dataprd[0][x].is_cod,
								print_count : dataprd[0][x].print_count,
								print_date : dataprd[0][x].print_date,
								yprex_rpt : dataprd[0][x].yprex_rpt,
								nom_cash : dataprd[0][x].nom_cash,
								is_cvoucher : dataprd[0][x].is_cvoucher,
								nom_cvoucher : dataprd[0][x].nom_cvoucher,
								is_pvoucher : dataprd[0][x].is_pvoucher,
								nom_pvoucher : dataprd[0][x].nom_pvoucher,
								tot_nom_ip_cash : dataprd[0][x].tot_nom_ip_cash,
								tot_nom_ip_cashvcr : dataprd[0][x].tot_nom_ip_cashvcr,
								tot_nom_ip_prodvcr : dataprd[0][x].tot_nom_ip_prodvcr,
								tot_nom_payadm : dataprd[0][x].tot_nom_payadm,
								tot_nom_profit_member_new : dataprd[0][x].tot_nom_profit_member_new,
								total_all_pay_sum : dataprd[0][x].total_all_pay_sum,
								tot_nom_bv_sum : dataprd[0][x].tot_nom_bv_sum,
								kode_unik : dataprd[0][x].kode_unik,
								total_all_pay : dataprd[0][x].total_all_pay,
								total_payment : dataprd[0][x].total_payment,
								no_urut : dataprd[0][x].no_urut,
                              });
              }
            }
          } catch (err) {
          // return internalError(req, res,err )
              let msg = err
               return logOrderError(req, res, 409, msg);
          }

	};

	}

	// Insert ke bbhdr
	async function Klink_mlm2010_InsertBbhdr(//flag_update_ip_money, flag_update_ip_vcash, flag_update_ip_vprod, 
											 tot_ip_cash, 
											 tot_ip_vcash, 
											 tot_ip_vproduct, 
											 ipno, 
											 tot_ip, 
											 ip_type, 
											 ip_trtype, 
											 ip_status, 
											 ip_custtype,
											 sc_code, 
											 bankacccd, 
											 remarks1, 
											 remarks2, 
											 description){

	/*
	IF (@flag_update_ip_money = 1 OR @flag_update_ip_vcash = 1 OR @flag_update_ip_vprod = 1)
	--	OR @flag_update_kw = 1 OR @flag_update_reg = 1 OR @flag_update_cn = 1)
		AND (@seqno IS NULL OR @seqno = 1) -- Jika hanya transaksi pertama (Group Trans) atau Transaksi Single (biasanya seqno NULL)
	--	IF(@seqno IS NULL OR @seqno = 1) -- Jika hanya transaksi pertama (Group Trans) atau Transaksi Single (biasanya seqno NULL)
			BEGIN 	
				
				SELECT 	@sqlInsert_money = '', @sqlInsert_vcash = '', @sqlInsert_vprod = '',  
						@sqlInsert_exec = 	'INSERT INTO klink_mlm2010.dbo.bbhdr([type], dfno, trtype, trcd, [status], custtype, amount, ' +
											' createnm, bankacccd, refno, [description]) VALUES ',
						@ip_type = 'I', @ip_trtype = 'IP', @ip_status = 'O', @ip_custtype = 'S',
						@comma = ', ';
				
				PRINT 'klink_mlm2010.dbo.bbhdr @sqlInsert_exec : ' + @sqlInsert_exec;
				
				IF @flag_update_ip_money = 1 OR @flag_update_ip_money = 0 -- Cash
					BEGIN 
						SET @sqlInsert_money = '(''' + @ip_type + ''', ''' + @stk + ''', ''' + @ip_trtype + ''', ''' + @IPNO_Money + ''', ''' + @ip_status + ''', ''' + @ip_custtype + ''', ''' + CAST(@tot_nom_ip_cash AS VARCHAR(20)) + 
												''', ''ECOMMERCE'', ''BL01'', ''' + @bankaccno + ''', ''PEMBAYARAN ONLINE (ECOMMERCE) DARI ' + CAST(@bank_code_payment_Y AS VARCHAR(20)) + ''')';
					END
				IF @flag_update_ip_vcash = 1 -- Voucer Cash
					BEGIN
						SET @sqlInsert_vcash = '(''' + @ip_type + ''', ''' + @stk + ''', ''' + @ip_trtype + ''', ''' + @IPNO_VCash + ''', ''' + @ip_status + ''', ''' + @ip_custtype + ''', ''' + CAST(@tot_nom_ip_cashvcr AS VARCHAR(20)) + 
												''', ''ECOMMERCE'', ''BL01'', ''' + @bankaccno + ''', ''PEMBAYARAN ONLINE (ECOMMERCE) DARI ' + CAST(@bank_code_payment_Y AS VARCHAR(20)) + ''')';
					END
				IF @flag_update_ip_vprod = 1 -- Voucher Product
					BEGIN
						SET @sqlInsert_vprod = '(''' + @ip_type + ''', ''' + @stk + ''', ''' + @ip_trtype + ''', ''' + @IPNO_VProd + ''', ''' + @ip_status + ''', ''' + @ip_custtype + ''', ''' + CAST(@tot_nom_ip_prodvcr AS VARCHAR(20)) + 
												''', ''ECOMMERCE'', ''BL01'', ''' + @bankaccno + ''', ''PEMBAYARAN ONLINE (ECOMMERCE) DARI ' + CAST(@bank_code_payment_Y AS VARCHAR(20)) + ''')';
					END
				
				SET @sqlInsert_exec = @sqlInsert_exec + @sqlInsert_money + @sqlInsert_vcash + @sqlInsert_vprod;
				EXEC (@sqlInsert_exec);
				PRINT 'SELESAI INSERT INTO klink_mlm2010.dbo.bbhdr';
			END
	*/


		// Get Data dari table ecomm_trans_hdr untuk memasukkan data ke table lainnya
	//END insert into table prodction from _sgo


	return {
	};
};

module.exports = Klink_mlm2010_InsertController;
