import { NextFunction } from './node_modules/@types/express-serve-static-core/index.d';
require("dotenv").config();
import express, { Request, Response } from 'express';
export const app = express();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddelware } from './middleware/error';
import userRouter from './routes/user.route';

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.ORIGIN,
}));

app.use("/api/v1",userRouter);


app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ success: true, message: 'API is running' });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server`) as any;
    err.statusCode = 404;
    next(err);
});

app.use(ErrorMiddelware);