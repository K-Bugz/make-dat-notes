const express = require('express');
const path = require('path');
const router = express.Router();

// need to path these requests to html page when landing on the app
// get home page '/'
// get notes page '/notes'
// set wildcard with "*" if they try and search for anything relative 