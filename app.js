
//librerías 
const express  = require('express')
const session  = require('express-session')
const MongoStore  = require('connect-mongo')(session)
const glob  = require('glob')
const mongoose  = require('mongoose')
const bodyParser  = require('body-parser')
const passport  = require('passport')
const multer  = require('multer')
const flash = require('express-flash')
const path = require('path')

//Archivos
const config   = require('./config/config')
const PassportConfig   = require('./config/passport')

//Controladores 

const controladorAgregar = require('./app/controllers/agregar')
const controladorInicio =  require('./app/controllers/inicio')
const controladorLugares =  require('./app/controllers/lugares')
const controladorIndex =  require('./app/controllers/index')
const controladorUsuario =  require('./app/controllers/usuarios')
const controladorPerfil =  require('./app/controllers/perfil')
const controladorExplorar =  require('./app/controllers/explorar')

//Conectar a MongoDB
const mongo_url  = "mongodb://127.0.0.1:27017/lupulos"
  
const app = express()

mongoose.Promise = global.Promise
mongoose.connect(mongo_url)
mongoose.connection.on('error', (err) => {

  throw err 
  process.exit(1)

})

app.use(flash())

mongoose.connect(config.db)

let db = mongoose.connection
db.on('error', () => {
  throw new Error('unable to connect to database at ' + config.db)
})

let models = glob.sync(config.root + '/app/models/*.js')
models.forEach( (model) => {
  require(model)
})

app.use(session({
  secret:'ESTO ES SECRETO',
  resave:true,
  saveUninitialized: true,
  store: new MongoStore({
      url: mongo_url,
      autoReconnect: true
  })
}))

app.use(passport.initialize())
app.use(passport.session())
//bodyParser nos ayuda a traernos una información y transformarla a JSON
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use((req,res,next)=>{
  res.locals.user = req.user  
  next()
})

//utilizamos multer para subir imágenes 
const storage = multer.diskStorage({
	destination: function(req,file,next) {
		next(null, './public/upload/')
	},

	filename: function(req, file, next) {
		next(null, file.originalname)
	}

})

const upload = multer ({ storage : storage }) 


//Agregarmos las cervezas
app.post('/agregar', upload.single('imagen') ,controladorAgregar.postAgregar)

//Obtenemos las cervezas
app.get('/cerveza/:item', controladorInicio.getDetallesCervezas)

app.get('/index', controladorIndex.getIndex)
app.get('/inicio', PassportConfig.estaAutenticado, controladorInicio.getInicio)

//Registramos un usuario
app.get('/signup', controladorUsuario.postSignUp)
app.get('/login', controladorUsuario.postLogin)
app.get('/logout', PassportConfig.estaAutenticado, controladorUsuario.logout)

//Lugares
app.get('/lugares',  PassportConfig.estaAutenticado, controladorLugares.getLugares)
app.get('/lugar/:item', PassportConfig.estaAutenticado, controladorLugares.getDetalleDelLugar)

//Perfil
app.get('/mi/perfil',  PassportConfig.estaAutenticado, controladorPerfil.getMiPerfil, controladorInicio.getDetallesCervezas)
app.get('/perfil/:id', controladorPerfil.getPerfil)

//Seguir usuarios
app.get('/seguir/:id', PassportConfig.estaAutenticado, controladorPerfil.seguir)
app.get('/unseguir/:id', PassportConfig.estaAutenticado, controladorPerfil.unseguir)

//Buscar Usuarios
app.get('/explorar',  PassportConfig.estaAutenticado, controladorExplorar.getExplorar)
app.post('/explorar',  PassportConfig.estaAutenticado, controladorExplorar.postExplorar)

require('./config/express')(app, config)

let server = app.listen(config.port, () => {
  console.log('Express server listening on port ' + config.port)
})

