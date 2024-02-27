const {getReasonPhrase} = require('http-status-codes');

class Common {
    static getStandardResponse(code, data = undefined) {
        if (data === undefined) {
            data = false;
        }

        const response = {
            status: {
                code: code,
                reason: getReasonPhrase(code)
            }
        }

        if (data) {
            response.data = [];
            response.data.push(data);
        }

        return response
    }
}

module.exports = {
    Common
}