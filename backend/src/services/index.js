const users = require("./users").router 
const products = require("./products").router 
const tags = require("./tags").router 
const purchases = require("./purchases").router 
const auth = require("./auth").router 

module.exports = {users, products, purchases, tags, auth}