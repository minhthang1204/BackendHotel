const mongoose = require('mongoose');

const BookedHotelsSchema = mongoose.Schema({
    hotelName : String,
    recipientName : String,
    dateOfBooking : String,
    checkInDate : String,
    checkOutDate : String,
    typeOfRoom : String,
    TotalBookedRooms : Number,
    totalPrice : Number,
    totalDays : Number,
    paymentType : String,
    PaymentDetails : String,
});

module.exports = mongoose.model('BookedHotel', BookedHotelsSchema);
