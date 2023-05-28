var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    userID: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    isAdministrator: { type: Boolean, default: false }
}, { timestamps: true }
);

UserSchema.pre('save', function (next) {
    var user = this;

    console.log("Pre-save: " + this.password + " change: " + this.isModified('password'));

    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        next();
    })
}, function (err) {
    next(err);
})

UserSchema.methods.comparePassword = function (candidatePassword, next) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return next(err);
        }
        else {
            next(null, isMatch)
        }
    })
}

const PublicUser = mongoose.model("Users", UserSchema);
module.exports = PublicUser;