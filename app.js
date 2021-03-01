const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require("body-parser");
const hbs = require("hbs");
 
//  connection to database
var mongoose = require('mongoose');
const { Console } = require('console');

mongoose.connect('mongodb://localhost:27017/registrationform', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}).then(()=>{
    console.log(`CONNECTED TO THE DATABASE!!`);

}).catch((e)=>{
    console.log(`UNABLE TO CONNECT WITH DATABASE`);
})


//    directory
 const static_path = path.join(__dirname, 'public');
 const template_path = path.join(__dirname, 'views');
 
//  const landing_path = path.join(__dirname, 'public/landing page');
//  const registers_path = path.join(__dirname, 'public/registration');
  app.use(express.static(static_path));
    app.set("view engine", "hbs");
  app.set("views", template_path);

  
//   app.set("registeration", "registers_path");

const port =   process.env.PORT || 3000;

app.get('/', (req, res)=>{
    res.render('index')

});
app.get('/register', (req, res)=>{
    res.render('register')

});
// app.get('/registration form ', (req, res)=>{
//     res.render('register')

// });
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.post('/register', (req, res)=>{
    var myData = new Register(req.body);
    myData.save().then(()=>{
    res.send(" items has been saved to the Database ")
    }).catch(()=>{
    res.status(400).send( "     Items was not Saved to the database      /    try again ")
})
})
// starting server
app.listen(port, ()=>{
    console.log(`Server is Started at  http://localhost:${port}/`);
})




// database schemaa
  
const registrationSchema = new mongoose.Schema({
    firstname:{
        type : String,
        required:true
    },
    lastname:{
        type : String,
        required:true
    },
    gender:{
        type : String,
        required:true
    },
    phnumber:{
        type : Number,
        required:true,
        unique:true
    },
    email:{
        type : String,
        required:true,
        unique:true
    },
    address:{
        type : String,
        required:true
    },
    address:{
        type : String
        
    },
    state:{
        type : String,
        required:true
    },
     pincode:{
         type : Number,
         required:true
     }
    
    
  });

  const Register = new mongoose.model('Register', registrationSchema);

  