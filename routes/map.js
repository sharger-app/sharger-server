  
// const router = require('express').Router();
// let map = require('../models/owner');

// router.get('/', function (req, res) {
//     res.send('maps home page');
//   })

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('maps home page');
});

module.exports = router;
