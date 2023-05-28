var mongoose = require('mongoose');

const degreeCourseAppSchema = new mongoose.Schema({
    applicantUserID: { type: String, required: true },                              // Der Unique-Identifier von der Studienbewerbung
    degreeCourseID: { type: String, required: true },                               // Das ist die User-ID des Studierenden
    targetPeriodYear: { type: Number, required: true},                  // Das ist der Unique-Identifier des Studiengangs
    targetPeriodShortName: { type: String, enum: ["WiSe", "SoSe"], required: true } // Das ist die Angabe des Jahres, für das sich der Studierende bewirbt
}, { timestamps: true }                                                             // Das ist die Kurzbezeichnung des Semesters ( „WiSe“ oder „SoSe“ )
);

const degreeCourseApp = mongoose.model("degreeCourseApplication", degreeCourseAppSchema);
module.exports = degreeCourseApp;