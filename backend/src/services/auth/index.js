const express = require("express")
const controller = require("./controller")
const {passport} = require('./../../utils/session')

exports.router = (function () {
    const router =  express.Router()
    
    router.post("/login", controller.login);
    
    router.post("/signup", controller.signup);
    
    router.get("/connected", [passport, controller.connected]);

    return router;
})()

