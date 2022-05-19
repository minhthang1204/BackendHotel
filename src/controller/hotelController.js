const { hotelValidation } = require('../validations/hotelValidation');
const HotelData = require('../models/hotelsData');
const http = require('../constants/http');

add = async (req, res) => {
    try {
        const { hotelName, totalRooms, roomsAvailable, address,
            phone, Single,
            Double, Suit, description } = req.body;
        const error = await hotelValidation(req, res);
        const newHotel = new HotelData({
            hotelName, totalRooms, roomsAvailable, address,
            phone, Single, Double,
            Suit, description,
        });
        if (Object.keys(error).length) {
            res.status(http.BAD_REQUEST).json({ error });
        } else {
            newHotel.save();
            res.status(http.SUCCESS);
            res.end();
        }
    } catch (error) {
        console.log(error);
        res.status(http.INTERNAL_SERVER_ERROR);
        res.send('Internal Server Error');
    }
};

show = (req, res) => {
    HotelData.find({})
        .then((data) => {
            res.send(data);
        })
        .catch((e) => {
            res.status(http.BAD_REQUEST).send(e);
        });
};


module.exports = {
    add, show,
};

