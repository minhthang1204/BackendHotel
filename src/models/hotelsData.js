const mongoose = require('mongoose');

const HotelsSchema = mongoose.Schema({
    hotelName : String,
    totalRooms : Number,
    roomsAvailable : Number,
    address : String,
    phone : Number,
    longitude : Number,
    lattitude : Number,
    Single : Number,
    Double : Number,
    Suit : Number,
    description : String,
});

module.exports = mongoose.model('HotelData', HotelsSchema);

