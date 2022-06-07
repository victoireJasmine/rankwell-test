//imports
var models = require('./../../../models');
var asyncLib = require('async');
const { Op } = require("sequelize");

//Routes
module.exports = {
  getUser: function(req, res) {
    var userId      = req.params.id;
    if (!userId){
      return res.status(400).json({ 'error': 'paramètre userId manquant' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Users.findOne({
          attributes: { exclude: ['password'] },
          where: { id: userId }
        }).then(function(userFound) {
          done(userFound);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'impossible de récupérer l\'utilisateur' });
        });
      }, 
    ], function(userFound){
      if(userFound){
        return res.status(200).json(userFound);
      } else {
        return res.status(404).json({'error': 'cet utilisateur n\'existe pas'});
      }
    });
  },
  getUsers: function(req, res) {
    asyncLib.waterfall([
      function(done) {
        models.Users.findAll({
          attributes: { exclude: ['password'] }
        }).then(function(userFound) {
          done(userFound);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'impossible de récupérer l\'utilisateur' });
        });
      }, 
    ], function(userFound){
      if(userFound){
        return res.status(200).json(userFound);
      } else {
        return res.status(500).json({'error': 'opération échouée'});
      }
    });
  },
  getPurchases: function(req, res) {
    var userId      = req.params.id;
    if (!userId){
      return res.status(400).json({ 'error': 'paramètre userId manquant' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Users.findOne({
          where: { id: userId }
        }).then(function(userFound) {
          done(null, userFound);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'impossible de récupérer l\'utilisateur' });
        });
      }, 
      function(user, done) {
        if(user){
            models.Purchases.findAll({
                include: [
                    { 
                        model: models.Products, as: "product",
                        include: [
                            {
                                model: models.Products_tags, as: "products_tags",  
                                attributes: { exclude: ['product_id', 'tag_id', 'createdAt', 'updatedAt'] },
                                include: [{model: models.Tags, as: "tag", attributes: { exclude: ['id','createdAt','updatedAt'] },                            }]
                            }
                        ]
                    }
                ],
                where: { user_id: userId }
            }).then(function(purchases) {
                done(purchases);
            }).catch(function(err) {
                return res.status(500).json({ 'error': 'impossible de récupérer les achats' });
            });
        } else {
            return res.status(404).json({'error': 'Cet utilisateur n\'existe pas'});
        }
      }
    ], function(purchases){
      if(purchases){
        return res.status(200).json(purchases);
      } else {
        return res.status(500).json({'error': 'opération échouée'});
      }
    });
  },
}