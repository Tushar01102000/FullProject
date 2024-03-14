//create a mini exp route
const exp=require("express");
const contactUsApp=exp.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler=require("express-async-handler");
const verifyToken=require('../Middlewares/verifyToken');

//import req handlers from controller
const {addContactUs, contactUsList, deleteContactUs}=require('../Controllers/contactus-controller');

//add contactUs
contactUsApp.post("/contactUs",verifyToken, expressAsyncHandler(addContactUs));
//get contact us
contactUsApp.get("/contactUsList",verifyToken, expressAsyncHandler(contactUsList));
//delete contact us
contactUsApp.delete("/deleteContactUs/:id",verifyToken, expressAsyncHandler(deleteContactUs));
//exports
module.exports=contactUsApp;