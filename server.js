const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const like = require('./controllers/like');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'ivank',
    password : 'sivec1064',
    database : 'smartbrain'
  }
});

const app = express();

app.use(bodyParser.json())

app.use(cors())

app.get('/', (req, res) => {res.send('It is working!')})

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.put('/like', (req, res) => {like.handleLike(req, res, db)})

app.listen(process.env.PORT || 3000 , () => {
	console.log(`App is running on ${process.env.PORT}`);
});