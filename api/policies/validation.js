
/**
 * @author umar edp
 * @param {*} form data schema yg sdh di sebutkan di file schemas.js
 * contoh validation input untuk body-raw json 
 */

const validation = (form) => {
    return (req, res, next) => {
        const {error} = form.validate(req.body)
        const valid = error == null;

        if(valid){
            next();
        }else{
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            res.status(422).json({
                status:false,
                error: message
            })
        }


    }
}

module.exports = validation