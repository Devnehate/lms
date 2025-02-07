import { JsonWebTokenError } from './../node_modules/@types/jsonwebtoken/index.d';
import { NextFunction } from './../node_modules/@types/express-serve-static-core/index.d';
import { Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

export const ErrorMiddelware = (err: any, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 404);
    }

    if (err.name === 'JsonWebTokenError') {
        const message = 'Json Web Token is invalid. Try again';
        err = new ErrorHandler(message, 400);
    }

    if (err.name === 'TokenExpiredError') {
        const message = 'Json Web Token is expired. Try again';
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}