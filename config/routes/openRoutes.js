const cache = require('../../api/services/RedisMiddleware')
const schemas = require('../../api/policies/schemas'),
      schema_products = require('../../api/policies/schema_products'); // schema input
const validation = require('../../api/policies/validation'); // function validator

const openRoutes = {
        /**
         * contoh penggunaan validator input
         */
        // 'GET /getAllProductList': {
        //         path: 'ProductController.getAllProductList',
        //         middlewares: [validation(schemas.Users)]
        // },
  
  'GET /getKMartData': 'KMartDataController.getKMartDataController', 
  'GET /getAllProductList': 'ProductController.getAllProductList',
  'GET /getCatProduct'  :'ProductController.getProductCatList',
  'POST /insertTransactionTmpLP': 'InsertTransTempController.insertTransTmpLP',
  'POST /checkTransTmpByOrder': 'InsertTransTempController.checkTransTmpByOrder',
  'POST /insertTransProdFromTemp': 'InsertTransProdController.insertTransProdFromTemp',
  // 'POST /insertTransProdFromTemp2': 'InsertTransProdController.insertTransProdFromTemp2',
  'GET /productList': 'ProductController.getAllProductListKmart',
  'GET /categoryList': 'ProductController.getCatProductListKmart',
  'PUT /categoryList': 'ProductController.updateCatProductListKmart',

  //Product Master CRUD
  'POST /productMasterAdd' :  {
        path: 'ProductMasterController.productMasterAdd',
        middlewares: [validation(schema_products.product_add)]
    },

  'POST /productMasterEdit' :  {
        path: 'ProductMasterController.productMasterEdit',
        middlewares: [validation(schema_products.product_add)]
    },

  'GET /status': 'StatusController.status',
  'POST /checkjaringan' : 'LoginController.checkJaringan',
  // 'POST /loginDigitalBrainNew' : 'LoginController.loginDigitalBrainNew',
  'POST /login' : 'LoginController.login',
  'POST /getMember' : 'LoginController.getUser',
  'POST /addEmail': 'EmailAwsController.addEmail',
  'POST /loginAkademiInspiradzi' : 'LoginController.loginAkademiInspiradzi',
  'POST /loginApiKnet' : 'LoginController.loginAsuransi',
  'POST /createOrdernoSEQ' : 'MiscController.createOrdernoSEQ',

  'POST /updateBidMars' : 'MiscController.updateBidMars',
  'POST /testHitMars' : 'MiscController.testHitMars',

  'GET /getBannerKnet' : {
          path: 'MiscController.getBannerKnet',
          middlewares: [cache.banner],
          },
  // 'GET /getBannerKnet' : 'MiscController.getBannerKnet',

  'POST /delBannerKnetCache' : {
          middlewares: [cache.delCache],
          },

  'POST /getProductKnet' : {
          path: 'ProductControllerKnet.getProductAllPerPage',
          middlewares: [cache.productknet],
          },

  'POST /getBonusPeriod': 'MiscController.getBonusPeriod',
  'POST /getBonusPeriodNew': 'MiscController.getBonusPeriodNew',
  'POST /updateStockistWh' : 'MiscController.updateStockistWh', 

  'POST /getProductKnet2' : 'ProductControllerKnet.getProductAllPerPage',
  'POST /getIncPaymentByStockist' : 'IncomingPaymentController.getIncPaymentByStockist',
  'POST /CODUpdateConfirmStatus' : 'ShippingcController.CODUpdateConfirmStatus',
  'POST /getDataTransTmp' : 'TransHeaderTmpController.getDataTransTmp',
  'POST /sendNotifConfirm' : 'NotificationController.sendNotifCODCOnfirm',
  'POST /sendNotifByWA' : 'NotificationController.sendNotifByWA',
  
   //check before save to 
  'POST /cekProductByParam': 'ProductControllerKnet.cekProductByParam',
  'POST /cekProductByParamArr': 'ProductControllerKnet.cekProductByParamArr',
  //Shipping Cost Checking
   'POST /checkPayShip': 'ShippingcController.checkPayShip',  

  //Gift Voucher Create, Update & Check
   'POST /VoucherGiftCheck': 'VoucherGiftController.VoucherGiftCheck', 
   'POST /VoucherGiftCreator': 'VoucherGiftController.VoucherGiftCreator', 
   'POST /VoucherGiftUpadeStatus': 'VoucherGiftController.VoucherGiftUpadeStatus', 
   'POST /compareCartWithVocherRule': 'VoucherGiftController.compareCartWithVocherRule', 

   //Golfer
   'POST /getRegGolfers': 'GolferRegController.getRegGolfers', 
   'POST /addRegGolfer': 'GolferRegController.addRegGolfer', 
   'POST /deleteRegGolfers': 'GolferRegController.deleteRegGolfers', 

   //Incoming Payments
   'POST /insertIncPaymentDetails': 'IncomingPaymentController.insertIncPaymentDetails', 

   //Get List Measurement
  'GET /getListMeasurement': 'MiscController.getListMeasurement',

  //Get Stockist List By lat, long
  'POST /stockistListByDistance' : 'StockistListController.stockistListByDistance',
  'POST /stockistOrderByDistance' : 'StockistListController.stockistOrderByDistance',


  'POST /getConfirmByInvNo' : 'ShippingcController.getConfirmByInvNo',

  //Personal Query
   'POST /getPersonalBV': {
          path: 'PersonalQueryBVController.getPersonalBV',
          middlewares: [cache.pbv],
          },
   'POST /getPersonalGBV': {
          path: 'PersonalQueryBVController.getPersonalGBV',
          middlewares: [cache.gbv],
          }, 
   // 'POST /getPersonalGBV': 'PersonalQueryController.getPersonalGBV',

  //Personal Bonus
  'POST /getPersonalListBonus': 'PersonalQueryBonusController.getPersonalListBonus',
  'POST /getPersonalDetailBonus': 'PersonalQueryBonusController.getPersonalDetailBonus',
  // 'POST /getBonusPDF': { path : reportController.createPDF },
  'POST /getBonusPDF': '/reportController/reportController.reportControllerPDF',
  'POST /genPDF': '/reportController/reportController.genPDF',

   //Check Voucher
   'POST /getVoucherCheck': 'VoucherMLMCheckController.getVoucherCheck',
   'POST /getVoucherList': 'VoucherMLMCheckController.getVoucherList',
   'POST /updateByVoucherNo': 'VoucherMLMCheckController.updateByVoucherNo', 

   //Check Voucher New
   'POST /getVoucherCheckNew': 'VoucherMLMCheckControllerNew.getVoucherCheckNew',
   'POST /getVoucherListNew': 'VoucherMLMCheckControllerNew.getVoucherListNew',
   'POST /updateByVoucherNoNew': 'VoucherMLMCheckControllerNew.updateByVoucherNoNew',

  // 'POST /sendsms': 'SmsGatewayAddController.sendSMS',
  'POST /sendAwsEmail': 'EmailAwsController.sendAwsEmail',
  'POST /sendSMS': 'NotificationController.sendSMS',
  'POST /sendEmail': 'NotificationController.sendEmail',
  'POST /testAdd': 'NotificationController.testAdd',
  'POST /sendBirthday': 'NotificationController.sendEmailBirthday',
  'POST /sendNeverOrder': 'NotificationController.sendEmailNeverOrder',
  'POST /sendYearNeverOrder': 'NotificationController.sendEmail1YearEmailNeverOrder',
  'POST /sendPickupStockist': 'NotificationController.sendNotifToAppsPickupStockist',
  'POST /testHit': 'NotificationController.testHit',
  'POST /shortenURL': 'shortenURLController.shortenURL',
   
  // insert InsertTransProdController v2 BY cangkir 13
  'POST /insertTransProdFromTempV2': 'InsertTransProdV2.insertNEwTemp',

  //get data for k-mart dashboard req by DNM
  'POST /getKMartData': 'KMartDataController.getKMartDataController', 
};

module.exports = openRoutes;
