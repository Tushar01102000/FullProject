//create a mini exp route
const exp=require("express");
const userApp=exp.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler=require("express-async-handler");

//import req handlers from controller
const {createUser,loginUser}=require('../Controllers/user-controller');


//createUser
userApp.post("/user", expressAsyncHandler(createUser));
//login user
userApp.post("/login", expressAsyncHandler(loginUser));


module.exports=userApp;