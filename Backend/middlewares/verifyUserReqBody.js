const User = require('../model/user.model');
const constants = require('../utils/constants');

const validateUserRequestBody = async (req,res,next)=>{

  if(!req.body.name){
    res.status(400).send({
      message:'Name is not present'
    })
    return;
  }

  if(!req.body.userId){
    res.status(400).send({
      message:'UserId is not present'
    })
    return;
  }
  const user = await User.findOne({userId:req.body.userId});
  if(user!= null){
    res.status(400).send({
      message:'UserId is already present'
    })
    return;
  }

  if(!req.body.password){
    res.status(400).send({
      message:'Password is not present'
    })
    return;
  }

  if(!req.body.email){
    res.status(400).send({

      message:'Email is not present'
    })
    return;
  }

  const users = await User.findOne({email:req.body.email});
  if(users!=null){
    res.status(400).send({
      message:'Email is already present'
    })
    return;
  }

  //  Validation for userType
  const possibleUserTypes = [constants.userTypes.customer,constants.userTypes.engineer,constants.userTypes.admin];

  if(req.body.userType  && !possibleUserTypes.includes(req.body.userType)){
    res.status(400).send({
      message:'UserType passed is invalid !... Please correct and re-try'
    })
    return;
  }


   next();
}

const validateUserStatusAndType = async(req,res,next)=>{
  // Validate user type
  const userType= req.body.userType;
  const possibleUserTypes = [constants.userTypes.customer,constants.userTypes.engineer,constants.userTypes.admin];

  if(userType && !possibleUserTypes.includes(userType)){
    res.status(400).send({
      message:'UserType passed is invalid !... Please correct and re-try...... Possible values CUSTOMER, ENGINEER , ADMIN'
    })
    return;
  }


  // Validate user status
   const userStatus = req.body.userStatus;
   const possibleUserStatus = [constants.userStatus.approved, constants.userStatus.pending, constants.userStatus.blocked];

   if(userStatus && !possibleUserStatus.includes(userStatus)){
    res.status(400).send({
      message:`UserStatus passed is invalid !  please correct and re-try .... Possible values 
      APPROVED, PENDING, BLOCKED`
    })
    return;
   }

  next();
}

module.exports=({
  validateUserRequestBody :validateUserRequestBody,
  validateUserStatusAndType :validateUserStatusAndType
})