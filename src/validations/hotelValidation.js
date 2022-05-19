const http = require('../constants/http');
const HotelData = require('../models/hotelsData');

async function hotelValidation(req, res) {
    const error = {};
    if (req.body.hotelName.length <= 6) {
        error.hotelNameError = {
            errorMessage : 'Please enter Full Hotel Name',
        };
    }
    if (req.body.roomsAvailable.trim() === '') {
        error.roomsAvailableEmptyError = {
            errorMessage : 'Please enter Available Rooms',
        };
    }
    if (req.body.totalRooms.trim() === '') {
        error.totalRoomsError = {
            errorMessage : 'Please enter total Rooms',
        };
    }
    if (req.body.address.trim() === '') {
        error.addressError = {
            errorMessage : 'Please enter address',
        };
    }
    if (req.body.Single.trim() === '') {
        error.SingleError = {
            errorMessage : 'SingleError',
        };
    }
    if (req.body.Double.trim() === '') {
        error.DoubleError = {
            errorMessage : 'Please enter price for Double room',
        };
    }
    if (req.body.Suit.trim() === '') {
        error.SuitError = {
            errorMessage : 'Please enter price for Suit room',
        };
    }
    if (req.body.phone.length < 10) {
        error.phoneNumberError = {
            errorMessage : 'Please enter Valid mobile number',
        };
    }
    if (req.body.totalRooms < req.body.roomsAvailable) {
        error.roomsAvailableError = {
            errorMessage : 'Please enter correct availability of rooms',
        };
    }
    if (req.body.description.length < 50) {
        error.descriptionError = {
            errorMessage : 'Please describe more',
        };
    }
    await HotelData.findOne({ hotelName : req.body.hotelName })
        .then((data) => {
            if (data) {
                error.hotelExistsError = {
                    errorMessage : 'Hotel already added!',
                };
            }
        })
        .catch((e) => {
            console.log(e);
            res.status(http.BAD_REQUEST);
        });
    return error;
}

module.exports = { hotelValidation };
