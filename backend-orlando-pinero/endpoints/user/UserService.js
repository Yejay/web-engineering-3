const { default: mongoose } = require("mongoose");
const User = require("./UserModel");
var jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

function getUsers(callback) {
    User.find(function (err, users) {
        if (err) {
            return callback(err, null);
        } else {
            return callback(null, users);
        }
    })
}

function createUser(requestbody, callback) {
    var query = User.findOne({ userID: requestbody.userID })
    query.exec(function (err, user) {
        if (user) {
            return callback({ Error: "user with userID: " + requestbody.userID + " already exists" });
        } else if (requestbody.lastName == "" || requestbody.firstName == "") {
            return callback({ Error: "Input not complete" })
        } else {
            User.create(requestbody, function (err, user) {
                if (err) {
                    if (err.name == "ValidationError") {
                        return callback({ Error: "Missing properties" })
                    }
                }
                if (user) {
                    return callback(null, user)
                } else {
                    return callback(null, "Error while creating new user")
                }
            })
        }
    })
}

function updateUser(searchUserID, requestbody, callback) {
    var query = User.findOne(searchUserID)

    query.exec(async function (err, user) {
        if (user) {
            user.password = requestbody.password ? requestbody.password : user.password
            user.firstName = requestbody.firstName ? requestbody.firstName : user.firstName
            user.lastName = requestbody.lastName ? requestbody.lastName : user.lastName
            await user.save()
            return callback(null, user)
        } else {
            return callback({ Error: "User for userID: " + searchUserID.userID + " not found: " + err })
        }
    })
}

function deleteUser(userID, callback) {
    var query = User.findOneAndDelete(userID)
    query.exec(function (err, user) {
        if (user) {
            return callback(null, user)
        } else {
            return callback({ Error: "User doesn't exist " + err }, null)
        }
    })
}


function checkForAdmin(callback) {
    mongoose.connection.db.collection('users').count(function (err, count) {
        if (err) {
            return callback(err)
        }
        if (count == 0) {
            findUserBy("admin", function (err, user) {
                if (user) {
                    return callback(null, user)
                } else {
                    return callback({ Error: "User doesn't exist " + err }, null)
                }
            })
        }
    })
}

function findUserBy(searchUserID, callback) {

    if (!searchUserID) {
        callback({ Error: "UserID is missing" })
        return
    }
    else {
        var query = User.findOne({ userID: searchUserID })
        query.exec(function (err, user) {
            if (err) {
                return callback({ Error: "Did not find user for userID: " + searchUserID }, null);
            }
            else {
                if (user) {
                    callback(null, user);
                }
                else {
                    if ("admin" == searchUserID) {
                        var adminUser = new User();
                        adminUser.userID = "admin"
                        adminUser.password = "123"
                        adminUser.firstName = "Max"
                        adminUser.lastName = "Mustermann"
                        adminUser.isAdministrator = true

                        adminUser.save(function (err) {
                            if (err) {
                                callback({ Error: "Could not login to admin account" }, null);
                            }
                            else {
                                callback(null, adminUser);
                            }
                        });
                    }
                    else {
                        callback({ Error: "UserService: Could not find user for user ID: " + searchUserID });
                    }
                }
            }
        });
    }
}

module.exports = {
    getUsers,
    findUserBy,
    createUser,
    deleteUser,
    updateUser,
    checkForAdmin
}