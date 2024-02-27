const {isEmail} = require("validator");
const {validationResult} = require("express-validator");
const {Common} = require("./common");

class Validator {

    validate = () => {

    }

    static validateFields = (req, res, next) => {

        const errors = validationResult(req);

        if(!errors.isEmpty()){
            let response = Common.getStandardResponse(400, errors)
            return res.status(400).json(response);
        }

        next();
    }
}

module.exports = Validator

