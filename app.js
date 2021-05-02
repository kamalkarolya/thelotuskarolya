const dotenv = require('dotenv');
const express = require('express');
const app = express();
require('./src/db/conn');
const path = require('path');
const bodyParser = require("body-parser");
const hbs = require("hbs");
require('./src/models/register');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
const auth = require('./src/middleware/auth');
const Register = require('./src/models/register');
const Feedback = require('./src/models/register');
// let validator = require('validator');
//  var nodemailer = require('nodemailer');
// const bootstrap = require('bootstrap');
// UTILITIES
const port = process.env.PORT || 3000;

dotenv.config({ path: './config.env' });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//  DIRECTORY
const static_path = path.join(__dirname, 'public');
const template_path = path.join(__dirname, 'templates/views');
const partial_path = path.join(__dirname, 'templates/partials');


app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

hbs.registerPartials(partial_path);




// SERVER PORT NO.


//   FILES RENDERING
app.get('/', (req, res) => {
    res.render('index')

});
app.get('/index', (req, res) => {
    res.render('index')

});
app.get('/register', (req, res) => {
    res.render('register')

});

app.get('/resource', auth, (req, res) => {
    console.log(`cokiesssss  ${req.cookies.jwt}`);
    res.render('resource')

});
app.get('/about', auth, (req, res) => {
    res.render('about')

});
app.get('/blog', auth, (req, res) => {
    res.render('index')

});
app.get('/faq', (req, res) => {
    res.render('index')

});
app.get('/our work', (req, res) => {
    res.render('index')

});
app.get('/login', (req, res) => {
    res.render('login')

});
app.get('/logout', auth, async (req, res) => {
    try {

        console.log(req.User);
        // req.User.tokens = req.User.tokens.filter((currElement)=>{
        //     return currElement.token !== req.token;
        // })
        req.User.tokens = [];
        res.clearCookie("jwt");
        await req.User.save();
        res.render('login');

    } catch (e) {
        res.status(500).render('error');
    }

});



app.post('/register', async (req, res) => {
    // var myData = new Register(req.body);
    // myData.save().then(()=>{
    // res.render('login')
    // }).catch(()=>{
    // res.status(400).render('error')
    try {
        const registerPerson = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            dob: req.body.dob,
            email: req.body.email,
            phnumber: req.body.phnumber,
            address: req.body.address,
            address2: req.body.address2,
            state: req.body.state,
            city: req.body.city,
            pincode: req.body.pincode,
            password: req.body.password
        })
        console.log(`the data is ${registerPerson}`);
        const token = await registerPerson.generatetoken();
        console.log(`THE TOKEN IS ${token}`);
        const registered = await registerPerson.save();
        res.status(201).render('login');
        console.log(registered);
        // storing of cokkie
        res.cookie('jwt', token
            // ,{
            //    expires:new Date(Date().now +1000000),
            //    httpOnly:true,
            //         secure:true
            // }
        );
        //    console.log(cookie);
    } catch (e) {
        console.log(e);
        res.status(500).render('error');
    }

})

app.post('/index', (req, res) => {
    var myData = new Feedback(req.body);
    myData.save().then(() => {
        res.render('index')
    }).catch(() => {
        res.status(400).render('error')
    })
})
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userid = await Register.findOne({ email: email });
        const isMatch = await bcrypt.compare(password, userid.password);
        const token = await userid.generatetoken();
        console.log(`THE TOKEN IS ${token}`);
        res.cookie('jwt', token);

        //    console.log(userid);
        if (isMatch) {
            res.status(200).render('thanks');
        } else {
            res.status(404).send("invalid details");
        }

    } catch (e) {
        res.status(400).send("invalid details")
    }
})



// DATABASE SCHEMA

// module.exports = mongoose.model('Register',registrationSchema)
//   EMAIL 
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'kamalkarolya@gmail.com',
//       pass: process.env.GOOGLE_KEY
//     }
//   });

//  var mailOptions = {
//     from: 'kamalkarolya@gmail.com',
//     // to: '   ',
//     subject: 'Thanks ',
//     html: '<h1 >Welcome</h1><p>That was easy!</p>'
//   };

//   transporter.sendMail(mailOptions, function(error, info){
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });


//   *************************EXAMPLE OF JWTJSON WEB TOKEN FOR VERIFICATION*************************8
// const createToken= async()=>{
//     const token = await jwt.sign({_id:"608be5033ece062dc800f188"}," verification key ",{
//         expiresIn:"2 minutes"
//     });
//     console.log(token);
//      const verifyToken = await jwt.verify(token,"mynameiskamalkarolyadeveloper");
//      console.log(verifyToken);
// }
// createToken();
app.listen(port, () => {
    console.log(`Server is Running at  http://localhost:${port}/`);
})