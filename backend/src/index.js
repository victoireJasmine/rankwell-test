const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const swaggerTools = require("swagger-tools")
const { loadFixtures } = require("../fixtures"); //deconstruction


const server = express()
const PORT =  8080
loadFixtures()


server.use(cors({origin:"*"}))
server.use(express.static(__dirname+"/../data"))
server.use(bodyParser.json({limit: '50mb'}));
server.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}));


server.get("/",function(req,res){
    res.setHeader("Content-Type","text/html")
    res.status(200).send("<h1>Bienvenue dans mon serveur </h1>")
    
})

server.listen(PORT,function(){
    console.log("serveur en marche")

})