const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');
import { handleRegister } from "./controllers/register";
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db= knex({
    client: 'pg',
    version:'8.11.3',
    connection: {
      host : 'localhost', //localhost
      user : 'postgres', //add your user name for the database here
      port: 5432, // add your port number here
      password : 'test', //add your correct password in here
      database : 'smart-brain' //add your database name you created here
    }
});

  
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req, res)=>{
    res.send('success');
})

app.post('/signin', (req, res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res)=> { profile.handleProfileGet(req,res,db)})

app.put('/image', (req, res)=> {image.handleImage(req,res,db)})

app.post('/imageurl', (req, res)=> {image.handleApiCall(req,res)})

app.listen(3000, () =>{
    console.log("app is running on port 3000");
})