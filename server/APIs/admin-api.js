//create a mini exp route
const exp=require("express");
const adminApp=exp.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler=require("express-async-handler");


//import req handlers from controller
const {loginAdmin}=require('../Controllers/admin-controller');



//login user
adminApp.post("/login", expressAsyncHandler(loginAdmin));


module.exports=adminApp;