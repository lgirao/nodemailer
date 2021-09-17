const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// EJS VIEW ENGINE SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// BODY PARSER MIDDLEWARE
app.use(express.urlencoded({ extended: true }));

// STATIC FOLDER - PUBLIC (style, js, img)
app.use(express.static(path.join(__dirname, 'public')));


// ROUTES
app.get('/', (req, res) => {
    res.render('index');
 });

app.listen(3000, () => {
    console.log('Listening on port 3000')
 });