const schema_model = require('../../api/policies/schema_model');
const cache = require('../../api/services/RedisMiddleware')
const schema_transactions = require('../../api/policies/schema_transactions'),
      schemas = require('../../api/policies/schemas'),
      schema_products = require('../../api/policies/schema_products'); // schema input;
const validation = require('../../api/policies/validation'); // function validator

const publicRoutes = {
  'POST /user': 'UserController.register',
  'POST /register': 'UserController.register', // alias for POST /user

  //member temporary
  'POST /member-tmp': 'MemberTmpController.addMember',
  'GET /member-tmp': 'MemberTmpController.getMembers',
  'PUT /member-tmp': 'MemberTmpController.updateMember',

  // member sukses
  'POST /member': 'MemberSuksesController.addMember',
  'GET /member': 'MemberSuksesController.getMembers',
  'PUT /member': 'MemberSuksesController.updateMember',
  'POST /checkMember': 'MemberSuksesController.checkMembers',

  // login & get member
  'POST /login' : 'LoginController.login',
  'POST /loginDigitalBrainNew' : 'LoginController.loginDigitalBrainNew',
  'POST /loginAkademiInspiradzi' : 'LoginController.loginAkademiInspiradzi',
  'POST /loginAsuransi' : 'LoginController.loginAsuransi',
  'POST /checkjaringan' : 'LoginController.checkJaringan',
  'POST /test' : 'LoginController.test',
  // login & get member
  'POST /getMember' : 'LoginController.getUser',
  

  //Product Master CRUD
  'POST /productMasterAdd' :  {
        path: 'ProductMasterController.productMasterAdd',
        middlewares: [validation(schema_products.product_add)]
    },
    
  'POST /productMasterEdit' :  {
        path: 'ProductMasterController.productMasterEdit',
        middlewares: [validation(schema_products.product_add)]
    },


  //transaction header temporary
  'POST /header-tmp': 'TransHeaderTmpController.addHeaderTmp',
  'GET /header-tmp': 'TransHeaderTmpController.getHeaderTmp',

   //transaction header Sukses
  'POST /header': 'TransHeaderSuksesController.addHeaderSukses',
  'GET /header': 'TransHeaderSuksesController.getHeaderSukses',

  //transaction PayDate temporary
  'POST /paydate-tmp': 'TransPayDateTmpController.addTransPayDateTmp',
  'GET /paydate-tmp': 'TransPayDateTmpController.getTransPayDateTmp',

   //transaction PayDate Sukses
  'POST /paydate': 'TransPayDateSuksesController.addTransPayDateSukses',
  'GET /paydate': 'TransPayDateSuksesController.getTransPayDateSukses',

  //transaction Ship Address Temporary
  'POST /shipaddr-tmp': 'TransShipAddrTmpController.addTransShipAddrTmp',
  'GET /shipaddr-tmp': 'TransShipAddrTmpController.getTransShipAddrTmp',

  //transaction Ship Address Temporary
  'POST /shipaddr': 'TransShipAddrSuksesController.addTransShipAddrSukses',
  'GET /shipaddr': 'TransShipAddrSuksesController.getTransShipAddrSukses',

  //transaction Det Product Temporary
  'POST /detprod-tmp': 'TransDetPrdTmpController.addTransDetPrdTmp',
  'GET /detprod-tmp': 'TransDetPrdTmpController.getTransDetPrdTmp',

  //transaction Det Product Sukses
  'POST /detprod': 'TransDetPrdSuksesController.addTransDetPrdSukses',
  'GET /detprod': 'TransDetPrdSuksesController.getTransDetPrdSukses',

  //SMS Notification
  // 'POST /sendsms': 'SmsGatewayAddController.sendSMS',
  'POST /sendAwsEmail': 'EmailAwsController.sendAwsEmail',
  'POST /sendSMS': 'NotificationController.sendSMS',
  'POST /sendEmail': 'NotificationController.sendEmail',
  'POST /testAdd': 'NotificationController.testAdd',
  'POST /sendBirthday': 'NotificationController.sendEmailBirthday',
  'POST /sendNeverOrder': 'NotificationController.sendEmailNeverOrder',
  'POST /sendYearNeverOrder': 'NotificationController.sendEmail1YearEmailNeverOrder',
  

  //Aws Email
  'POST /Email': 'EmailAwsController.sendEmail',
  //Aws Email
  'POST /addEmail': 'EmailAwsController.addEmail',
 
  //SMS K-Wallet
  // 'POST /getwalletbal': 'KWalletController.kwallet',
  'POST /getSaldo': 'KWalletController.getSaldo',
  'POST /kWalletSaldoUpd': 'KWalletController.kWalletSaldoUpd',

  //Personal Query
   'POST /getPersonalBV': {
          path: 'PersonalQueryBVController.getPersonalBV',
          middlewares: [cache.pbv],
          },
   // 'POST /getPersonalGBV': {
   //        path: 'PersonalQueryBVController.getPersonalGBV',
   //        middlewares: [cache.gbv],
   //        }, 
   'POST /getPersonalGBV': 'PersonalQueryController.getPersonalGBV2',

  //Insert Trans Temp (Before Payment Success)
  'POST /insertTransactionTmp': 'InsertTransTempController.insertTransTmp',
  'POST /insertTransactionTmpLP': 'InsertTransTempController.insertTransTmpLP',
  'POST /checkTransTmpByOrder': 'InsertTransTempController.checkTransTmpByOrder',
  'POST /insertTransProdFromTemp': 'InsertTransProdController.insertTransProdFromTemp',
  // 'POST /insertTransProdFromTemp2': 'InsertTransProdController.insertTransProdFromTemp2',
  'POST /updateTransactionTmp': 'InsertTransTempController.updateTransTmp',
  'POST /delTransactionTmp': 'InsertTransTempController.deleteTransTmp',

//   // insert InsertTransProdController v2 BY cangkir 13
  'POST /insertTransProdFromTempV2': 'InsertTransProdV2.insertNEwTemp',

  //Insert Trans Temp (Before Payment Success) NEW when MARS starter
  'POST /insertTransactionTmpNew': 'InsertTransTempControllerNew.insertTransTmp',
  'POST /insertTransactionTmpLPNew' : {
         path: "InsertTransTempControllerNew.insertTransTmpLP",
         middlewares: [validation(schema_transactions.schema_trans_temp)]
       },
//   'POST /insertTransProdFromTemp': 'InsertTransProdController.insertTransProdFromTemp',
  'POST /updateTransactionTmpNew': 'InsertTransTempControllerNew.updateTransTmp',
  'POST /delTransactionTmpNew': 'InsertTransTempControllerNew.deleteTransTmp',


  // //Insert Trans Production (After Payment Success)
   'POST /insertTransactionSukses': 'InsertTransProdController.insertTransProd',
  // 'POST /updateTransactionProd': 'InsertTransProdController.updateTransProd',
  // 'POST /delTransactionProd': 'InsertTransProdController.deleteTransProd',

  //Personal Bonus
  'POST /getPersonalListBonus': 'PersonalQueryBonusController.getPersonalListBonus',
  'POST /getPersonalDetailBonus': 'PersonalQueryBonusController.getPersonalDetailBonus',

   //Check Voucher
   'POST /getVoucherCheck': 'VoucherMLMCheckController.getVoucherCheck',
   'POST /getVoucherList': 'VoucherMLMCheckController.getVoucherList',
   'POST /updateByVoucherNo': 'VoucherMLMCheckController.updateByVoucherNo', 

   //Check Voucher New
   'POST /getVoucherCheckNew': 'VoucherMLMCheckControllerNew.getVoucherCheckNew',
   'POST /getVoucherListNew': 'VoucherMLMCheckControllerNew.getVoucherListNew',
   'POST /updateByVoucherNoNew': 'VoucherMLMCheckControllerNew.updateByVoucherNoNew',
   
   //List Bank
   'POST /getBankList': 'BankListController.bankList',

   //List Sotkcist
   'POST /stockistListByDistance': 'StockistListController.stockistListByDistance',
   
   //List Courier
   'POST /getTransHeaderByPeriod': 'PersonalTransController.transHeaderByPeriod',
   
   //List Transaction
   'POST /getCourier': 'CourierListController.courierListController',
   

   'POST /insertTransactionTestTmp': 'InsertTransTestTmp.insert',

   'POST /googleMapGetDistance': 'GoogleMapController.getDistance',
   'POST /googleMapGetGeoCode': 'GoogleMapController.getGeoCode',


   'POST /getBonusPeriod': 'MiscController.getBonusPeriod',
   'POST /getBonusPeriodNew': 'MiscController.getBonusPeriodNew',
  'POST /updateStockistWh' : 'MiscController.updateStockistWh', 

   'POST /dataTransDet': 'DataTransDetController.dataTransDet',

  // Product K-Mart
  'PUT /productList': 'ProductController.updateProductListKmart',
  'POST /productList': 'ProductController.createProductListKmart',
  'DELETE /productList': 'ProductController.destroyProductListKmart',

  //Shipping Cost Checking
   'POST /checkPayShip': 'ShippingcController.checkPayShip',  

  //Gift Voucher Create, Update & Check
   'POST /VoucherGiftCheck': 'VoucherGiftController.VoucherGiftCheck', 
   'POST /VoucherGiftCreator': 'VoucherGiftController.VoucherGiftCreator', 
   'POST /VoucherGiftUpadeStatus': 'VoucherGiftController.VoucherGiftUpadeStatus', 

  //Gift Voucher Create, Update & Check
   'POST /VoucherGiftCreator': 'VoucherGiftController.VoucherGiftCreator', 
   'POST /VoucherGiftUpadeStatus': 'VoucherGiftController.VoucherGiftUpadeStatus',  

   //COD Confirm
   'POST /CODUpdateConfirmStatus' : 'ShippingcController.CODUpdateConfirmStatus',
   'POST /sendNotifConfirm' : 'NotificationController.sendNotifCODCOnfirm',
   'POST /sendNotifByWA' : 'NotificationController.sendNotifByWA',

  //get data for k-mart dashboard req by DNM
  'POST /getKMartData': 'KMartDataController.getKMartDataController', 
};

module.exports = publicRoutes;
