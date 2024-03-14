const {ContactUs}=require("../db");

//add contactUs 
const addContactUs= async(req,res)=>{
    let query=await ContactUs.create(req.body);
    res.status(201).send({message:"Query made", payload:query});
}

//get contact us list
const contactUsList=async(req,res)=>{
    let queryList=await ContactUs.find();
    res.status(200).send({message:"Query List", payload:queryList});
}

//delete contact us
const deleteContactUs=async(req,res)=>{
    let contactUsQuery=await ContactUs.deleteOne({_id:req.params.id});
    res.status(200).send({message:"Query deleted",payload:contactUsQuery});
}

//exports
module.exports={addContactUs, contactUsList,deleteContactUs};