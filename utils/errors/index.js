class CustomError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

class ValidationError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}

class BusinessLogicError extends CustomError {
    constructor(message) {
        super(message, 400);
    }
}

class DatabaseError extends CustomError {
    constructor(message) {
        super(message, 500);
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message, 404);
    }
}

module.exports = {
    ValidationError,
    NotFoundError,
    BusinessLogicError,
    DatabaseError
};