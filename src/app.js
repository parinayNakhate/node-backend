import express from  'express';
import cookieParser from 'cookie-parser'; // to access and set cookies  on the client side.
import cors from  'cors';
const app=express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,

}))

app.use(express.json({limit:"16kb"})) // when data coming from ui i.e. form
app.use(express.urlencoded({extended:true, limit:"16kb"})) // when data coming from external source
app.use(express.static('public'))
app.use(cookieParser())

export {app}