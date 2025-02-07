import { NextFunction } from './../node_modules/@types/express-serve-static-core/index.d';
import { Request, Response } from 'express';
export const CatchAsyncError = (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
}