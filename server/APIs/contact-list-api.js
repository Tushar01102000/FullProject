//create a mini exp route
const exp=require("express");
const contactListApp=exp.Router();

//get express-async-handler to handle async errors
const expressAsyncHandler=require("express-async-handler");
const verifyToken=require('../Middlewares/verifyToken');

//import req handlers from controller
const {addContact,getContacts,getContactId, updateContact, deleteContact}=require('../Controllers/contactList-controller');



//add contact
contactListApp.post("/contact",verifyToken, expressAsyncHandler(addContact));
//get contact
contactListApp.get("/contacts",verifyToken, expressAsyncHandler(getContacts));
//get contact by id
contactListApp.get("/contact/:id",verifyToken, expressAsyncHandler(getContactId));
//update contact
contactListApp.put("/updatecontact/:id",verifyToken, expressAsyncHandler(updateContact));
//deleteContact
contactListApp.delete("/deletecontact/:id",verifyToken, expressAsyncHandler(deleteContact));


module.exports=contactListApp;