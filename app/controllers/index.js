const   express = require('express');
const   session = require('express-session');
const  mongoose = require('mongoose');
const    router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

module.exports.getIndex = (req, res, next)=>{

    res.render('/',{
     
    });

};


