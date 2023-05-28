var express = require("express")
var router = express.Router()

var authenticationService = require('./authenticationService')

router.get('/', function (req, res) {
    authenticationService.createSessionToken(req.headers.authorization, function (err, token, username) {
        if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
            res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
            return res.status(401).json({ Error: 'Missing Authorization Header Gib die daten' });
        }
        if (!username) {
            return res.status(401).json({ Error: 'Invalid Authentication Credentials' });
        } else {
            res.setHeader("Authorization", "Bearer " + token);
            return res.status(200).json({ Success: "Valid Authentication Credentials" })
        }
    })
})

module.exports = router;
