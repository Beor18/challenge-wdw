const { Domain } = require("../models/Domain");
const passport = require("passport");

const { getLogger } = require("@jwt/utils");
const log = getLogger(__dirname, __filename);

let contador = 0;

async function getDomain(req, res, next) {
  try {
    let perPage = req.query.perPage || 9;
    perPage = Number(perPage);

    let page = req.query.page || 1;
    page = Number(page);

    await Domain.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec((err, domain) => {
        Domain.countDocuments((err, count) => {
          if (err) return next(err);
          res.status(200).json({
            status: "Api funcionando",
            domain,
            total: count,
            resultados: perPage,
          });
        });
      });
  } catch (err) {
    log.error("Ups hubo un error al mostrar el dominio! " + err);
  }
}

async function getDomainPorId(req, res) {
  try {
    await Domain.findById(req.params.id, function (err, domain) {
      if (domain === null) {
        return res.status(404).json({ mensaje: "Dominio no encontrado!" });
      } else {
        res.status(200).json({
          status: "Api funcionando",
          domain,
        });
      }
    });
  } catch (err) {
    log.error("Ups hubo un error al mostrar el dominio! " + err);
  }
}

async function updateDomain(req, res) {
  try {
    const { link } = req.query;
    const findDomain = {link: link};
    
    await Domain.findOneAndUpdate(findDomain, { seen: contador++})
    res.status(200).json("Dominio Modificado con éxito!");
    log.warn("Dominio Modificado con éxito!");
  } catch (err) {
      res.status(500).json("Error")
    log.error("Ups hubo un error al modificar el dominio! " + err);
  }
}

async function postDomain(req, res) {
  try {
    const link = req.query.link;

    const domain = new Domain({
      name: req.body.name,
      description: req.body.description,
      link: req.query.link,
      seen: 0,
    });

    if (link) {
      await domain.save(() => {
        res.status(201).json("Dominio agregado con éxito!");
        log.info("Dominio agregado con éxito!");
      });
    } else {
      res.status(400).json("Falta parametro link");
    }
  } catch (err) {
    log.error("Ups hubo un error al agregar el dominio! " + err);
  }
}

async function deleteDomain(req, res) {
  try {
    await Domain.findByIdAndRemove(req.params.id, (err) => {
      if (err) {
        return res.send(err);
      } else {
        res.status(200).json("Dominio Borrado con éxito!");
        log.error("Dominio Borrado con éxito!");
      }
    });
  } catch (err) {
    log.error("Ups hubo un error al borrar el dominio! " + err);
  }
}

module.exports = {
  getDomain,
  getDomainPorId,
  updateDomain,
  postDomain,
  deleteDomain,
};
