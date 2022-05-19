const express = require('express');
const router = express.Router();
const hotel = require('../controller/hotelController');
const authenticateToken = require('../middleware/auth');

router
    .route('/add')
    .post(authenticateToken, (req, res) => {
        hotel.add(req, res);
    });

router
    .route('/list')
    .get(authenticateToken, (req, res) => {
        hotel.show(req, res);
    });

module.exports = router;
