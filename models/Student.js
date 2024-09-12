
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true,
        minlength: 9,
        maxlength: 10,
        match: /^[0-9]+$/
    },
    school:{
        type:String
    },
    transport:{
        type:String
    }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
