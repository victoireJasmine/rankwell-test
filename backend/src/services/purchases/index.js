const express = require("express")
const controller = require("./controller")
const {passport} = require('./../../utils/session')

exports.router = (function () {
    const router =  express.Router()
    
    router.get("/", [passport, controller.getPurchases]);
    
    router.post("/", [passport, controller.createPurchases]);

    router.get("/:id", [passport, controller.getPurchase]);

    router.delete("/:id", [passport, controller.deletePurchase]);

    return router;
})()