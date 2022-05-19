const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserData = require('../models/usersData');
const { userValidation } = require('../validations/signinValidation');
const http = require('../constants/http');

signIn = async (req, res) => {
    try {
        const { name, email, newPassword,
            mobileNumber, age, idProofNumber } = req.body;
        const error = await userValidation(req);
        const newUser = new UserData({
            name, email, newPassword, mobileNumber, age, idProofNumber,
        });
        if (Object.keys(error).length) {
            res.status(http.BAD_REQUEST).json({ error });
        } else {
            res.status(http.SUCCESS);
            newUser.save();
            res.end();
        }
    } catch (error) {
        console.log(error);
        res.status(http.INTERNAL_SERVER_ERROR);
    }
};

login = (req, res) => {
    try {
        UserData.findOne({
            email : req.body.email,
            newPassword : req.body.password,
        }).then((data) => {
            if (data) {
                let Admin = false;
                if (data.isAdmin == true) {
                    Admin = true;
                }
                const user = { email : data.email };
                const accessToken =
                    jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
                res.cookie('token', accessToken,
                    { expires : new Date(Date.now() + 900000) });
                res.status(http.SUCCESS);
                res.json({
                    accessToken : accessToken,
                    isAdmin : Admin,
                    userid : data._id,
                    userName : data.name,
                });
                res.end();
            } else {
                res.status(http.BAD_REQUEST)
                    .json({ err : 'Invalid Login Credentials' });
                res.end();
            }
        }).catch((e) => {
            res.status(http.BAD_REQUEST);
            res.send('Please enter valid credentials');
        });
    } catch (error) {
        console.log(error);
        res.status(http.INTERNAL_SERVER_ERROR);
        res.send('Internal Server Error');
    }
};

postUserData = (req, res) => {
    try {
        UserData.findOne({ name : req.query.ID },
        ).then((user) => {
            res.status(http.SUCCESS).json({ user });
            res.end();
        }) .catch((e) => {
            res.status(http.UNAUTHORISED);
            res.send(e);
        });
    } catch (error) {
        console.log(error);
        res.status(http.INTERNAL_SERVER_ERROR);
        res.send('Internal server error');
    }
};

logout = (req, res) => {
    try {
        console.log('User Logged out successfully');
        res.cookie('token', '',
            { maxAge : 0 });
    } catch (error) {
        res.status(http.INTERNAL_SERVER_ERROR);
        res.send('Internal Server Error');
    }
};

module.exports = { signIn, login, postUserData, logout };
