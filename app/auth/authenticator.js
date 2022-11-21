const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const isAuthenticated = async (req,res,next)=>{
    try {
        var token_bearer = req.header('authorization');
        var token = token_bearer.substring(7, token_bearer.length);
        if(!token){
            return next('Please login to access the data');
        }
        const verify = await jwt.verify(token,"secreto_para_hacer_tokens_asdfgh");
        req.user = await userModel.findOne({
            where: {
             id: verify.id
            }
          })
        next();
    } catch (error) {
       return next(error); 
    }
}

module.exports = isAuthenticated;