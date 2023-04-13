"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User_1 = require("../schemas/User");
/**
 * Controller class for the user.
 * @TODO write functions for updating, deleting, and getting user.
 */
class UserController {
    constructor() {
        this.path = '/user';
        this.router = express.Router();
        this.user = User_1.default;
        /**
         * New user sign up.
         * @TODO save encrypted passwords.
         */
        this.createNewUser = (request, response) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("create new user");
            const userData = request.body;
            if (yield this.user.findOne({ emailID: userData.emailID })) {
                response.status(401).json({
                    success: false,
                    message: 'User already exists'
                });
            }
            else {
                const hashedPassword = yield bcrypt.hash(userData.password, 10);
                userData.password = hashedPassword;
                console.log(userData);
                const createdUser = new this.user(userData);
                createdUser.save().then((savedUser) => {
                    response.send(savedUser);
                });
            }
        });
        /**
         * Get a specific user's information.
         * @TODO make this so that it's only accessible by a user with the correct JWT Token.
         */
        this.getUserById = (request, response) => {
            console.log('get user by id');
            const id = request.params.id;
            this.user.findById(id).then((founduser) => {
                if (founduser) {
                    response.send(founduser);
                }
                else {
                    response.sendStatus(404);
                }
            });
        };
        /**
         * Delete a user.
         */
        this.deleteUser = (request, response) => {
            const id = request.query.id;
            this.user.findByIdAndDelete(id).then((successResponse) => {
                if (successResponse) {
                    response.sendStatus(200);
                }
                else {
                    response.sendStatus(404);
                }
            });
        };
        /**
         * Modify user data.
         */
        this.modifyUser = (request, response) => {
            const id = request.params.id;
            const userData = request.body;
            this.user.findByIdAndUpdate(id, userData, { new: true }).then((ride) => {
                response.send(ride);
            });
        };
        /**
         * Get all users.
         */
        this.getAllusers = (request, response) => {
            console.log('get all users');
            this.user.find().then((users) => {
                response.send(users);
            });
        };
        /**
         * Login user from email and password.
         * @TODO use encryption to process the passwords.
         */
        this.login = (request, response) => {
            console.log('called login');
            const loginData = request.body;
            const emailID = loginData.emailID;
            this.user.findOne({ emailID: emailID }).then((founduser) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                if (founduser) {
                    const isCorrectPassword = yield bcrypt.compare(loginData.password, founduser.password.toString());
                    if (isCorrectPassword) {
                        // Create a token and attach it to the header.
                        console.log(founduser);
                        const tokenData = this.createToken(founduser.id);
                        console.log('set cookie');
                        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
                        return response.json({
                            success: true,
                            tokenData
                        });
                    }
                    else {
                        return response.status(401).json({
                            success: false,
                            message: 'Incorrect credentials'
                        });
                    }
                }
                else {
                    console.log('user not found');
                    response.sendStatus(404);
                }
            }));
        };
        /**
         * Check if a JWT is active and valid.
         */
        this.checkToken = (request, response) => {
            console.log('check token method');
            // Get token from cookies.
            const cookies = request.cookies;
            if (cookies && cookies.Authorization) {
                const token = cookies.Authorization;
                // Verify that the token is valid and active.
                jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
                    if (err) {
                        return response.json({
                            success: false,
                            message: 'Invalid token'
                        });
                    }
                    else {
                        // If valid token, get the current user. 
                        this.user.findById(decoded.id).then((founduser) => {
                            if (founduser) {
                                return response.status(200).json({
                                    success: true,
                                    founduser
                                });
                            }
                            else {
                                response.status(404).json({
                                    success: false,
                                    message: 'User not found'
                                });
                            }
                        });
                    }
                });
            }
            else {
                // No user was logged in. 
                return response.status(401).json({
                    success: false,
                    message: 'User not logged in'
                });
                ;
            }
        };
        /**
         * Sign out the user.
         */
        this.logOut = (request, response) => {
            response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
            response.sendStatus(200);
        };
        this.initRoutes();
    }
    /**
     * Initialize all routes
     */
    initRoutes() {
        this.router.get(`${this.path}/allusers`, this.getAllusers);
        this.router.get(`${this.path}/:id`, this.getUserById);
        this.router.post(`${this.path}/logout`, this.logOut);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/checktoken`, this.checkToken);
        this.router.post(`${this.path}/signup`, this.createNewUser);
        this.router.delete(`${this.path}`, this.deleteUser);
        this.router.put(`${this.path}`, this.modifyUser);
    }
    /**
     * Create a new signed JSON Web Token.
     * @param id ID from a user object.
     */
    createToken(id) {
        // SIGNING OPTIONS
        const signOptions = {
            expiresIn: "168h"
        };
        const token = jwt.sign({ id }, process.env.PRIVATE_KEY, signOptions);
        return token;
    }
    /**
     * Create cookie from token to be stored in the user's site.
     * @param token token returned from JWT sign
     */
    createCookie(token) {
        return `Authorization=${token}; HttpOnly; Max-Età=${token.expiresIn}`;
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map