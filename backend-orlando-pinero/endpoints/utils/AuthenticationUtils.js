var jwt = require('jsonwebtoken')
var config = require('config')

function checkToken(req, res, next) {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1]
            var payload = jwt.verify(token, config.get("session.tokenKey"));
        } else {
            res.status(401).json({ Error: "Missing Token: Not Authorized" })
            return
        }
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ Error: "Token is wrong"});
            return
        }
    }
    if (!payload) {
        res.status(400).json({Error: "Payload is missing"})
        return
    }
    req.payload = payload
    return next()
}

function isAdministrator(req, res, next) {
    if (req.payload) {
        if (req.payload.isAdministrator) {
            return next()
        } else {
            res.status(403).send({ Warning: "User not permitted" })
            return
        }
    } else {
        res.status(400).json({Error: "Payload is missing"})
        return
    }
}


module.exports = {
    checkToken,
    isAdministrator
}
