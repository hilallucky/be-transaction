const schemas = require('../../api/policies/schemas');
const validation = require('../../api/policies/validation');

module.exports = {
    'POST /mlm_first' : {
        path: "mlmFirstController.index",
        middlewares: [validation(schemas.first)]
    },

    'POST /mlm_second' : {
        path: "mlmSecondController.index",
        middlewares: [validation(schemas.second)]
    },

    'POST /mlm_third' : {
        path: "mlmThirdController.index",
        middlewares: [validation(schemas.third)]
    },

    'POST /mlm_fouth' : {
        path: "mlmFouthController.index",
        middlewares: [validation(schemas.fouth)]
    },

    'POST /mlm_fifth' : {
        path: "mlmFifthController.index",
        middlewares: [validation(schemas.fifth)]
    },
    
    // 'Post /userInsert' : {
    //     path: "Testcontroller.index",
    //     middlewares: [validation(schemas.Users)]
    // }
}