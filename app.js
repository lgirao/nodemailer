const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

// EJS VIEW ENGINE SETUP
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// STATIC FOLDER - PUBLIC (style, js, img)
app.use(express.static(path.join(__dirname, 'public')));

// BODY PARSER MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ROUTES
app.get('/', (req, res) => {
    res.render('index')
 });

app.post('/send', (req, res) => {
    res.send(req.body);
});


app.listen(3000, () => {
    console.log('Listening on port 3000')
 });


 