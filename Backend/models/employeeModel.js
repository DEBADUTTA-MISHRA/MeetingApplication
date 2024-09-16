const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employeeName: { type: String, required: true, minlength: 2, maxlength: 20 },
    employeeId: { type: String, required: true, unique: true, minlength: 2, maxlength: 10 },
    email: { type: String, required: true, unique: true, minlength: 3, maxlength: 30 },
    designation: { type: String, required: true, minlength: 2, maxlength: 20 },
    department: { type: String, required: true, minlength: 2, maxlength: 20 },
    unit: { type: String, required: true, minlength: 2, maxlength: 20 },
    isActive:{type:Boolean,default:true}
},
{
    timestamps:true
}
);

module.exports = mongoose.model('Employee', employeeSchema);
