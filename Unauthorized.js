const BaseError = require("./BaseError")
class Unauthorized extends BaseError
{
    constructor(specification)
    {
        super("unauthorized access","unauthorized",401,specification)
    }
}

module.exports = Unauthorized