const express = require('express');
const router = express.Router();
const controladorUsuario = require('../../controllers/user');

router.get('/signup', controladorUsuario.postSignUp);

module.exports = router;