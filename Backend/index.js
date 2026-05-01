const express = require ('express');

const app = express();

const mongoose = require ('mongoose');
require('dotenv').config();

const User = require('./model/user.model');
const bcrypt = require('bcrypt');

app.use(express.json());


const cors = require('cors');
app.use(cors());

( async() =>{
  try{
    const db= await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');

    /**
     * I need to have a default ADMIN created here from the beginning
     */
    const user = await User.findOne({userId:'admin'});
    if(!user){
         console.log('Admin is not present');
    
        // Let's create a new ADMIN

        const admin = await User.create({
          name:'vishwa',
          userId:"admin",
          email:"kankvishhh@gmail.com",
          userType:"ADMIN",
          password:bcrypt.hashSync('WElcome1',8)
        });
        console.log('Admin created :',admin);
    }
    
    else{
      console.log('Admin user is already present');
    }
    

    

  }
  catch(err){
    console.log('Error connecting to database',err)
  }
})()

// Fetch the Signup route
const auth_route= require('./routes/auth.routes');
app.use('/crm/api/v1',auth_route);


const PORT = process.env.PORT || 3000;

console.log(PORT);
app.listen(PORT,()=>{
  console.log(`Server is running on port ${process.env.PORT}`);

})
