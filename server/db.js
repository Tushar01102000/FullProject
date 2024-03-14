const mongoose=require('mongoose');
require('dotenv').config();

const DB_URL=process.env.LOCAL_DB_URL;
//connect to DB
mongoose.connect(DB_URL)
.then(()=>{
    console.log("DB connection success");
})
.catch((err)=>{
    console.log("Error in DB connect", err);;
})

//create user schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required: [true, "EMail is required"]
    },
    password:{
        type:String,
        required: [true, "Password is required"]
    } 
})

//create admin schema
const adminSchema=new mongoose.Schema({
    email:{
        type:String,
        required: [true, "EMail is required"]
    },
    password:{
        type:String,
        required: [true, "Password is required"]
    } 
})

//create contactlist schema
const contactSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, "Firstname is required"]
    },
    lastname:{
        type:String,
        required:[true, "Lastname is required"]
    },
    phonenumber:{
        type:Number,
        required:[true, "Phonenumber is required"]
    },
    city:{
        type:String,
        required:[true, "City is required"]
    }
})

//create contactUs schema
const contactUsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Name is required"]
    },
    email:{
        type: String,
        required:[true, "EMail is required"]
    },
    message:{
        type:String,
        required:[true, "Please type your message"],
    }
})

//craete Model(class) for userSchema
const User=mongoose.model('user', userSchema);
const Admin=mongoose.model('admin', adminSchema);
const ContactList=mongoose.model('contactList', contactSchema);
const ContactUs=mongoose.model('contactUs',contactUsSchema);

module.exports={User, Admin, ContactList, ContactUs};