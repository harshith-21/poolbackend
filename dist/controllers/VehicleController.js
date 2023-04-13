"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require("express");
const Vehicle_1 = require("../schemas/Vehicle");
/**
 * Controller class for the user.
 * @TODO write functions for updating, deleting, and getting user.
 */
class VehicleController {
    constructor() {
        this.path = '/vehicle';
        this.router = express.Router();
        this.userVehicle = Vehicle_1.default;
        /**
         * New user sign up.
         * @TODO save encrypted passwords.
         */
        this.getVehicle = (request, response) => {
            console.log('called getVehicle');
            console.log('request.body', request.body);
            console.log('helooooo');
            const userId = request.body.userId;
            console.log('userId', userId);
            // const emailID = loginData.emailID;
            this.userVehicle.findOne({ userId: userId }).then((founduser) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (founduser) {
                    response.sendStatus(200);
                    response.send(founduser);
                }
                else {
                    console.log('user not found');
                    response.sendStatus(404);
                    response.send("not found");
                }
            }));
            // return vechileDetails;
        };
        this.initRoutes();
    }
    /**
     * Initialize all routes
     */
    initRoutes() {
        this.router.post(`${this.path}/vehicleDetails`, this.getVehicle);
    }
}
exports.default = VehicleController;
//# sourceMappingURL=VehicleController.js.map