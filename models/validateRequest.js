const { Types } = require('../constants/enums');

module.exports.ValidateParams = (request, requirement) => {
    for (const [reqKey, reqType] of Object.entries(requirement)) {
        const requestParam = request.params[reqKey];
        if (!requestParam) {
            return false;
        }
        switch (reqType) {
            case Types.INTEGER:
                var isValid = isNumber(requestParam);
                if (!isValid) {
                    return false;
                }
                break;
            default:
                break;
        }
    };
    return true;
}

module.exports.ValidateForm = (request, requirement) => {
    for (const [reqKey, reqType] of Object.entries(requirement)) {
        const reqFormValue = request.body[reqKey];
        if (!reqFormValue) {
            if (reqFormValue != 0) {
                return false;
            }
        }
        switch (reqType) {
            case Types.INTEGER:
                var isValid = isNumber(reqFormValue);
                if (!isValid) {
                    return false;
                }
                break;
            default:
                break;
        }
    }
    return true;
}

module.exports.ValidateQuery = (request, requirement) => {
    for (const [reqKey, reqType] of Object.entries(requirement)) {
        const qryParam = request.query[reqKey];
        if (!qryParam) {
            continue;
        }
        switch (reqType) {
            case Types.INTEGER:
                var isValid = isNumber(qryParam);
                if (!isValid) {
                    return false;
                }
                break;
            default:
                break;
        }
    };
    for (const [key, value] of Object.entries(request.query)) {
        const reqField = requirement[key];
        if (!reqField) {
            return false;
        }
    }
    return true;
}

const isNumber = (numberStr) => {
    return !isNaN(numberStr);

}

