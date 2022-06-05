const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const swaggerTools = require("swagger-tools")
const { loadFixtures } = require("../fixtures"); //deconstruction
let swaggerDoc = require("./swagger.json");

const{tags,users,products,purchases,auth} = require("./services")

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

server.use("/api/tags",tags)
server.use("/api/products",products)
server.use("/api/purchases",purchases)
server.use("/api/users",users)
server.use("/api/auth",auth)

const options = {
	controllers: "./src/services",
};

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
	server.use(middleware.swaggerMetadata());
	server.use(middleware.swaggerValidator());
	server.use(middleware.swaggerRouter(options));
	server.use(middleware.swaggerUi());

    server.listen(PORT,function(){
        console.log("serveur en marche")
    })
});