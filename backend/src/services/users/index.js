const express = require("express")
const controller = require("./controller")
const {passport} = require('./../../utils/session')

exports.router = (function () {
    const router =  express.Router()

    router.get("/", [passport, controller.getUsers]);

    router.get("/:id", [passport, controller.getUser]);

    router.get("/:id/purchases", [passport, controller.getPurchases]);

    return router;
})()