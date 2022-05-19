const HotelData = require('../models/hotelsData');
const http = require('../constants/http');

async function updateAvailableRooms(hotelName) {
    const updatedRooms = {};
    await HotelData.findOne({ hotelName })
        .then((data) => {
            updatedRooms.roomsAvailable = data.roomsAvailable;
        })
        .catch((e)=>{
            console.log(e);
            res.status(http.BAD_REQUEST);
            res.send('Internal Server Error');
        });
    await HotelData.updateOne({ hotelName },
        { roomsAvailable : updatedRooms.roomsAvailable-1 });
}

module.exports = { updateAvailableRooms };
