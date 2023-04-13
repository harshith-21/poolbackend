"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// @TODO determine which fields I want to keep in generic user.
/**
 * Schema for basic user object in MongoDB.
 * email must be @illinois.edu
 */
const userSchema = new mongoose_1.Schema({
    firstname: String,
    lastname: String,
    username: String,
    emailID: String,
    mobileNumber: String,
    password: String
    // license: String,
    // aboutme: String
});
const userModel = (0, mongoose_1.model)('User', userSchema);
exports.default = userModel;
//# sourceMappingURL=User.js.map