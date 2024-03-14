const jwt=require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req,res,next){
    //get bearer token from headers to req object
    const bearerToken=req.headers.authorization;
    //get token
    if(bearerToken){
        //verify tokwn
        let decodedToken=jwt.verify(bearerToken, process.env.SECRET_KEY);
        next();
    }else{
        res.status(403).send({message:"Unauthorised access"});
    }
}

module.exports=verifyToken;