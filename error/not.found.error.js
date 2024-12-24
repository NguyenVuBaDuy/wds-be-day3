export class notFoundError extends Error {
    constructor(message) {
        super(message)
        this.httpCode = 404
        Error.captureStackTrace(this, this.constructor)
    }
}