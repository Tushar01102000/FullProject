const {ContactList}=require("../db");

const addContact=async(req,res)=>{
    let contact=await ContactList.create(req.body);
    res.status(201).send({message: "Contact added", payload:contact});
}

const getContacts=async(req,res)=>{
    let contactList=await ContactList.find();
    res.status(200).send({message:"show contactList", payload:contactList});
}

const getContactId=async(req,res)=>{
    let contact=await ContactList.findOne({_id:req.params.id});
    res.status(200).send({message:"show contact", payload:contact});
}

const updateContact=async(req,res)=>{
    let contact=await ContactList.findOneAndUpdate({_id: req.params.id},req.body);
    res.status(200).send({message:"Contact updated", payload:contact});
}

const deleteContact=async(req,res)=>{
    let contact=await ContactList.deleteOne({_id:req.params.id});
    res.status(200).send({message:"Contact deleted",payload:contact});
}


module.exports={addContact, getContacts,getContactId, updateContact, deleteContact};