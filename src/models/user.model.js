import mongoose,{Schema} from "mongoose"; // Importing mongoose and Schema from mongoose package.

import jwt from  'jsonwebtoken'; // Importing jwt package for JSON Web Tokens.
import bcrypt from  'bcrypt' // Importing bcrypt package for password hashing.

const userSchema =new Schema({ // Creating a new mongoose Schema for User model.
    username:{ // Field for storing username.
        type:String, // Data type is String.
        required:true, // Field is required.
        unique:true, // Value must be unique.
        lowercase:true, // Convert value to lowercase.
        trim:true, // Remove whitespace from the beginning and end of the value.
        index:true // Add an index to this field for faster queries.
    },
    email:{ // Field for storing email address.
        type:String, // Data type is String.
        required:true, // Field is required.
        unique:true, // Value must be unique.
        lowercase:true, // Convert value to lowercase.
        trim:true, // Remove whitespace from the beginning and end of the value.
    },
    fullname:{ // Field for storing full name.
        type:String, // Data type is String.
        required:true, // Field is required.
        trim:true, // Remove whitespace from the beginning and end of the value.
        index:true // Add an index to this field for faster queries.
    },
    avatar:{ // Field for storing avatar image URL (from cloudinary).
        type:String, // Data type is String.
        required:true, // Field is required.
    },
    coverImage:{ // Field for storing cover image URL (from cloudinary).
        type:String, // Data type is String.
    },
    watchGHistory:[ // Field for storing watched video history as an array of ObjectIds referencing the "Video" model.
        {
            type:Schema.Types.ObjectId, // Data type is ObjectId.
            ref:"Video" // References the "Video" model.
        }
    ],
    password:{ // Field for storing hashed password.
        type:String, // Data type is String.
        required:[true,'Password is required'] // Field is required with a custom error message if not provided.
    },
    referesToken:{ // Field for storing refresh token.
        type:String, // Data type is String.
    }
},{timestamps:true}) // Automatically adds createdAt and updatedAt timestamps to documents.

userSchema.pre("save", async function(next){ // Middleware function executed before saving a user document.
    if(!this.isModified("password")) return next(); // If password is not modified, skip hashing.

    this.password = bcrypt.hash(this.password,10) // Hash the password using bcrypt with a salt round of 10.
    next() // Proceed to the next middleware.
    
})

userSchema.methods.isPasswordCorrect = async function(password){ // Method to check if a given password is correct.
   return await bcrypt.compare(password, this.password) // Compare the given password with the stored hashed password.
   
}

userSchema.methods.generateAccessToken = function (){ // Method to generate an access token for authentication.
    jwt.sign( // Generate a signed JSON Web Token.
        {
            _id:this._id, // Include user ID in the token payload.
            email:this.email, // Include email in the token payload.
            username:this.username, // Include username in the token payload.
            fullname:this.fullname // Include full name in the token payload.
        },
        process.env.ACCESS_TOKEN_SECRET, // Secret key used to sign the token.
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY // Expiry time for the token.
        }
    )
}

userSchema.methods.generateRefreshToken = function(){ // Method to generate a refresh token for authentication.
    jwt.sign( // Generate a signed JSON Web Token.
        {
            _id:this._id, // Include user ID in the token payload.
            
        },
        process.env.REFRESH_TOKEN_SECRET, // Secret key used to sign the token.
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY // Expiry time for the token.
        }
    )

}

export const User= mongoose.model("User",userSchema) // Create and export the User model using the userSchema.
 