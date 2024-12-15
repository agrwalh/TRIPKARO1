import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
 import cors from 'cors';
import authRouter from './routes/auth.route.js' 
import userRouter from './routes/user.route.js' 
import itineraryRouter from './routes/itinerary.route.js'
import cookieParser from 'cookie-parser';
import path from "path"
dotenv.config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Connected to MongoDB') 
})
.catch((err) => {
    console.log(err)
})

// resolves a sequence of paths  into an absolute path.
const __dirname = path.resolve();           

const app = express();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173', // or your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }));
  
  // Handle preflight requests
  app.options('*', cors());
// // Middleware
app.use(express.json());
app.use(cookieParser());

// PORT
app.listen(3000, () =>{
    console.log('Example app listening on port 3000!!')
})

// Routes
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/itinerary", itineraryRouter)



// set static folder
app.use(express.static(path.join(__dirname, '/frontend/dist')))
// handle SPA
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
})
 

// middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

