import { CatchAsyncError } from './../middleware/catchAsyncError';
import { Response } from 'express';
import courseModel from '../models/course.model';

export const createCourse = CatchAsyncError(async (req: any, res: Response) => { 
    const course = await courseModel.create(req.body);
    res.status(201).json({
        success: true,
        course,
    });
});