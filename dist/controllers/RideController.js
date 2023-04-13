"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const Ride_1 = require("../schemas/Ride");
const Vehicle_1 = require("../schemas/Vehicle");
const Groups_1 = require("../schemas/Groups");
class RideController {
    constructor() {
        this.path = '/ride';
        this.router = express.Router();
        this.ride = Ride_1.default;
        this.userVehicle = Vehicle_1.default;
        this.userGroup = Groups_1.default;
        this.getEveryRide = (request, response) => {
            this.ride.find()
                .then((data) => {
                response.send(data);
            })
                .catch((err) => {
                console.log('err in geteveryride', err);
            });
        };
        this.addVehicle = (request, response) => {
            // Should be a Ivehicle interface
            const { vehicleType, vehicleRegNo, vehicleSpecification, driverID } = request.body;
            console.log('received data:');
            console.log(request.body);
            const createdVehicle = new this.userVehicle({
                vehicleType,
                vehicleRegNo,
                vehicleSpecification,
                driverID,
            });
            createdVehicle.save().then((savedPost) => {
                console.log('savedPost', savedPost);
                response.send(savedPost);
            }).catch((err) => {
                console.log('err in posting vehicle details', err);
                response.sendStatus(404);
            });
        };
        this.getVehicle = (request, response) => {
            console.log('called getVehicle');
            console.log('request.body', request.body);
            console.log('helooooo');
            const driverID = request.body.driverID;
            console.log('driverID', driverID);
            // const emailID = loginData.emailID;
            this.userVehicle.findOne({ driverID: driverID }).then((founduser) => {
                if (founduser) {
                    console.log('founduser', founduser);
                    response.sendStatus(200);
                    // response.send(founduser);
                }
                else {
                    console.log('user not found');
                    response.sendStatus(400);
                }
            });
        };
        /**
         * Get all the entries following the Ride schema.
         */
        this.getAllRides = (request, response) => {
            console.log('get list of rides');
            // If direction is specificed, show only one direction.
            const dir = request.query.dir.valueOf();
            // If date is specificed, show only dates greater than or equal to that one.
            const date = new Date(request.query.date.valueOf().toString());
            // When ready, specify also $lte in the date filter.
            // (https://stackoverflow.com/questions/39940595/gte-and-lte-in-mongoose-with-multiple-condition)
            // Sort rides in order.
            if (dir) {
                this.ride
                    .find({
                    category: dir,
                    date: {
                        $gte: date,
                    },
                })
                    .sort({ date: '1' })
                    .then((rides) => {
                    response.send(rides);
                });
            }
            else {
                this.ride.find().then((rides) => {
                    response.send(rides);
                });
            }
        };
        /**
         * Get all the entries following the Ride schema.
         */
        this.getAllRidesByDriverID = (request, response) => {
            // Get the driverID
            console.log('rides by driver called');
            const driverID = request.query.driverID.valueOf();
            const date = new Date();
            // Sort rides in order.
            try {
                if (driverID) {
                    this.ride
                        .find({
                        driverID: driverID,
                        // date: {
                        // 	$gte: date,
                        // },
                    })
                        .sort({ date: '1' })
                        .then((rides) => {
                        console.log('rides by driver', rides);
                        response.send(rides);
                    });
                }
                else {
                    console.log('no driver id');
                    response.send();
                }
            }
            catch (_a) {
                response.send();
            }
        };
        /**
         * Get a ride by the specific ID.
         */
        this.getRideById = (request, response) => {
            const id = request.params.id;
            console.log(id);
            this.ride.findById(id).then((ride) => {
                response.send(ride);
            });
        };
        /**
         * Update information regarding a ride.
         */
        this.modifyRide = (request, response) => {
            const id = request.params.id;
            const rideData = request.body;
            this.ride.findByIdAndUpdate(id, rideData, { new: true }).then((ride) => {
                response.send(ride);
            });
        };
        /**
         * Add a new ride to the database.
         */
        this.createRide = (request, response) => {
            // Should be a IRide interface
            const rideData = request.body;
            console.log('received data:');
            console.log(request.body);
            const createdRide = new this.ride(rideData);
            createdRide.save().then((savedPost) => {
                response.send(savedPost);
            });
        };
        /**
         * Delete a ride by its ID number.
         */
        this.deleteRide = (request, response) => {
            const id = request.params.id;
            this.ride.findByIdAndDelete(id).then((successResponse) => {
                if (successResponse) {
                    response.sendStatus(200);
                }
                else {
                    response.sendStatus(404);
                }
            });
        };
        this.initRoutes();
    }
    /**
     * Initialize all the routes.
     */
    initRoutes() {
        this.router.get(this.path, this.getAllRides);
        this.router.get(`${this.path}/rides`, this.getEveryRide);
        this.router.get(`${this.path}/bydriver`, this.getAllRidesByDriverID);
        this.router.get(`${this.path}/:id`, this.getRideById);
        this.router.put(`${this.path}/:id`, this.modifyRide);
        this.router.delete(`${this.path}/:id`, this.deleteRide);
        this.router.post(this.path, this.createRide);
        this.router.post(`${this.path}/getVehicleDetails`, this.getVehicle);
        this.router.post(`${this.path}/vehicleSubmit`, this.addVehicle);
    }
}
exports.default = RideController;
//# sourceMappingURL=RideController.js.map