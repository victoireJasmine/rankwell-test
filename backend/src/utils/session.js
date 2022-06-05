const jwt = require("jsonwebtoken")
const JWT_TOKEN = "loremipsum"
var models = require('./../../models');


module.exports = {
    generateToken: function (id) {
        const data = {id}
        return jwt.sign(data,JWT_TOKEN,{expiresIn:"48h"})
    },
    parseAuthorization:function (authorization) {
        return authorization != null? authorization.replace("Bearer ", ""):null
        
    },
    getUser:function (authorization) {
        var user = null
        const token = module.exports.parseAuthorization(authorization)
        if (token) {
            try {
                var jwtoken =  jwt.verify(token , JWT_TOKEN)
                if (jwtoken) user = jwtoken
            } catch (error) {
                console.log(error)
            }
        }
        return user 
    },
    passport:function(req, res, next) {
        const authorization = req.headers["authorization"]
        const userData = module.exports.getUser(authorization)
        if (userData) {
            models.Users.findOne({
                attributes: { exclude: ['password'] },
                where: { id: userData.id }
            }).then(function(userFound) {
                if(userFound){
                    req.user = userFound
                    next()
                } else {
                    return res.status(404).json({'error': 'cet utilisateur n\'existe pas'});
                }
            }).catch(function(err) {
                return res.status(500).json({ 'error': 'impossible de récupérer l\'utilisateur' });
            });
        } else {
            return res.status(503).json({message:"Accès refusés"})
        }
    }
}