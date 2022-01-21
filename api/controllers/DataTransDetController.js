const Sequelize = require('sequelize');
// const sequelize = require('../../config/db/klink_mlm2010');
const sequelize = require('../../config/db/database');

const redis = require('redis');
const client = redis.createClient();

const DataTransDetController = () => {
  
  const dataTransDet = async (req, res) => {
   const { datefrom, dateto } = req.body;
   var trans_data = [];
   var trans_data_prd = [];

    if (datefrom && dateto) {
 
      try {
       
        let q_trans_hdr = await sequelize.query("SELECT TOP 10 a.* FROM V_ECOM_LIST_PICKUP_READY_HDR_NONCOD a " +
                                            " WHERE a.orderno in ('E1907003911','E1907008909','E1907004559')"); // --a.datetrans between '"+datefrom+"' AND '"+dateto+"'"

         console.log("test = " + q_trans_hdr[0].length);
         // console.log(q_product[0]);
         for (let i = 0; i < q_trans_hdr[0].length; i++) {


            console.log("Hasil = " + i)
            console.log(q_trans_hdr[0][i])
            trans_data.push({
                orderno  : q_trans_hdr[0][i].orderno, 
                conoteJNE  : q_trans_hdr[0][i].conoteJNE, 
                id_memb  : q_trans_hdr[0][i].id_memb, 
                nmmember  : q_trans_hdr[0][i].nmmember, 
                log_usrlogin  : q_trans_hdr[0][i].log_usrlogin, 
                log_fullnm  : q_trans_hdr[0][i].log_fullnm, 
                log_tel_hp  : q_trans_hdr[0][i].log_tel_hp, 
                datetrans  : q_trans_hdr[0][i].datetrans, 
                datetrans2  : q_trans_hdr[0][i].datetrans2, 
                sentTo  : q_trans_hdr[0][i].sentTo, 
                is_pickup  : q_trans_hdr[0][i].is_pickup, 
                pickup_date  : q_trans_hdr[0][i].pickup_date, 
                PROPINSI  : q_trans_hdr[0][i].PROPINSI, 
                kode_kabupaten  : q_trans_hdr[0][i].kode_kabupaten, 
                kota_nama_kgp  : q_trans_hdr[0][i].kota_nama_kgp, 
                Kecamatan  : q_trans_hdr[0][i].Kecamatan, 
                kelurahan  : q_trans_hdr[0][i].kelurahan, 
                post_code  : q_trans_hdr[0][i].post_code, 
                addr  : q_trans_hdr[0][i].addr, 
                contactno  : q_trans_hdr[0][i].contactno, 
                whcd  : q_trans_hdr[0][i].whcd, 
                wh_name  : q_trans_hdr[0][i].wh_name, 
                whcd_addr1  : q_trans_hdr[0][i].whcd_addr1, 
                whcd_addr2  : q_trans_hdr[0][i].whcd_addr2, 
                whcd_addr3  : q_trans_hdr[0][i].whcd_addr3, 
                print_count  : q_trans_hdr[0][i].print_count, 
                receiver_name  : q_trans_hdr[0][i].receiver_name, 
                conote_new  : q_trans_hdr[0][i].conote_new, 
                cargo_id  : q_trans_hdr[0][i].cargo_id, 
                shipper_code  : q_trans_hdr[0][i].shipper_code, 
                shipper_name  : q_trans_hdr[0][i].shipper_name, 
                service_type_name  : q_trans_hdr[0][i].service_type_name, 
                logo_url  : q_trans_hdr[0][i].logo_url, 
                total_weight  : q_trans_hdr[0][i].total_weight, 
                total_item  : q_trans_hdr[0][i].total_item, 
                payShip  : q_trans_hdr[0][i].payShip, 
                payAdm  : q_trans_hdr[0][i].payAdm, 
                total_pay  : q_trans_hdr[0][i].total_pay, 
                totPayDP  : q_trans_hdr[0][i].totPayDP, 
                totPayCP  : q_trans_hdr[0][i].totPayCP, 
                is_cod  : q_trans_hdr[0][i].is_cod, 
                price_type  : q_trans_hdr[0][i].price_type, 
                pay_insurrance  : q_trans_hdr[0][i].pay_insurrance, 
                is_free_sip_from_member  : q_trans_hdr[0][i].is_free_sip_from_member, 
                bonusmonth  : q_trans_hdr[0][i].bonusmonth, 
                status  : q_trans_hdr[0][i].status, 
                confirmstatus  : q_trans_hdr[0][i].confirmstatus, 
                confirmeddate  : q_trans_hdr[0][i].confirmeddate, 
                confirmedby  : q_trans_hdr[0][i].confirmedby, 
                remarks  : q_trans_hdr[0][i].remarks, 
                testing : {"a" : "ax",
                           "a" : "ax"}

            });


            let q_trans_det = await sequelize.query("SELECT a.* FROM V_ECOM_LIST_PICKUP_READY_DET_BDL a where a.orderno = '"+ q_trans_hdr[0][i].orderno +"'");
            console.log("q_trans_det = " + q_trans_det[0].length);
            for (let j = 0; j < q_trans_det[0].length; j++) {
              trans_data_prd.push({orderno  : q_trans_det[0][j].orderno, 
                              prdcd  : q_trans_det[0][j].prdcd, 
                              prdnm  : q_trans_det[0][j].prdnm, 
                              qty  : q_trans_det[0][j].qty, 
                              dpr  : q_trans_det[0][j].dpr, 
                              bvr  : q_trans_det[0][j].bvr, 
                            });
            }
         }
         // let trans_header = Object.assign(trans_data, trans_data_prd);

         return res.status(200).json({status:'success', trans_data});     

      } catch (err) {
        console.log(err);
        return res.status(500).json({ status:'failed', message: 'Internal server error' });
      }
    }
        return res.status(400).json({ status: 'failed', message: 'Request parameter was invalid or missing, please refer to K-LINK Api documentation' });
  };

  return {
    dataTransDet,
  };

};
module.exports = DataTransDetController;