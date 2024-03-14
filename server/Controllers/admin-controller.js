const {Admin}=require("../db");
const jwt=require("jsonwebtoken");
require('dotenv').config();

//login admin
const loginAdmin=async (req,res)=>{
    //get user credentials obj from req
    const adminCredentials=req.body;
    //check email
    let admin=await Admin.findOne({email:adminCredentials.email, password:adminCredentials.password});
    //if invalid email
    if(admin===null){
        return res.status(200).send({message:"Invalid Credentials"});
    }
    const signedToken=jwt.sign(
        {email:admin.email},
        process.env.SECRET_KEY,
        {expiresIn:"1d"}
    );
    res.status(200).send({message:"Admin Login Success", token:signedToken, admin:admin});
}

//exports
module.exports={loginAdmin};