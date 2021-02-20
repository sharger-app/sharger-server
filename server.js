const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config()
const uri = process.env.mongoose;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });