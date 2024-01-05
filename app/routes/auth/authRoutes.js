const express = require('express');
const router = express.Router();
const PassportConfig  =  require('../../../config/passport')
const controladorUsuario = require('../../controllers/user');

router.get('/logout', PassportConfig.estaAutenticado, controladorUsuario.logout);

module.exports = router;