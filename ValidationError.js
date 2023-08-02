const BaseError = require("./BaseError")

class ValidationError extends BaseError{
    constructor(specification){
        super("validationError", "validation error", 403)
        this.specification = specification
    }
}

module.exports = ValidationError