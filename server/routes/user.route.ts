import { authorizeRoles } from './../middleware/auth';
import { activateUser, getUserInfo, loginUser, logoutUser, updateAccessToken, socialAuth } from './../controllers/user.controller';
import express from 'express';
import { registrationUser } from '../controllers/user.controller';
import { isAuthenticated } from '../middleware/auth';
const userRouter = express.Router();

userRouter.post('/registration', registrationUser);

userRouter.post('/activate-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.post('/logout', isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get('/me', isAuthenticated, getUserInfo);

userRouter.post('/socialAuth', socialAuth);

export default userRouter;