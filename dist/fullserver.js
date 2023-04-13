"use strict";
//server/fullserver.js
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var App = require("./app").default;
// path is relative to the JS files in /lib
var RideController = require("./controllers/RideController").default;
var UserController = require("./controllers/UserController").default;
var VehicleController = require("./controllers/VehicleController").default;
const app = new App([
    new RideController(),
    new UserController(),
    new VehicleController()
]);
// module.exports = app;
app.listen();
//# sourceMappingURL=fullserver.js.map