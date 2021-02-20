var express = require('express');
const user = require('../models/user');
var router = express.Router();


//Input Validation
// const validateRegisterInput = require("../validation/register");
// const validateLoginInput = require("../validation/login");

// User model
const User = require("../models/user")

router.post("/register", (req, res) => {
  
  // res.send('rila is bear');
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check the validation 
  if(!isValid){
    return res.status(400).json(errors);
  }

  User.findOne({email: req.body.email}).then(user=>{

  });
});

module.exports = router;
