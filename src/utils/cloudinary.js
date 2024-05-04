import {v2 as cloudinary} from "cloudinary";
import fs from  'fs';



          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_CLOUD_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
       const response= await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        //file has been uploaded successfully
        console.log('filed uploaded successfully',response.url)
        return response;
    }catch(err){
        fs.unlinkSync(localFilePath) //remove the locally saved temp file as the  upload was not successful
        return  null;
    }
}


export {uploadOnCloudinary}