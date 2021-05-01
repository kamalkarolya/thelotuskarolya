const jwt = require('jsonwebtoken');
const Register = require('../models/register');





  const auth = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const verify = jwt.verify(token, process.env.SECRET_KEY );
        console.log(verify);
        const User = await Register.findOne({_id:verify._id});
        console.log(User);

        req.token = token;
        req.User = User;
        next();
    } catch (e) {
        res.status(401).render('login');
        
    }

    
}

module.exports = auth;