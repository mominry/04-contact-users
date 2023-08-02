const BaseError = require("./BaseError");

class InvalidName extends BaseError
{
    constructor(specification)
    {
        super("Invalid Name","Invalid Name",401,specification)
        
    }
}

module.exports = InvalidName