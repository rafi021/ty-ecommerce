// message, status code, error codes, error

export class HttpException extends Error{
    message: string;
    errorCode: any;
    statusCode: number;
    errors: ErrorCode;

    constructor(message: string, errorCode: ErrorCode, statusCode: number, errors: any){
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export enum ErrorCode {
    NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INVALID_CREDENTIALS = 1003,
    UNPROCESSABL_ENTITY = 2001,
    UNAUTHORIZED = 4003,
    INTERNAL_EXCEPTION = 5000,
}