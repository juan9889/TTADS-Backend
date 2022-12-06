const sequelize = require('../database/database.js')
const user = sequelize.models.user
const jwt = require('jsonwebtoken')

const hasClaim = async (req, res, next) => {
    try {
      const token_bearer = req.header('authorization')
      const token = token_bearer.substring(7, token_bearer.length)
      if (!token) {
        return next('No token found')
      }
      const verify = jwt.verify(token, 'secreto_para_hacer_tokens_asdfgh')
      //console.log('SELECTED CLAIM ::::: '+claim)
      /*if (Date.now() >= verify.exp * 1000){
        console.log(verify.exp + ' > ' + Date.now() +'??')
        return next('Token expired')
      }*/
      
      if(verify.isAdmin==true){
      next()
      }else{
        return next('Not admin')
      }
    } catch (error) {
      return next(error)
    }
  }

module.exports = hasClaim