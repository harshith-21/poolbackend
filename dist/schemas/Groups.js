"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// @TODO determine which fields I want to keep in generic user.
/**
 * Schema for basic user object in MongoDB.
 * email must be @illinois.edu
 */
const groupSchema = new mongoose_1.Schema({
    category: String,
    // license: String,
    // aboutme: String
});
const groupModel = (0, mongoose_1.model)('group', groupSchema);
exports.default = groupModel;
//# sourceMappingURL=Groups.js.map