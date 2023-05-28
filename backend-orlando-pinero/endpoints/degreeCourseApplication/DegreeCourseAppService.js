const { default: mongoose } = require("mongoose");
const DegreeCourseApp = require("./DegreeCourseAppModel");
var jwt = require('jsonwebtoken')

function getDegreeCourseApps(filter, callback) {
    DegreeCourseApp.find(filter, function (err, courses) {
        if (err) {
            return callback({ Error: "While searching DegreeCourseApps" }, null);
        } else {
            return callback(null, courses);
        }
    })
}

function getUsersDegreeCourseApps(applicantUserID, callback) {
    DegreeCourseApp.find({ applicantUserID: applicantUserID }, function (err, courses) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, courses);
        }
    })
}

function createDegreeCourseApp(requestbody, callback) {
    var query = DegreeCourseApp.findOne(requestbody)
    query.exec(function (err, degreeCourseApp) {
        if (degreeCourseApp) {
            return callback({ Error: "User has already created an Application for this DegreeCourse at this time" }, null)
        } else if (requestbody.degreeCourseID == "") {
            return callback({ Error: "Input not complete" })
        } else {
            DegreeCourseApp.create(requestbody, function (err, result) {
                if (err) {
                    console.log(err)
                    if (err.name == "ValidationError") {
                        return callback({ Error: "TargetPeriodYear has to be greater or even 2023, and each property needs input" })
                    } else {
                        return callback({ Error: "Missing properties or targetPeriodShortName is wrong" })
                    }
                } else if (result) {
                    if (result.targetPeriodYear < new Date().getFullYear()){
                        return callback({Error: "TargetPeriodYear has to be greater or equals this year"})
                    } else {
                        return callback(null, result)
                    }
                } else {
                    return callback({ Error: "Couldn't create new degreeCourseApp" })
                }
            })
        }
    })
}

function updateDegreeCourseApp(degreeCourseAppID, requestbody, callback) {
    var query = DegreeCourseApp.findOne({ _id: degreeCourseAppID })
    query.exec(async function (err, degreeCourseApp) {
        if (degreeCourseApp) {
            if (requestbody.targetPeriodYear) {
                if (requestbody.targetPeriodYear >= new Date().getFullYear()) {
                    degreeCourseApp.targetPeriodYear = requestbody.targetPeriodYear
                } else {
                    return callback({ Error: "TargetPeriodYear has to be greater or equals this year" })
                }
            }
            degreeCourseApp.targetPeriodYear = requestbody.targetPeriodYear ? requestbody.targetPeriodYear : degreeCourseApp.targetPeriodYear
            degreeCourseApp.targetPeriodShortName = requestbody.targetPeriodShortName ? requestbody.targetPeriodShortName : degreeCourseApp.targetPeriodShortName
            await degreeCourseApp.save()
            return callback(null, degreeCourseApp)
        } else if (err) {
            return callback({ Error: "DegreeCourseApplication for id: " + degreeCourseAppID + " not found: " })
        }
    })
}

function deleteDegreeCourseApp(degreeCourseAppID, callback) {
    var query = DegreeCourseApp.findOneAndDelete({ _id: degreeCourseAppID })
    query.exec(function (err, degreeCourseApp) {
        if (degreeCourseApp) {
            return callback(null, degreeCourseApp)
        } else {
            return callback({ Error: "DegreeCourseApplication with ID " + degreeCourseAppID + "doesn't exist " }, null)
        }
    })
}


function findDegreeCourseAppBy(searchFor, callback) {
    if (!searchFor) {
        callback({ Error: "Filter is missing" })
        return
    }
    else {
        var query = DegreeCourseApp.findOne(searchFor)
        query.exec(function (err, course) {
            if (err) {
                return callback({ Error: "Did not find DegreeCourseApp for query: " + searchFor }, null);
            }
            else {
                if (course) {
                    callback(null, course);
                }
                else {
                    callback({ Error: "Could not find DegreeCourse for given filter" }, null);
                }
            }
        });
    }
}

module.exports = {
    getDegreeCourseApps,
    findDegreeCourseAppBy,
    createDegreeCourseApp,
    deleteDegreeCourseApp,
    updateDegreeCourseApp,
    getUsersDegreeCourseApps
}