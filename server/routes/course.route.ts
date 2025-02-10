import { authorizeRoles } from './../middleware/auth';
import { editCourse, uploadCourse } from './../controllers/course.controller';
import express from 'express';
import { isAuthenticated } from '../middleware/auth';
const courseRouter = express.Router();

courseRouter.post('/create-course', isAuthenticated, authorizeRoles("admin"), uploadCourse);
courseRouter.put('/edit-course/:id', isAuthenticated, authorizeRoles("admin"), editCourse);

export default courseRouter;