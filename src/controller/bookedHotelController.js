const BookedHotel = require('../models/bookedHotels');
const http = require('../constants/http');
const { updateAvailableRooms } = require('../utils/bookedHotelUtil');

const booked = async (req, res) => {
    try {
        const { hotelName, recipientName, dateOfBooking, checkInDate,
            checkOutDate, typeOfRoom, totalPrice, totalDays,
        } = req.body;
        const bookedHotel = new BookedHotel({
            hotelName, recipientName, dateOfBooking, checkInDate, checkOutDate,
            typeOfRoom, totalPrice, totalDays,
        });
        bookedHotel.save();
        res.json({ bookedHotelId : bookedHotel._id });
        updateAvailableRooms(hotelName);
        res.status(http.SUCCESS);
        res.end();
    } catch (error) {
        res.status(http.BAD_REQUEST);
        res.send('Internal Server Error');
    }
};

const list= (req, res) => {
    BookedHotel.find({ recipientName : req.query.ID })
        .then((data) => {
            res.status(http.SUCCESS);
            res.json(data);
            res.end();
        })
        .catch((e) => {
            res.status(http.BAD_REQUEST);
            res.send(e);
        });
    res.end;
};

const view = (req, res) => {
    BookedHotel.findOne({ _id : req.query.ID })
        .then((data) => {
            res.status(http.SUCCESS);
            res.json(data);
            res.end();
        })
        .catch((e) => {
            res.status(http.BAD_REQUEST);
            res.send(e);
        });
    res.end;
};


module.exports = {
    booked, view, list,
};
