const mongoose = require('mongoose');

let StudentSchema = mongoose.Schema({
    surename: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    othernames: {
        type: String,
        trim: true
    },
    matricnum: {
        type: String,
        trim: true
    },
    faculty: {
        type: String,
        trim: true,
        required: true
    },
    department: {
        type: String,
        trim: true,
        required: true
    },
    level: {
        type: String,
        trim: true,
        required: true
    },
    mode: {
        type: String,
        trim: true,
        required: true
    }
})


let StudentModel = mongoose.model('students', StudentSchema);



module.exports = {StudentModel};
