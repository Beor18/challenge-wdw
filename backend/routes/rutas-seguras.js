const express = require('express');
const router = express.Router();

const domainController = require('../controllers/domain.controller');
const perfilController = require('../controllers/perfil.controller');

router.route('/perfil')
    .get(perfilController.getPerfil);

// Ruta /productos
router.route('/domain')
    .get(domainController.getDomain)
    .post(domainController.postDomain);

// Rutas /productos/:id
router.route('/domain/:id')
    .get(domainController.getDomainPorId)
    .put(domainController.updateDomain)
    .delete(domainController.deleteDomain);

module.exports = router;