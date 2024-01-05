const express = require('express');
const router = express.Router();
const controladorUsuario = require('../../controllers/user');

router.get('/signin', controladorUsuario.postLogin);

module.exports = router;