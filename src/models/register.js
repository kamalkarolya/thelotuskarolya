const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


 
const feedbackSchema = new mongoose.Schema({
    femail:{
        type:String,
        required:true,
        lowercase: true
    //  validate: (value) => {
    //  return validator.isfemail(value)
    //   }
   },
   feed:{
        type:String,
        required:true
    }
});
 const Feedback = new mongoose.model('Feedback', feedbackSchema);
//  module.exports = mongoose.model('Feedback',feedbackSchema )

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
        unique:true,
        lowercase: true
    // validate: (value) => {
    //   return validator.isemail(value)
    // }
    },
    address:{
        type : String,
        required:true
    },
    address2:{
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
     },
     password:{
         type:String,
         required:true
     },
    tokens:[{
         token:{
             type:String,
         required:true
         }  
    }]
    
  });

  // GENERATING JWT TOKEN 

  registrationSchema.methods.generatetoken = async function(){
      try {
          console.log(this._id);
          const token = jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);
          this.tokens =this.tokens.concat({token});
          await this.save();
        //   console.log(tokens);
          return token;
      } catch (e) {
          res.send("Error is"+ e);
           console.log("Error is"+ e);
      }
  }
  //  GENERATING HASH OF PASSWORD
  registrationSchema.pre("save", async function (next){
      
     if(this.isModified("password")){

         this.password = await bcrypt.hash(this.password,10);
     
     }
     
      next(); 

  })


 const Register = new mongoose.model('Register',registrationSchema );

module.exports = Register,Feedback;