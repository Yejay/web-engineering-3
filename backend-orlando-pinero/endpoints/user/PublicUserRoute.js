var express = require('express');
var router = express.Router();

var UserService = require("./UserService");

router.get('/', function (req, res) {
    UserService.getUsers(function (err, result) {
        if (result) {
            res.status(200).send(Object.values(result))
        } else {
            res.status(400).json("Fehler")
        }
    })
})

router.get('/:userID', function (req, res) {
    UserService.findUserBy(req.params.userID, function (err, result) {
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).json(err)
        }
    })
})

router.post('/', function (req, res) {
    UserService.createUser(req.body, function (err, result) {
        if (result) {
            res.status(201).send(result)
        } else {
            res.status(400).json(err)
        }
    })
})

router.delete("/:userID", function (req, res) {
    UserService.deleteUser(req.params, function (err, result) {
        if (result) {
            res.status(204).send(result)
        } else {
            res.status(400).json(err)
        }
    })
})

router.put("/:userID", function (req, res) {
    UserService.updateUser(req.params, req.body, function (err, result) {
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).json(err)
        }
    })
})

module.exports = router;