
//require('dotenv').config({ path: '../.env' });
import dotenv from 'dotenv'


import connectDB from "./db/index.js";

dotenv.config({path:'./env'})

connectDB()






// const app=express();


// (async ()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",()=>{
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

