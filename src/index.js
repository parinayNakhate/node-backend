

import dotenv from 'dotenv'
// import mongoose from 'mongoose';
// import { DB_NAME } from './constants.js';
// import express from  'express';
import { app } from './app.js';
import connectDB from "./db/index.js";

 dotenv.config({path:'./env'})

 connectDB().then(()=>{
    console.log("MONGO DB CONNECTION SUCCESS")
    app.on("error",(error)=>{
                    console.log("Error",error);
                    throw error
                });
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`App listening on ${process.env.PORT}`)
    })
 }).catch((err)=>{
    console.log('MONGO DB CONNECTION FAILED!!!',err)
 })






//  const app=express();






















// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",(error)=>{
//             console.log("Error",error);
//             throw error
//         });

//         app.listen(process.env.PORT,()=>{
//             console.log(`App is listening on ${process.env.PORT}`);
//         })

//     }catch(e){
//         console.error("error",e)
//         throw err;
//     }
// })();

