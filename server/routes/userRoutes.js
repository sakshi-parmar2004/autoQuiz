import express from 'express'
import { getData } from '../controller/userController.js'
import { userAuth } from '../middleware/userAuth.js'

const userRouter = express.Router()

userRouter.get('/data',userAuth, getData)
export default userRouter;