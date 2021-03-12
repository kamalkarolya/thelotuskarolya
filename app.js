const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require("body-parser");
const hbs = require("hbs");
// const bootstrap = require('bootstrap');
//  CONNECTION TO DATABASE
var mongoose = require('mongoose');
const { Console } = require('console');

mongoose.connect('mongodb://localhost:27017/registrationform', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true}).then(()=>{
    console.log(`CONNECTED TO THE DATABASE!!`);

}).catch((e)=>{
    console.log(`UNABLE TO CONNECT WITH DATABASE`);
})


//  DIRECTORY
 const static_path = path.join(__dirname, 'public');
 const template_path = path.join(__dirname, 'templates/views');
 const partial_path = path.join(__dirname, 'templates/partials');
 

  app.use(express.static(static_path));
    app.set("view engine", "hbs");
  app.set("views", template_path);

  hbs.registerPartials(partial_path);
//   Handlebars.registerHelper({navigation:partial , footer"})
   
  
  
  // SERVER PORT NO.
  const port =   process.env.PORT || 8000;
  app.listen(port, ()=>{
      console.log(`Server is Started at  http://localhost:${port}/`);
  })
 
//   FILES RENDERING
app.get('/', (req, res)=>{
    res.render('index')

});
app.get('/register', (req, res)=>{
    res.render('register')

});
app.get('/index', (req, res)=>{
    res.render('index')

});
app.get('/resource', (req, res)=>{
    res.render('resource')

});
app.get('/about', (req, res)=>{
    res.render('about')

});

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.post('/register', (req, res)=>{
    var myData = new Register(req.body);
    myData.save().then(()=>{
    res.render('thanks')
    }).catch(()=>{
    res.status(400).render('error')
})
})




// DATABASE SCHEMA
  
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
    dob:{
        type : Date,
        required:true
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
     city:{
        type : String,
        required:true
    },
     pincode:{
         type : Number,
         required:true
     }
    
    
  });

  const Register = new mongoose.model('Register', registrationSchema);

  