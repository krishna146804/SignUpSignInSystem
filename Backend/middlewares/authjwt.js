const jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');8
const User = require('../model/user.model');
const constants = require('../utils/constants');

const varifyToken = async(req,res,next)=>{

  const token = req.headers['x-access-token'];

  if(!token){
    res.status(403).send({
      message:'Token is not provided'
    })
    return;
  }
  jwt.verify(token,config.secret,(err,decoded)=>{
    if(err){
      res.status(401).send({
        message:'Unauthorized !... Invalid token'
      })
      return;
    }
    req.userId = decoded.id;
    
    next();
  })

  
}

const isAdmin = async(req,res,next)=>{
  // Find the user type from the user Id
  const user =  await User.findOne({userId:req.userId});
  if(user && user.userType == constants.userTypes.admin){
    next();
  } else {
    res.status(403).send({
      message:'only admin role is allowed to access to this APIs'
    });
  }
}

module.exports={
  varifyToken:varifyToken,
  isAdmin:isAdmin
}