const path = require('path');
const express = require('express');
const           session  = require('express-session');
const        MongoStore  = require('connect-mongo');
const            config  = require('./config/config');
const              glob  = require('glob');
const          mongoose  = require('mongoose');
const        bodyParser  = require('body-parser');
const    PassportConfig  = require('./config/passport');
const          passport  = require('passport');
const            multer  = require('multer');
//MongoDB
const         mongo_url  = "mongodb://127.0.0.1:27017/lupulos";
//Conectando a express
const app = express();

mongoose.connect(mongo_url)
  .then(() => {
    console.log('Conexión exitosa');
    // Additional code here
  })
  .catch(error => {
    console.error('Error de conexión:', error.message);
  });

  mongoose.set('strictQuery', false);

let db = mongoose.connection;
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db);
});

let models = glob.sync(config.root + '/app/models/*.js');
models.forEach( (model) => {
  require(model);
});

app.use(session({
  secret: 'ESTO ES SECRETO',
  resave: true,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: mongo_url, // Asegúrate de proporcionar la URL correcta a MongoDB
    ttl: 14 * 24 * 60 * 60, // tiempo de vida opcional de la sesión en segundos
    autoRemove: 'native' // opción para limpieza automática de sesiones caducadas
  })
}));

app.use(passport.initialize());
app.use(passport.session());
//bodyParser nos ayuda a traernos una información y transformarla a JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  res.locals.user = req.user  ;
  next();
})

//utilizamos multer para subir imágenes 
const storage = multer.diskStorage({
	destination: function(req,file,next) {
		next(null, './public/upload/');
	},

	filename: function(req, file, next) {
		next(null, file.originalname);
	}

});

app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'pug');

const upload = multer ({ storage : storage }) ;

// ****** RUTAS ********** //

const controladorUsuario =  require('./app/controllers/user');

app.get('/signup', controladorUsuario.postSignUp);
app.get('/login', controladorUsuario.postLogin);
app.get('/logout', PassportConfig.estaAutenticado, controladorUsuario.logout);


//Agragamos las cervezas !!!!!
const controladorAgregar = require('./app/controllers/agregar');
app.post('/agregar', upload.single('imagen') ,controladorAgregar.postAgregar);

const controladorIndex =  require('./app/controllers/index');
app.get('/index',  controladorIndex.getIndex);

//ControladorInicio
const controladorInicio =  require('./app/controllers/inicio');
app.get('/inicio', PassportConfig.estaAutenticado, controladorInicio.getInicio);
app.get('/cerveza/:item', controladorInicio.getDetallesCervezas);

//ControladorLugares
const controladorLugares =  require('./app/controllers/lugares');
app.get('/lugares',  PassportConfig.estaAutenticado, controladorLugares.getLugares);
app.get('/lugar/:item', PassportConfig.estaAutenticado, controladorLugares.getDetalleDelLugar);

//ControladorEventos
const controladorEventos =  require('./app/controllers/eventos');
app.get('/eventos', PassportConfig.estaAutenticado, controladorEventos.getEventos);

//ControladorComunidad
const controladorComunidad=  require('./app/controllers/comunidad');
app.get('/comunidad', PassportConfig.estaAutenticado, controladorComunidad.getComunidad);

//ControladorPerfil
const controladorPerfil =  require('./app/controllers/perfil');
app.get('/mi/perfil',  PassportConfig.estaAutenticado, controladorPerfil.getMiPerfil, controladorInicio.getDetallesCervezas);
app.get('/perfil/:id', controladorPerfil.getPerfil);
app.get('/seguir/:id', PassportConfig.estaAutenticado, controladorPerfil.seguir);
app.get('/unseguir/:id', PassportConfig.estaAutenticado, controladorPerfil.unseguir);

//ControladorExplorar : Donde explorar a los distintos usuarios
const controladorExplorar=  require('./app/controllers/explorar');
app.get('/explorar',  PassportConfig.estaAutenticado, controladorExplorar.getExplorar);
app.post('/explorar', PassportConfig.estaAutenticado, controladorExplorar.postExplorar);

const controladorBlog = require('./app/controllers/blog');
app.get('/blog',  PassportConfig.estaAutenticado, controladorBlog.getBlog);

const controladorPrensa = require('./app/controllers/prensa');
app.get('/prensa', PassportConfig.estaAutenticado, controladorPrensa.getPrensa);

const controladorPrivacidad = require('./app/controllers/privacidad');
app.get('/privacidad',  PassportConfig.estaAutenticado, controladorPrivacidad.getPrivacidad);

app.get('/logout', (req, res) => {
  req.logout(); // Cierra la sesión del usuario
  res.redirect('/'); // Redirige a la página principal o a donde desees después del logout
});

require('./config/express')(app, config);

let server = app.listen(config.port, () => {
  console.log('Express server listening on port ' + 8000);
});

