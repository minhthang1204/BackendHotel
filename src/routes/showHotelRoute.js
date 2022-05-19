const express = require('express');
const router = express.Router();
const hotel = require('../controller/showHotelController');
const authenticateToken = require('../middleware/auth');

router
    .route('/preview')
    .post(authenticateToken, (req, res) => {
        hotel.selectedHotel(req, res);
    })
    .get(authenticateToken, (req, res) => {
        hotel.sendHotelPreview(req, res);
    });

module.exports = router;
