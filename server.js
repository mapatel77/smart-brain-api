const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const pg = require('pg');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db= knex({
    client: 'pg',
  //  version:'8.11.3',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: { rejectUnauthorized : false },
      host : process.env.DATABASE_HOST, //localhost
      user : process.env.DATABASE_USER, //add your user name for the database here
      port: 5432, // add your port number here
      password : process.env.DATABASE_PW,//add your correct password in here
      database : process.env.DATABASE_DB //add your database name you created here
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