const User = require('../models/User');
const gravatar = require('gravatar');
const passport = require('passport');
const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)

async function getProfile(req, res, next) {
    try {
        return res.status(200).json({
            id: req.user.id,
            name: req.user.name,
            role: req.user.role,
            avatar: req.user.avatar,
            email: req.user.email,
            token: req.query.secret_token,
            productos_url: '/api/domain'
        });
    } catch (err) {
        log.error('Ups Hubo un error! ' + err);
    }
}

module.exports = {
    getProfile
};