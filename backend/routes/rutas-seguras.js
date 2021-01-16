const express = require('express');
const router = express.Router();

const domainController = require('../controllers/domain.controller');
const perfilController = require('../controllers/perfil.controller');

router.route('/perfil')
    .get(perfilController.getPerfil);

// Ruta /domain
router.route('/domain')
    .get(domainController.getDomain)
    .put(domainController.updateDomain)
    .post(domainController.postDomain);


module.exports = router;