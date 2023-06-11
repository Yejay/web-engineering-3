const mongoose = require("mongoose")
const config = require("config")

let _db
const connectionString = config.get("db.connectionString")

function initDB(callback){
    if(_db){
        if(callback){
            return callback(null, _db)
        } else {
            return _db
        }
    } else {
        mongoose.connect(connectionString,{useNewUrlParser:true, useUnifiedTopology: true, autoIndex: true})
        _db = mongoose.connection

        _db.on("error" , console.error.bind(console, "Connection error: "))
        _db.once("open", function(){
            console.log("Connected to database " + connectionString + "in db.js" + _db)
            callback(null, _db)
        })
    }
}

function close(){
    return _db
}

module.exports = {
    initDB,
    close
}