const mongoose = require ('mongoose');
const constants = require('../utils/constants');
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  userId:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:7
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    minlength:10
  },
  userType:{
    type:String,
    enum:[constants.userTypes.customer, constants.userTypes.admin, constants.userTypes.engineer],
    required:true,
    default:constants.userTypes.customer
  },
  userStatus:{
    type:String,
    enum:[constants.userStatus.pending, constants.userStatus.approved, constants.userStatus.blocked],
    default:constants.userStatus.approved,
  }
},{timestamps:true});

module.exports= mongoose.model('user',userSchema);