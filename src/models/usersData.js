const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    name : String,
    email : String,
    newPassword : String,
    mobileNumber : Number,
    age : Number,
    idProofNumber : Number,
    isAdmin : Boolean,
});

module.exports = mongoose.model('UserData', dataSchema);
