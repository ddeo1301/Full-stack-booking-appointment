const express = require('express');
const router = express.Router();

//const User = require('../models/User')
const User = require('../models/user');

const addUser =  async(req, res, next) => {
    try{
        if(!req.body.phoneNo){
            throw new Error('Phone Number is mandatory');
        }
        
        const name = req.body.name;
        const email = req.body.emailId;
        const phonenumber = req.body.phoneNo;
        const date = req.body.date;
       // const time = req.body.time;
        
       const data = await User.create({
           name : name,
           email : email,
           phoneNo: phonenumber,
           date: date,
          // time : time

       })
       console.log(data);
       res.status(201).json({newUserDetail : data});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
}

const getUser = async(req, res, next) => {
    try{
       const user = await User.findAll();
       res.status(200).json({allUser : user});
    }catch(error){
        console.log('GET user is failing', JSON.stringify(error));
        res.status(500).json({error: error});
    }
}

const deleteUser = async(req, res) => {
    try{
       if(req.params.id == 'undefined'){
        console.log('ID is missing');
        return res.status(400).json({err : 'ID IS MISSING'});
       }

       const uId = req.params.id;
       await User.destroy({where: {id : uId}});
       res.sendStatus(200);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    addUser,
    getUser,
    deleteUser
}