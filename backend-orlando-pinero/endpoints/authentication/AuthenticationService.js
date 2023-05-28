var UserService = require('../user/UserService')
var jwt = require('jsonwebtoken')
var config = require('config')

function createSessionToken(header, callback) {

    const base64Credentials = header.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [userID, password] = credentials.split(':');


    if (!userID || !password) {
        callback("Insert credentials", null, null)
        return;
    }

    UserService.findUserBy(userID, function (error, user) {
        if (user) {
            user.comparePassword(password, function (err, isMatch) {
                if (err) {
                    callback(err, null);
                } else {
                    if (isMatch) {

                        var issuedAt = new Date().getTime();
                        var expirationTime = config.get("session.timeout");
                        var expiresAt = issuedAt + (expirationTime * 1000);
                        var privateKey = config.get("session.tokenKey");
                        var token = jwt.sign({ "userID": user.userID, "isAdministrator": user.isAdministrator }, privateKey, { expiresIn: expiresAt, algorithm: "HS256" });

                        callback(null, token, user);
                    } else {
                        callback(err, null);
                    }
                }
            })
        } else {
            callback("Did not find user", null);
        }
    })
}

module.exports = {
    createSessionToken
}
