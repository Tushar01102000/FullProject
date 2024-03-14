//create express app
const exp=require("express");
const app=exp();
const path=require('path');

//connect angular app wkith server
app.use(exp.static(path.join(__dirname, '../client3/dist/client3/browser')));

//configure environment variables
require('dotenv').config();

//body parsing middleware
app.use(exp.json());

//import API
const userApp=require('./APIs/user-api');
const adminApp=require('./APIs/admin-api');
const contactListApp=require('./APIs/contact-list-api');
const contactUsApp=require('./APIs/contactus-api');

//forwared request to when path starts with /
app.use('/user-api', userApp);
app.use('/admin-api',adminApp);
app.use('/contact-list-api', contactListApp);
app.use('/contactus-api',contactUsApp);
//to load default route when we refresh page
app.use((req,res,next)=>{
    res.sendFile((path.join(__dirname, '../client3/dist/client3/browser/index.html')));
})

//error handler
app.use((err,req,res,next)=>{
    res.send({message:"Error occured", payload:err.message});
})

const PORT=process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log(`Web server listening on port ${PORT}`);
})
