import express from 'express'
import 'dotenv/config'
import uploadRouter from './routes/uploadRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectDB from './config/db.js'
import authRoute from './routes/authRoute.js'
import userRouter from './routes/userRoutes.js'

const app = express()
app.use(express.json())
app.use(cookieParser()); 

const PORT= process.env.PORT || 3000;

app.use(express.urlencoded({extended:false}))
app.use(cors({
  origin: '*',
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// app.options('*', cors());

app.get('/',(req,res)=>
{
   
    res.send("Hello everyone")
    
})

app.use('/uploads', express.static('uploads'));


app.use('/api/upload', uploadRouter);
app.use('/api/auth',authRoute)
app.use('/api/user',userRouter)



app.listen(PORT, ()=>
{
    console.log(`Server is listening is the ${PORT}`)
})

connectDB();
