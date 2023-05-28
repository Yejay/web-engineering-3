const { default: mongoose } = require("mongoose");
const DegreeCourse = require("./DegreeCourseModel");

function getDegreeCourses(filter, callback) {
    DegreeCourse.find(filter, function (err, courses) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, courses);
        }
    })
}

function getOneDegreeCourse(id, callback) {
    findDegreeCourseBy({ _id: id }, function (err, courses) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, courses);
        }
    })
}

function createDegreeCourse(requestbody, callback) {
    var query = DegreeCourse.findOne(requestbody)
    query.exec(function (err, course) {
        if (course) {
            return callback({ Error: "DegreeCourse already exists" }, null);
        } else if (requestbody.name == "" || requestbody.universityName == "" || requestbody.departmentName == "") {
            return callback({ Error: "Input not complete" })
        } else {
            DegreeCourse.create(requestbody, function (err, course) {
                if (err) {
                    if (err.name == "ValidationError") {
                        return callback({ Error: "Missing properties" })
                    } else {
                        return callback({ Error: err })
                    }
                }
                if (course) {
                    return callback(null, course)
                } else {
                    return callback({ Error: "Error while creating new DegreeCourse" })
                }
            })
        }
    })
}

async function updateDegreeCourse(searchid, requestbody, callback) {
    var query = DegreeCourse.findOneAndUpdate(searchid, requestbody, { new: true })

    query.exec(function (err, degreeCourse) {
        if (degreeCourse) {
            return callback(null, degreeCourse)

        } else {
            return callback({ Error: "DegreeCourse for id: " + searchid + " not found " + err })
        }
    })
}

function deleteDegreeCourse(searchid, callback) {
    if (!searchid) {
        return callback({ Error: "Missing id" })
    }
    var query = DegreeCourse.findOneAndDelete({ _id: searchid })
    query.exec(function (err, degreeCourse) {
        if (err) {
            return callback({ Error: "DegreeCourse doesn't exist" })
        }
        if (degreeCourse) {
            return callback(null, degreeCourse)
        } else {
            return callback({ Error: "DegreeCourse doesn't exist" + err }, null)
        }
    })
}

function findDegreeCourseBy(searchFor, callback) {

    if (!searchFor) {
        callback({ Error: "query is missing" })
        return
    }
    else {
        var query = DegreeCourse.findOne(searchFor)
        query.exec(function (err, course) {
            if (err) {
                return callback({ Error: "Did not find DegreeCourse for query: " + searchFor }, null);
            } else {
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
    getDegreeCourses,
    findDegreeCourseBy,
    createDegreeCourse,
    deleteDegreeCourse,
    updateDegreeCourse,
    getOneDegreeCourse
}