const express = require('express');
const router = express.Router();
const user = require('../controller/userController');
const authenticateToken = require('../middleware/auth');

router
    .route('/signIn')
    .post((req, res) => {
        user.signIn(req, res);
    });

router
    .route('/logIn')
    .post((req, res) => {
        user.login(req, res);
    })
    .get((req, res) => {
        user.sendUserData(req, res);
    });

router
    .route('/profile')
    .get(authenticateToken, (req, res) => {
        user.postUserData(req, res);
    });

router
    .route('/logout')
    .get((req, res) => {
        user.logout(req, res);
    });

module.exports = router;
