
//Librería
const   express   = require('express');
const   session = require('express-session');
const    router = express.Router();

module.exports = function (app) {
     app.use('/', router);
 };
 
router.post('components/nav', (req,res)=>{

     res.render('nav',{
          usuario:req.user.username
     })    
     
});
     