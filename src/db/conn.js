var mongoose = require('mongoose');

mongoose
.connect( process.env.DATABASE_KEY , {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true})
.then(()=>{
    console.log(`CONNECTED TO THE DATABASE!!`);
    
}).catch((e)=>{
    console.log(`UNABLE TO CONNECT WITH DATABASE`);
})

