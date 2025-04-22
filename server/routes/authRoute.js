import express from 'express'
import { isAuthenticated, Login, logout, signup } from '../controller/authController.js';
import { userAuth } from '../middleware/userAuth.js';

const authRoute = express.Router();

authRoute.post('/signup',signup)
authRoute.post('/login',Login)
authRoute.post('/logout',logout)
authRoute.get('/is-auth', userAuth,isAuthenticated)
export default authRoute