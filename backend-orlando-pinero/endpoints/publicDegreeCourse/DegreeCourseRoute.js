var express = require('express');
var router = express.Router();
const { checkToken, isAdministrator } = require("../utils/AuthenticationUtils")

var DegreeCourseService = require("./DegreeCourseService");
var DegreeCourseAppService = require("../degreeCourseApplication/DegreeCourseAppService")

router.get('/', checkToken, function (req, res) {
    DegreeCourseService.getDegreeCourses(req.query, function (err, result) {
        if (result) {
            var allCourses = [];
            Object.values(result).forEach(course => {
                const { id, name, shortName, universityName, universityShortName, departmentName, departmentShortName, ...partialObject } = course;
                allCourses.push({ id, name, shortName, universityName, universityShortName, departmentName, departmentShortName })
            })
            res.status(200).send(allCourses)
        } else {
            res.status(400).json(err)
        }
    })
})

router.get('/:_id', checkToken, function (req, res) {
    DegreeCourseService.getOneDegreeCourse(req.params._id, function (err, result) {
        if (result) {
            const { id, name, shortName, universityName, universityShortName, departmentName, departmentShortName, ...partialObject } = result;
            const subset = { id, name, shortName, universityName, universityShortName, departmentName, departmentShortName };
            res.status(200).send(subset)
        } else {
            res.status(400).json(err)
        }
    })
})

router.get('/:_id/degreeCourseApplications', checkToken, isAdministrator, function (req, res) {
    if (req.payload) {
        DegreeCourseAppService.getDegreeCourseApps(req.query, function (err, result) {
            if (result) {
                var allDegreeCourseAppsWithID = [];
                Object.values(result).forEach(degreeCourseApp => {
                    const { id, applicantUserID, targetPeriodYear, degreeCourseID, targetPeriodShortName, ...partialObject } = degreeCourseApp;
                    allDegreeCourseAppsWithID.push({ id, applicantUserID, degreeCourseID, targetPeriodYear, targetPeriodShortName })
                })
                res.status(200).send(Object.values(allDegreeCourseAppsWithID))
            } else if (err) {
                res.status(400).json(err)
            } else {
                res.status(400).json({ Error: "Something went wrong searching for degreeCourseApplications for certain degreeCourse" })
            }
        })
    } else {
        res.status(400).json({ Error: "Payload is missing" })
    }
})

router.post('/', checkToken, isAdministrator, function (req, res) {
    if (req.payload) {
        DegreeCourseService.createDegreeCourse(req.body, function (err, result) {
            if (result) {
                const { id, name, shortName, universityName, universityShortName, departmentName, departmentShortName, ...partialObject } = result;
                const subset = { id, name, shortName, universityName, universityShortName, departmentName, departmentShortName };
                res.status(201).send(subset)
            } else {
                res.status(400).json(err)
            }
        })
    } else {
        res.status(400).json({ Error: "Payload is missing" })
    }
})

router.delete("/:_id", checkToken, isAdministrator, function (req, res) {
    DegreeCourseService.deleteDegreeCourse(req.params._id, function (err, result) {
        if (result) {
            res.status(204).send(result)
        } else {
            res.status(400).json(err)
        }
    })
})

router.put("/:_id", checkToken, isAdministrator, function (req, res) {
    DegreeCourseService.updateDegreeCourse(req.params._id, req.body, function (err, result) {
        if (result) {
            const { id, name, shortName, universityName, universityShortName, departmentName, departmentShortName, ...partialObject } = result;
            const subset = { id, name, shortName, universityName, universityShortName, departmentName, departmentShortName };
            res.status(200).send(subset)
        } else {
            res.status(400).json(err)
        }
    })
})

module.exports = router;