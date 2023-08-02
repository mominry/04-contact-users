
class BaseError extends Error
{
    constructor(message,name,HttpStatusCode,specification)
    {
        super(message)
        this.name = name
        this.specification=specification
        this.HttpStatusCode=HttpStatusCode
    }
}

module.exports= BaseError