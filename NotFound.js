const BaseError = require("./BaseError");

class NotFound extends BaseError
{
    constructor(specification)
    {
        super("not found","not found",401,specification)
    }
}

module.exports = NotFound