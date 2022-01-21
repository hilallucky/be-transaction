const privateRoutes = {
  'GET /users': 'UserController.getAll',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /sendEmail': 'EmailAwsController.sendingEmail',

  'POST /login': 'UserController.login',
  'POST /insertTransactionTmp': 'InsertTransTempController.insertTransTmp',
};

module.exports = privateRoutes;
