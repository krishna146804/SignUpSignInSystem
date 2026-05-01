const express = require('express');
const route=express.Router();
const authController = require('../controllers/auth.controller');
const verifyUserReqBody = require('../middlewares/verifyUserReqBody');

route.post('/auth/signup',[verifyUserReqBody.validateUserRequestBody],authController.signup);

route.post('/auth/signin',authController.signin);

module.exports=route;