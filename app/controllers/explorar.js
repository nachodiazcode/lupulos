const   express = require('express');
const   session = require('express-session');
const    router = express.Router();
const   Usuario = require('../models/user');

module.exports = function (app) {
    app.use('/', router);
};


module.exports.getExplorar = (req, res) => {

    res.render('explorar', {users: []});

}

module.exports.postExplorar = (req, res ) => {
     const query = req.body.query ;

     Usuario.find({username: new RegExp(`.*${query}.*`, 'i')})
          .select('_id username biografia email')
          .then((users) => {
               res.render('explorar', {users}) ;
          })
}