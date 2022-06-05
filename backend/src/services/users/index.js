const express = require("express")
const controller = require("./controller")
const {passport} = require('./../../utils/session')

exports.router = (function () {
    const router =  express.Router()

    router.get("/users", [passport, controller.getUsers]);

    router.get("/users/:id", [passport, controller.getUsers]);

    router.get("/users/:id/purchases", [passport, controller.getPurchases]);

    return router;
})()