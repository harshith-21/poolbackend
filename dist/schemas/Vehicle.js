"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// @TODO determine which fields I want to keep in generic user.
/**
 * Schema for basic user object in MongoDB.
 * email must be @illinois.edu
 */
const vehicleSchema = new mongoose_1.Schema({
    vehicleType: String,
    vehicleRegNo: String,
    vehicleSpecification: String,
    driverID: String,
    // license: String,
    // aboutme: String
});
const vehicleModel = (0, mongoose_1.model)('vehicle', vehicleSchema);
exports.default = vehicleModel;
//# sourceMappingURL=Vehicle.js.map