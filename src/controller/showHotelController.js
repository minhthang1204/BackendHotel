const HotelData = require('../models/hotelsData');
const http = require('../constants/http');

selectedHotel = (req, res) => {
    HotelData.findOne({ hotelName : req.body.hotel })
        .then((data) => {
            if (data) {
                selectedHotelData = data;
                res.status(http.SUCCESS).json({ hotelID : data._id });
                res.end();
            } else {
                res.status(http.UNAUTHORISED);
                res.send(e);
                res.end();
            }
        })
        .catch((e) => {
            res.status(http.INTERNAL_SERVER_ERROR);
            res.send('Internal Server Error');
        });
};

sendHotelPreview =(req, res) => {
    HotelData.findOne({ _id : req.query.ID })
        .then((data) => {
            if (data) {
                res.status(http.SUCCESS).json(data);
                res.end();
            } else {
                res.status(http.UNAUTHORISED);
                res.send(e);
                res.end();
            }
        })
        .catch((e) => {
            res.status(http.INTERNAL_SERVER_ERROR);
            res.send('Internal Server Error');
        });
};

module.exports = { selectedHotel, sendHotelPreview };
