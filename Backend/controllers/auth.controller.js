const User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
const config = require('../configs/auth.config');


/**
 * 
 * Logic to the signup - Customer (A) / Engineer (P) / Admin (P)
 */


exports.signup = async (req,res)=>{


  let userStatus = req.body.userStatus;

  if(!req.body.userType || req.body.userType == constants.userTypes.customer){
    userStatus = constants.userStatus.approved; 
  }else{
    userStatus = constants.userStatus.pending;
  }
   
  const userobj = {
    name:req.body.name,
    userId:req.body.userId,
    password:bcrypt.hashSync(req.body.password,8),
    email:req.body.email,
    userType:req.body.userType,
    userStatus:userStatus,

  }
  

  try{
      const userCreated = await User.create(userobj);
      const postCreated = {
        name:userCreated.name,
        userId:userCreated.userId,
        email:userCreated.email,
        userType:userCreated.userType,
        userStatus:userCreated.userStatus,
        userCreatedAt:userCreated.createdAt,
        userUpdatedAt:userCreated.updatedAt

      }
      res.status(201).send(postCreated)
  }
  catch(err){
    console.log('Error in crating user',err);
    res.status(500).send({
      message:'Error in creating user'
    })
  }
}

exports.signin = async(req,res)=>{

  /**
   * check if the user is pressent  - if not return 400
   */

  /**
   * check if the password is valid - if not return 401
   */

  /**
   * check if the status is approved 
   */

  /**
   * generate the JWT signed token and will return that
   */
  
  const user = await User.findOne({userId:req.body.userId});
  if (user==null){
    res.status(400).send({
      message:`User Id passed:${req.body.userId} is not found`
    })
    return;
  }

  if(user.userStatus != constants.userStatus.approved){
    res.status(400).send({
      message:`can not allow the login ass the user status is not approved:Current status:${user.userStatus}`
    })
    return;
  }


const passwordIsValid = bcrypt.compareSync(req.body.password,user.password);
if (!passwordIsValid){
  res.status(401).send({
    message:'Invalid password'
  })
  return;
}

const token = jwt.sign({id:user.userId},config.secret,{
  expiresIn:60
});
 return res.status(200).send({
  name:user.name,
  userId:user.userId,
  email:user.email,
  userType:user.userType,
  userStatus:user.userStatus,
  accessToken:token
}) }