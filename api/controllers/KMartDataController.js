const sequelize = require('../../config/db/ecomm_production.js');
const { internalError, logSuccess, logError } = require("../services/logger");

const KMartDataController = () => {

  const getKMartDataController = async (req, res) => {
   const { dateFrom, dateTo } = req.body;
    console.log('mulai');
    if (dateFrom && dateTo) {
      let result, resTransDetailPerDate, resSummByDate, 
          resCustomersByArea, resCustomerSalesByArea, resTransDetailPerDateCust, 
          resTransByProductPerDate, resTransByProductSumm, err = 0;
      
      /// 001 sales with dfno by dat --TransDetailPerDate
      try {
        let sql1 = "SELECT convert(varchar(10), a.datetrans, 120) as datetrans, a.bonusmonth, A.orderno, a.token, a.id_memb, a.nmmember , a.totPayDP, a.total_bv " +
                  "FROM db_ecommerce.dbo.ecomm_trans_hdr a " +
                  "WHERE a.token like 'INV%' AND (convert(varchar(10), a.datetrans, 120) BETWEEN '" + dateFrom + "' AND '" + dateTo + "') " +
                  "ORDER BY a.datetrans";
        let TransDetailPerDate = await sequelize.query(sql1);
        // console.log(TransDetailPerDate);
        if (!TransDetailPerDate) {
          err += 1; //return logError(req, res, 400, "Record not founded.");
        } else {
          //return res.status(200).json(dataTransDetailPerDate[0]);
          resTransDetailPerDate = TransDetailPerDate[0];
        }

        // 002 sales summ by date --SummByDate
        let sql2 = "SELECT convert(varchar(10), a.datetrans, 120) as datetrans, count(A.orderno) as tot_rec, sum(a.totPayDP) as totDP, sum(a.total_bv) as totBV " +
                  "FROM ecomm_trans_hdr a " +
                  "where a.token like 'INV%' AND (convert(varchar(10), a.datetrans, 120) BETWEEN '" + dateFrom + "' AND '" + dateTo + "') " +
                  "group by convert(varchar(10), a.datetrans, 120) " +
                  "order by convert(varchar(10), a.datetrans, 120)";

        let SummByDate = await sequelize.query(sql2);
        
        if (!SummByDate) {
          err += 1; //return logError(req, res, 400, "Record not founded.");
        } else {
          //return res.status(200).json(SummByDate[0]);
          resSummByDate = SummByDate[0];
        }

        // 003 area by transactions --CustomersByArea
        let sql3 = "SELECT b.province_name, b.kabupaten_name, count(A.orderno) as tot_rec " +
                    "FROM ecomm_trans_hdr a " +
                    "   inner join ecomm_trans_shipaddr_sgo b on a.token =b.orderno  " +
                    "where a.token like 'INV%' AND A.id_lp = 'CUST' AND A.sentTo = '2' AND (convert(varchar(10), a.datetrans, 120) BETWEEN '" + dateFrom + "' AND '" + dateTo + "') " +
                    "group by b.province_name, b.kabupaten_name " +
                    "order by b.province_name, b.kabupaten_name";

        let CustomersByArea = await sequelize.query(sql3);
        
        if (!CustomersByArea) {
          err += 1; //return logError(req, res, 400, "Record not founded.");
        } else {
          //return res.status(200).json(CustomersByArea[0]);
          resCustomersByArea = CustomersByArea[0];
        }

        // 004 sales area by transactions --CustomerSalesByArea
        let sql4 = "SELECT b.province_name, count(A.orderno) as tot_rec, sum(a.totPayDP) as totDP, sum(a.totPayCP ) as totCP, sum(a.total_bv) as totBV " +
                    "FROM ecomm_trans_hdr a " +
                    "   inner join ecomm_trans_shipaddr_sgo b on a.token =b.orderno  " +
                    "where a.token like 'INV%' AND A.id_lp = 'CUST' AND A.sentTo = '2' AND (convert(varchar(10), a.datetrans, 120) BETWEEN '" + dateFrom + "' AND '" + dateTo + "') " +
                    "group by b.province_name " +
                    "order by b.province_name";

        let CustomerSalesByArea = await sequelize.query(sql4);
        
        if (!CustomerSalesByArea) {
          err += 1; //return logError(req, res, 400, "Record not founded.");
        } else {
          //return res.status(200).json(CustomersByArea[0]);
          resCustomerSalesByArea = CustomerSalesByArea[0];
        }


        // 005 sales with dfno by date  ONLY FOR CUSTOMERS --TransDetailPerDateCust
        let sql5 = "select convert(varchar(10), a.datetrans, 120) as datetrans, a.bonusmonth, A.orderno, a.token, a.id_memb, a.nmmember , a.totPaycp, a.totPayDP, a.total_bv " +
                    "from ecomm_trans_hdr a " +
                    "where a.token like 'INV%' AND A.id_lp = 'CUST' AND A.sentTo = '2' AND (convert(varchar(10), a.datetrans, 120) BETWEEN '" + dateFrom + "' AND '" + dateTo + "') " +
                    " order by a.datetrans";

        let TransDetailPerDateCust = await sequelize.query(sql5);
        
        if (!TransDetailPerDateCust) {
          err += 1; //return logError(req, res, 400, "Record not founded.");
        } else {
          //return res.status(200).json(TransDetailPerDateCust[0]);
          resTransDetailPerDateCust = TransDetailPerDateCust[0];
        }


        // 006 sales detail product summ by date (1) --TransByProductPerDate
        let sql6 = "select convert(varchar(10), a.datetrans, 120) as datetrans, a.bonusmonth, " +
                   "      b.prdcd, b.prdnm, d.cat_desc , " +
                   "      sum(b.qty) as qty, b.dpr, b.cpr, b.bvr, b.dpr * sum(b.qty) as total_dp, b.cpr * sum(b.qty) as total_cp, b.bvr * sum(b.qty) as total_bv " +
                   " from ecomm_trans_hdr a " +
                   "    left outer join ecomm_trans_det_prd b on a.orderno = b.orderno  " +
                   "    left outer join master_prd_cat_inv c on b.prdcd = c.cat_inv_id  " +
                   "    left outer join master_prd_cat d on c.cat_id = d.cat_id  " +
                   " where a.token like 'INV%' AND A.id_lp = 'CUST'  AND (convert(varchar(10), a.datetrans, 120) BETWEEN '" + dateFrom + "' AND '" + dateTo + "') " +
                   "group by convert(varchar(10), a.datetrans, 120), a.bonusmonth, b.prdcd, b.prdnm, d.cat_desc, b.dpr, b.cpr, b.bvr, b.dpr " +
                   "order by convert(varchar(10), a.datetrans, 120)";

        let TransByProductPerDate = await sequelize.query(sql6);
        
        if (!TransByProductPerDate) {
          err += 1; //return logError(req, res, 400, "Record not founded.");
        } else {
          //return res.status(200).json(TransByProductPerDate[0]);
          resTransByProductPerDate = TransByProductPerDate[0];
        }


        // 007 sales detail product summ by date & cat produtc (2) --TransByProductSumm
        let sql7 = "select b.prdcd, b.prdnm, c.cat_id, d.cat_id, d.cat_desc ,  " +
                   "     sum(b.qty) as qty, b.dpr, b.cpr, b.bvr, b.dpr * sum(b.qty) as total_dp, b.cpr * sum(b.qty) as total_cp, b.bvr * sum(b.qty) as total_bv " +
                   " from ecomm_trans_hdr a " +
                   "    left outer join ecomm_trans_det_prd b on a.orderno = b.orderno  " +
                   "    left outer join master_prd_cat_inv c on b.prdcd = c.cat_inv_id  " +
                   "    left outer join master_prd_cat d on c.cat_id = d.cat_id  " +
                   " where a.token like 'INV%' AND A.id_lp = 'CUST'  AND (convert(varchar(10), a.datetrans, 120) BETWEEN '" + dateFrom + "' AND '" + dateTo + "') " +
                   " group by b.prdcd, b.prdnm, c.cat_id, d.cat_id, d.cat_desc, b.dpr, b.cpr, b.bvr, b.dpr " +
                   " order by b.prdcd, b.prdnm, c.cat_id, d.cat_id, d.cat_desc";

        let TransByProductSumm = await sequelize.query(sql7);
        
        if (!TransByProductSumm) {
          err += 1; //return logError(req, res, 400, "Record not founded.");
        } else {
          //return res.status(200).json(TransByProductSumm[0]);
          resTransByProductSumm = TransByProductSumm[0];
        }


        if(err > 0){
          return logError(req, res, 400, "Record not founded.")
        }else{
          return res.status(200).json({status: 'success', 
                                       resTransDetailPerDate : resTransDetailPerDate, 
                                       resSummByDate : resSummByDate, 
                                       resCustomersByArea : resCustomersByArea, 
                                       resCustomerSalesByArea : resCustomerSalesByArea,
                                       resTransDetailPerDateCust : resTransDetailPerDateCust, 
                                       resTransByProductPerDate : resTransByProductPerDate, 
                                       resTransByProductSumm : resTransByProductSumm});  
        }

      } catch (err) {
        return internalError(req, res, err);
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };


  return {
    getKMartDataController,
  };
};

module.exports = KMartDataController;
