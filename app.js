const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./util/database');
const User = require('./models/User');

var cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));


app.post('/user/add-user', async(req, res, next) => {
    try{
        if(!req.body.phone)
           throw new Error('Phone Numbert is mandatory');
        
        const name = req.body.name;
        const email = req.body.email;
        const phonenumber = req.body.phone;
        const date = req.body.date;
        
       const data = await User.create({
           name : name,
           email : email,
           phonenumber: phonenumber,
           date: date

       })
       res.status(201).json({newUserDetail : data});
    }catch(err){
        res.status(500).json({error: err})
    }
})

app.get(`/user/get-users`, async(req, res, next) => {
    try{
       const user = await User.findAll();
       res.status(200).json({allUser : user});
    }catch(error){
        console.log('GET user is failing', JSON.stringify(error));
        res.status(500).json({error: error});
    }
})

app.delete(`/user/delete-users/:id`, async(req, res) => {
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
})

sequelize.sync()
  .then(result => {
    app.listen(5500);
  })
  .catch(err => {
    console.log(err);
  });