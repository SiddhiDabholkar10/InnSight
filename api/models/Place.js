const mongoose = require('mongoose');
const {Schema} = mongoose;


const placeSchema = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'}, // Reference to the owner of the place (User model)
    title: {type: String, required: true}, // Title of the place
    address : {type: String, required: true}, // Address of the place
    photos : [{type: String}], // Array of photo URLs for the place
    description : {type: String}, // Description of the place
    perks : [{type: String}], // Array of perks or amenities (e.g., WiFi, kitchen, etc.)
    extraInfo : [{type: String}], // Additional information about the place (optional)
    checkIn : [{type: Number}],
    checkOut : [{type: Number}], // Check-out time (optional, can be null)
    maxGuests : {type: Number, required: true}, // Maximum number of guests allowed (required)
    price: [{type: Number}] // Price per night (required)

});

const PlaceModel = mongoose.model('Place', placeSchema);

module.exports = PlaceModel;