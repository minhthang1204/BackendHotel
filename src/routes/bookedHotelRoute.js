const express = require('express');
const router = express.Router();
const hotel = require('../controller/bookedHotelController');
const authenticateToken = require('../middleware/auth');

router
    .route('/add')
    .post(authenticateToken, (req, res) => {
        hotel.booked(req, res);
    });

router
    .route('/view')
    .get(authenticateToken, (req, res) => {
        hotel.view(req, res);
    });

router
    .route('/list')
    .get(authenticateToken, (req, res) => {
        hotel.list(req, res);
    });
module.exports = router;
