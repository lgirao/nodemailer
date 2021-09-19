const express = require('express');
const result = require('dotenv').config();
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

if (result.error) {
    throw result.error
  };

// ROUTES
app.get('/', (req, res) => {
    res.render('index')
 });

app.post('/send', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Message: ${req.body.message}</li>
        </ul>
    `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.YOUR_HOST,
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_ID, // A2 Hosting Email
        pass: process.env.NODEMAILER_PASSWORD, // Password for email account
      },
      tls:{
        rejectUnauthorized:false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Website Contact" <test@waylandballoonfest.com>', // sender address
      to: "lesleygirao@gmail.com", // list of receivers
      subject: "Balloonfest Contact", // Subject line
      text: "Hello world", // plain text body
      html: output, // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('index');
    });
});



app.listen(3000, () => {
    console.log('Listening on port 3000')
 });


 