const Joi=require('joi')

module.exports={
    //contohschema
    product_add:Joi.array().items({
        prd_code : Joi.string().max(23).required(),
        cat_code : Joi.string().max(23).required(),
        parent_prd_code : Joi.string().max(23).required(),
        prd_desc : Joi.string().max(130).required(),
        prd_notes : Joi.string().max(50).required(),
        prd_is_bundling : Joi.string().max(1).required(),
        status : Joi.string().max(1).required(),
        apps_status : Joi.string().max(1).required(),
        prd_image_url : Joi.string().max(130).required(),
        prd_weight : Joi.number().required(),     
        unit_weight_type : Joi.string(),        
        prd_max_order : Joi.number().required(),
        prd_info : Joi.string().required(),
        prd_search_tag : Joi.string().required(),
        prd_is_hot : Joi.string().max(1),
        prd_is_new : Joi.string().max(1),
        prd_group_lp : Joi.string().max(120),
        prd_start_on : Joi.date().required(),
        prd_end_on : Joi.date().required(),
        username : Joi.string().max(25),
        appname : Joi.string().max(50).required(),
        update_type : Joi.string().max(10),

        product_price : Joi.array().items({
                            price_code : Joi.string().max(5).required(),
                            price_consument : Joi.number().required(),
                            price_distributor : Joi.number().required(),
                            price_bv : Joi.number().required(),
                        }),

        product_bundle : Joi.array().items({
                            prd_bundle_detail_prd_code : Joi.string().max(23).required(),
                            prd_bundle_detail_desc : Joi.string().max(130).required(),
                            prd_bundle_detail_cat_code : Joi.string().max(23).required(),
                            prd_bundle_detail_qty : Joi.number().required(),
                        }),
    }),

    product_price:Joi.array().items({
        prdcd:Joi.string().required(),
    }),


    product_bundling_header:Joi.array().items({
        prdcd:Joi.string().required(),
    }),

    product_bundling_detail:Joi.array().items({
        prdcd:Joi.string().required(),
    })

}