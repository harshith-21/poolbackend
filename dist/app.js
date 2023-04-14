"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const cookieParser = require('cookie-parser');
class App {
    constructor(controllers) {
        this.app = express();
        this.connectToTheDatabase();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }
    initializeMiddlewares() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', path.join(__dirname, '../client'));
        this.app.use(express.static(path.join(__dirname, '../client')));
        // this.app.use(bodyParser.json());
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use((req, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
    }
    getServer() {
        console.log('got server');
        return this.app;
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`listening to port ${process.env.PORT}`);
        });
    }
    initializeControllers(controllers) {
        console.log('init routers');
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
        var router = express.Router();
        router.get('*', function (req, res) {
            res.render('index');
        });
        this.app.use('/', router);
    }
    connectToTheDatabase() {
        const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH, } = process.env;
        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`;
        console.log(uri);
        // mongoose way
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("successfully connected");
        });
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map
