const express = require("express")
const controller = require("./controller")
exports.router = (function () {
    const router =  express.Router()
    
    router.get("/tags", controller.getProducts);

    return router;
})()