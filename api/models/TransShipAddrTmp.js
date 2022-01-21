const Sequelize = require('sequelize');
const sequelize = require('../../config/db/database');


const table_transshipaddrtmp = 'transshipaddrtmp';

const TransShipAddrTmp = sequelize.define('ecomm_trans_shipaddr_sgo', {

      orderno : {
          type: Sequelize.STRING, primaryKey: true, allowNull: false,
        },
      idstk : {
          type: Sequelize.STRING, 
        },
      prov_code : {
          type: Sequelize.STRING, 
        },
      kab_code : {
          type: Sequelize.STRING, 
        },
      kec_code : {
          type: Sequelize.STRING, 
        },
      kel_code : {
          type: Sequelize.STRING, 
        },
      post_code : {
          type: Sequelize.STRING, 
        },
      addr1 : {
          type: Sequelize.STRING, 
        },
      addr2 : {
          type: Sequelize.STRING, 
        },
      addr3 : {
          type: Sequelize.STRING, 
        },
      email : {
          type: Sequelize.STRING, 
        },
      tel_hp1 : {
          type: Sequelize.STRING, 
        },
      tel_hp2 : {
          type: Sequelize.STRING, 
        },
      conoteJNE : {
          type: Sequelize.STRING, 
        },
      service_type_id : {
          type: Sequelize.STRING, 
        },
      service_type_name : {
          type: Sequelize.STRING, 
        },
      flag_send_conote : {
          type: Sequelize.STRING, 
        },
      total_item : {
          type: Sequelize.STRING, 
        },
      total_weight : {
          type: Sequelize.STRING, 
        },
      total_pay_net : {
          type: Sequelize.STRING, 
        },
      receiver_name : {
          type: Sequelize.STRING, 
        },
      stockist_name : {
          type: Sequelize.STRING, 
        },
      kabupaten_name : {
          type: Sequelize.STRING, 
        },
      province_name : {
          type: Sequelize.STRING, 
        },
      sender_address : {
          type: Sequelize.STRING, 
        },
      dest_address : {
          type: Sequelize.STRING, 
        },
      jne_branch : {
          type: Sequelize.STRING, 
        },
      shipper_telhp : {
          type: Sequelize.STRING, 
        },
      cargo_id : {
          type: Sequelize.STRING, 
        },
      lat_dest : {
          type: Sequelize.STRING, 
        },
      long_dest : {
          type: Sequelize.STRING, 
        },
      whcd : {
          type: Sequelize.STRING, 
        },
      whnm : {
          type: Sequelize.STRING, 
        },
      id_address : {
          type: Sequelize.STRING, 
        },
      total_pay_net : {
          type: Sequelize.STRING, 
        },
      stockist_name : {
          type: Sequelize.STRING, 
        },
      kabupaten_name : {
          type: Sequelize.STRING, 
        },
      province_name : {
          type: Sequelize.STRING, 
        },
      sender_address : {
          type: Sequelize.STRING, 
        },
      dest_address : {
          type: Sequelize.STRING, 
        },
      jne_branch : {
          type: Sequelize.STRING, 
        },
      shipper_telhp : {
          type: Sequelize.STRING, 
        },

}, {freezeTableName: true, timestamps: false, table_transshipaddrtmp });


module.exports = TransShipAddrTmp;