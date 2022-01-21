// module untuk transaksi
const sequelize = require('../../../config/db/database')
const mlm2010_bbhdr = require('../../models/Klink_mlm2010_bbhdr');
const mlm2010_billivdetp = require('../../models/Klink_mlm2010_billivdetp');

// define attribut untuk field yg di butuhkan 
let fieldsBBHDR = ['trcd', 'type', 'trtype', 'bankacccd',
        'bankacccd2', 'refno', 'description', 'amount', 'etdt',
        'trdt', 'status', 'dfno', 'createnm', 'createdt', 'updatenm',
        'updatedt', 'eefect', 'source_ip', 'bankname', 'bankaccno',
        'bankaccnm', 'bankcity', 'bankbranch', 'bankcountry',
        'bankid', 'custtype', 'descriiption2', 'description3',
        'post_chasier', 'postdt_chasier', 'post_finance',
        'postdt_finance', 'post_acct', 'postdt_acct'
    ]
let fieldsBILLIVDETP = ['trcd', 'seqno', 'paytype', 'docno',
        'payamt', 'deposit', 'notes', 'OLtrcd'
    ]

const mlmFirstController = () => {
    // insert data mlm2010_bbhdr
    // insert data mlm2010_billivdetp
    // insert data mlm2010_billivhdr

    const index = async(req, res) => {
        let trans = await sequelize.transaction();
        try {
            const {body} = req
            
            // contoh insert bulk
            await mlm2010_bbhdr.bulkCreate(body, {
                fields:fieldsBBHDR
            }, {transaction:trans})

            await mlm2010_billivdetp.bulkCreate(body, {
                fields:fieldsBILLIVDETP
            }, {transaction:trans})

            // commit trans
            await trans.commit()    
            return res.json({
                data:body
            })
        } catch (error) {
            // rollback transaction data
            await trans.rollback();
            // console.log(error);
            return res.statu(502).json({
                status:false,
                msg: error.message
            })
        }
    }

    return {
        index
    }

}

module.exports = mlmFirstController