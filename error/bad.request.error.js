export class badRequestError extends Error {
    constructor(message) {
        super(message)
        this.httpCode = 400
        Error.captureStackTrace(this, this.constructor)
    }
}