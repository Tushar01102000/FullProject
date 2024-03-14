const {User}=require("../db");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
require('dotenv').config();

//create new user
const createUser=async (req,res)=>{
    //check for existing user with email
    let existingUser=await User.findOne({email: req.body.email});
    //user altraedy existed
    if(existingUser!==null){
        return res.status(200).send({message:"User already existed"});
    }
    //if user not existed
    const hashedPassword=await bcryptjs.hash(req.body.password, 6);
    //replace plain password with hashedPassword
    req.body.password=hashedPassword;
    const newUser= await User.create(req.body);

    res.status(201).send({message:"User created", payload: newUser});
}

//login user
const loginUser=async (req,res)=>{
    //get user credentials obj from req
    const userCredentials=req.body;
    //check email
    let user=await User.findOne({email:userCredentials.email});
    //if invalid email
    if(user===null){
        return res.status(200).send({message:"Invalid Email"});
    }
    //if email is found, compare passwords
    const result=await bcryptjs.compare(userCredentials.password, user.password);
    //if password not matched
    if(result===false){
        return res.status(200).send({message: "Invalid password"});
    }
    //create jwt token and sign it
    const signedToken=jwt.sign(
        {email:user.email},
        process.env.SECRET_KEY,
        {expiresIn:"1d"}
    );
    res.status(200).send({message:"Login Success", token:signedToken, user:user});
}

//exports
module.exports={createUser, loginUser};