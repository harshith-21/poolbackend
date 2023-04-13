"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
require("mongoose");
/**
 * @TODO add: price, # of seats
 */
/**
 * Schema for Ride objects in MongoDB.
 */
const rideSchema = new mongoose_1.Schema({
    driverID: String,
    date: Date,
    destination: String,
    departure: String,
    category: String,
    price: Number,
    numberOfSeats: Number
}, {
    collection: 'Rides'
});
const rideModel = (0, mongoose_1.model)('Ride', rideSchema);
exports.default = rideModel;
//# sourceMappingURL=Ride.js.map