var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const DegreeCourseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    shortName: { type: String, default: "keine Angaben" },
    universityName: { type: String, required: true },
    universityShortName: { type: String, default: "keine Angaben" },
    departmentName: { type: String, required: true },
    departmentShortName: { type: String, default: "keine Angaben" }
}, { timestamps: true }
);

const DegreeCourse = mongoose.model("DegreeCourses", DegreeCourseSchema);
module.exports = DegreeCourse;