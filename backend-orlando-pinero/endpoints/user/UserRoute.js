var express = require('express');
var router = express.Router();
const { checkToken, isAdministrator } = require("../utils/AuthenticationUtils")

var UserService = require("./UserService");

router.get('/', checkToken, isAdministrator, function (req, res) {
    UserService.getUsers(function (err, result) {
        if (result) {
            var allUsers = [];
            Object.values(result).forEach(user => {
                const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = user;
                allUsers.push({ id, userID, firstName, lastName, isAdministrator })
            })
            res.status(200).send(Object.values(allUsers))
        } else {
            res.status(400).json(err)
        }
    })
})

router.get('/:userID', checkToken, isAdministrator, function (req, res) {
    if (req.payload) {
        UserService.findUserBy(req.params.userID, function (err, result) {
            if (result) {
                const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = result;
                const subset = { id, userID, firstName, lastName, isAdministrator };
                res.status(200).send(subset)
            } else {
                res.status(400).json({ Error: "User not found" })
            }
        })
    } else {
        res.status(400).json({ Error: "User not found" })
    }
})

router.post('/', checkToken, isAdministrator, function (req, res) {
    UserService.createUser(req.body, function (err, result) {
        if (result) {
            const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = result;
            const subset = { id, userID, firstName, lastName, isAdministrator };
            res.status(201).send(subset)
        } else {
            res.status(400).json(err)
        }
    })
})

router.delete("/:userID", checkToken, isAdministrator, function (req, res) {
    UserService.deleteUser(req.params, function (err, result) {
        if (result) {
            const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = result;
            const subset = { id, userID, firstName, lastName, isAdministrator };
            res.status(204).send(subset)
        } else {
            res.status(400).json(err)
        }
    })
})

router.put("/:userID", checkToken, isAdministrator, function (req, res) {
    UserService.updateUser(req.params, req.body, function (err, result) {
        if (result) {
            const { id, userID, firstName, lastName, isAdministrator, ...partialObject } = result;
            const subset = { id, userID, firstName, lastName, isAdministrator };
            res.status(200).send(subset)
        } else {
            res.status(400).json(err)
        }
    })
})

module.exports = router;