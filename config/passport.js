const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Usuario = require('../app/models/Usuarios');

passport.serializeUser((usuario, done ) => {

  done(null, usuario._id);

})

passport.deserializeUser((id, done)=>{

  Usuario.findById(id,(err, usuario)=>{
    done(err, usuario);
  })

})

passport.use(new LocalStrategy(
  {usernameField:'email'},
  async (email,password, done) => {

   await Usuario.findOne({email},( err, usuario ) => {

      if(!usuario ){
        return done(null, false, {message: `Este email: ${email} no esta registrado` });
      } else {

        usuario.compararPassword(password, (err, sonIguales) => {

            if(sonIguales){
                return done(null, usuario);
            } else {
                return done(null, false, {message:'La contraseña no es válida'});
            }

        })

      }

    })

  }
))

exports.estaAutenticado = (req, res, next ) => {

    if ( req.isAuthenticated() ) {

        return next() ;

    }
    res.redirect('/');

}
