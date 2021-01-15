const { Domain } = require('../models/Domain');
const passport = require('passport');

const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)


async function getDomain(req, res, next) {
    try {
        let perPage = req.query.perPage || 9;
        perPage = Number(perPage);

        let page = req.query.page || 1;
        page = Number(page);

        await Domain
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, domain) => {
                Domain.countDocuments((err, count) => {
                    if (err) return next(err);
                    res.status(200).json({
                        status: 'Api funcionando',
                        domain,
                        total: count,
                        resultados: perPage
                    });
                });
            });
    } catch (err) {
        log.error('Ups hubo un error al mostrar las peliculas! ' + err);
    }
}

async function getDomainPorId(req, res) {
    try {
        await Domain.findById(req.params.id, function(err, domain) {
            if (domain === null) {
                return res.status(404).json({mensaje: 'Dominio no encontrado!'});
            }else {
                res.status(200).json({
                    status: 'Api funcionando',
                    domain
                });
            }
        });
    } catch (err) {
        log.error('Ups hubo un error al mostrar la Pelicula! ' + err);
    }
}

async function updateDomain(req, res) {
    try {
        const { id } = req.params;
        await Domain.update({ _id: id }, req.body);
        res.status(200).json('Dominio Modificado con éxito!')
        log.warn('Dominio Modificado con éxito!');
    } catch (err) {
        log.error('Ups hubo un error al modificar la pelicula! ' + err);
    }

}

async function postDomain(req, res) {
    try {
        const domain = new Domain({
            name: req.body.name,
            description: req.body.description,
            link: req.body.link,
            seen: req.body.seen,
        });
        await domain.save(() => {
            res.status(201).json("Dominio agregado con éxito!");
            log.info("Dominio agregado con éxito!");
        });
    } catch (err) {
        log.error('Ups hubo un error al agregar la pelicula! ' + err);
    }
}

async function deleteDomain(req, res) {
    try {
        await Domain.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return res.send(err);
            } else {
                res.status(200).json('Dominio Borrada con éxito!');
                log.error('Dominio Borrada con éxito!')
            }
        });
    } catch (err) {
        log.error('Ups hubo un error al borrar la pelicula! ' + err);
    }
}

module.exports = {
    getDomain,
    getDomainPorId,
    updateDomain,
    postDomain,
    deleteDomain,
};