var express = require('express');
var router = express.Router();
const { checkToken, isAdministrator } = require("../utils/AuthenticationUtils")
var jwt = require('jsonwebtoken')
var config = require('config')


var DegreeCourseAppService = require("./DegreeCourseAppService");
var DegreeCourseService = require("../publicDegreeCourse/DegreeCourseService");
var UserService = require("../user/UserService")

router.get('/', checkToken, isAdministrator, function (req, res) {
    DegreeCourseAppService.getDegreeCourseApps(req.query, function (err, result) {
        if (result) {
            var allDegreeCourseApps = [];
            Object.values(result).forEach(degreeCourseApp => {
                const { id, applicantUserID, targetPeriodYear, degreeCourseID, targetPeriodShortName, ...partialObject } = degreeCourseApp;
                allDegreeCourseApps.push({ id, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName })
            })
            res.status(200).send(Object.values(allDegreeCourseApps))
        } else {
            res.status(400).json(err)
        }
    })
})

router.get('/myApplications/', checkToken, function (req, res) {
    if (req.payload) {
        const token = req.headers.authorization.split(' ')[1]
        var applicantUserIDfromToken = jwt.verify(token, config.get("session.tokenKey")).userID
        req.body.applicantUserID = applicantUserIDfromToken
        DegreeCourseAppService.getUsersDegreeCourseApps(applicantUserIDfromToken, function (err, result) {
            if (result) {
                var allMyDegreeCourseApps = [];
                Object.values(result).forEach(degreeCourseApp => {
                    const { id, applicantUserID, targetPeriodYear, degreeCourseID, targetPeriodShortName, ...partialObject } = degreeCourseApp;
                    allMyDegreeCourseApps.push({ id, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName })
                })
                res.status(200).send(Object.values(allMyDegreeCourseApps))
            } else {
                res.status(400).json(err)
            }
        })
    } else {
        res.status(400).json(err)
    }
})

router.post('/', checkToken, function (req, res) {
    if (req.payload) {
        DegreeCourseService.getOneDegreeCourse(req.body.degreeCourseID, function (err, course) {
            if (err) {
                res.status(400).json({ Error: "DegreeCourse doesn't exist" })
            } else if (req.payload.isAdministrator && course) {
                UserService.findUserBy(req.body.applicantUserID, function (err, user) {
                    if (err) {
                        res.status(400).json({ Error: "User doesn't exist" })
                    } else if (user) {
                        DegreeCourseAppService.createDegreeCourseApp(req.body, function (err, result) {
                            if (err) {
                                res.status(400).json(err)
                            } else if (result) {
                                const { id, applicantUserID, targetPeriodYear, degreeCourseID, targetPeriodShortName, ...partialObject } = result;
                                var subset = { id, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName }
                                res.status(201).send(subset)
                            } else {
                                res.status(400).json({ Error: "Problems by creating DegreeCourseApplication" })
                            }
                        })
                    } else {
                        res.status(400).json(err)
                    }
                })
            } else if (!req.payload.isAdministrator) {
                if(req.body.applicantUserID) {
                    res.status(403).json({Error: "You are not permitted to create applications for other users"})
                    return
                }
                const token = req.headers.authorization.split(' ')[1]
                var applicantUserIDfromToken = jwt.verify(token, config.get("session.tokenKey")).userID
                req.body.applicantUserID = applicantUserIDfromToken
                DegreeCourseAppService.createDegreeCourseApp(req.body, async function (err, result) {
                    if (err) {
                        res.status(400).json(err)
                    } else if (result) {
                        const { id, applicantUserID, targetPeriodYear, degreeCourseID, targetPeriodShortName, ...partialObject } = result;
                        var subset = { id, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName }
                        res.status(201).send(subset)
                    } else {
                        res.status(400).json(err)
                    }
                })
            } else {
                res.status(400).json({ Error: "Problems by creating DegreeCourseApplication" })
            }
        })
    } else {
        res.status(400).json({ Error: "Payload is missing" })
    }
})

router.delete("/:_id", checkToken, isAdministrator, function (req, res) {
    DegreeCourseAppService.deleteDegreeCourseApp(req.params._id, function (err, result) {
        if (result) {
            res.status(204).send(result)
        } else {
            res.status(400).json(err)
        }
    })
})

router.put("/:_id", checkToken, function (req, res) {
    DegreeCourseAppService.updateDegreeCourseApp(req.params._id, req.body, function (err, result) {
        if (result) {
            const { id, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName, ...partialObject } = result;
            var subset = { id, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName }
            res.status(201).send(subset)
        } else {
            res.status(400).json(err)
        }
    })
})

module.exports = router;