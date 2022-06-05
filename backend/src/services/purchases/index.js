const express = require("express")
const controller = require("./controller")
const {passport} = require('./../../utils/session')

exports.router = (function () {
    const router =  express.Router()
    
    router.get("/purchases", [passport, controller.getPurchases]);
    
    router.post("/purchases", [passport, controller.createPurchases]);

    router.get("/purchases/:id", [passport, controller.getPurchase]);

    router.delete("/purchases/:id", [passport, controller.deletePurchase]);

    return router;
})()