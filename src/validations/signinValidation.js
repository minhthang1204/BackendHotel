const UserData = require('../models/usersData');
const http = require('../constants/http');

async function userValidation(req, res) {
    const error = {};
    const emailRegx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const passwordRegx =
     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!(emailRegx.test(req.body.email))) {
        error.emailError = {
            errorMessage : 'Please enter a valid Email',
        };
    }
    if (!(passwordRegx.test(req.body.newPassword))) {
        error.passwordError = {
            errorMessage : 'Please enter a strong password',
        };
    }
    if (req.body.newPassword !== req.body.newPasswordVerify) {
        error.passwordVerifyError = {
            errorMessage : 'password must be same',
        };
    }
    if (req.body.mobileNumber.length !== 10) {
        error.mobileNumberError = {
            errorMessage : 'Please enter a valid mobile number',
        };
    }
    if (req.body.age < 18) {
        error.ageError = {
            errorMessage : 'Too young to create account',
        };
    }
    if (req.body.idProofNumber.length !== 12) {
        error.idProofNumberError = {
            errorMessage : 'Please enter valid proof',
        };
    }
    await UserData.findOne({ name : req.body.name })
        .then((data) => {
            if (data.name==req.body.name) {
                error.nameTaken = {
                    errorMessage : 'Name already taken!',
                };
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(http.INTERNAL_SERVER_ERROR);
        });
    await UserData.findOne({ email : req.body.email })
        .then((data) => {
            console.log(data);
            if (data) {
                error.userExists = {
                    errorMessage : 'User Already exists!',
                };
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(http.INTERNAL_SERVER_ERROR);
        });
    console.log(error);
    return error;
}

module.exports = { userValidation };
