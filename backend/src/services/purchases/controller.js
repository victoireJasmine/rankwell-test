//imports
var models = require('./../../../models');
var asyncLib = require('async');
const { Op } = require("sequelize");

//Routes
module.exports = {
  getPurchases: function(req, res) {
    asyncLib.waterfall([
      function(done) {
        models.Purchases.findAll({
            include: [
                {model: models.Users, as: "user"},
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
            attributes: { exclude: ['product_id', 'user_id'] },
        }).then(function(purchases) {
            done(purchases);
        }).catch(function(err) {
            return res.status(500).json({ 'error': 'impossible de récupérer les achats' });
        });
      }
    ], function(purchases){
      if(purchases){
        return res.status(200).json(purchases);
      } else {
        return res.status(500).json({'error': 'opération échouée'});
      }
    });
  },
  getPurchase: function(req, res) {
    var purchaseId      = req.params.id;
    if (!purchaseId){
      return res.status(400).json({ 'error': 'paramètre purchaseId manquant' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Purchases.findOne({
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
            attributes: { exclude: ['product_id'] },
            where: { id: purchaseId }
        }).then(function(purchases) {
            done(purchases);
        }).catch(function(err) {
            return res.status(500).json({ 'error': 'impossible de récupérer les achats' });
        });
      }
    ], function(purchases){
      if(purchases){
        return res.status(200).json(purchases);
      } else {
        return res.status(500).json({'error': 'cet achat n\'existe plus'});
      }
    });
  },
  createPurchases: function(req, res){
    const userId = req.user.id;
    const products = req.body.products

    var allValues = [];

    for (var i=0; i < products.length; i++) {
        var valueObj = {
          product_id: parseInt(products[i]),
          user_id: userId
        };
        allValues.push(valueObj);
    }
   

    if(!allValues.length){
        return res.status(400).json({ 'error': 'paramètre products[] manquant dans le corps de la requête' });
    }

    asyncLib.waterfall([
        function(done) {
            models.Purchases.bulkCreate(allValues)
            .then((created)=>{
              done(created)
            })
            .catch((err)=>{
              return res.status(500).json({'error': 'produit inexistant'});
            });
        }
      ], function(created){
        if(created){
          return res.status(201).json({message: 'Achats validés avec succès'});
        } else {
          return res.status(500).json({'error': 'opération échouée'});
        }
      });
  },
  deletePurchase: function(req, res) {
    var purchaseId      = req.params.id;
    if (!purchaseId){
      return res.status(400).json({ 'error': 'paramètre purchaseId manquant' });
    }

    asyncLib.waterfall([
      function(done) {
        models.Purchases.destroy({
            where: {
              id: purchaseId
            }
        })
        .then(function(deleteRow) {
            done(deleteRow);
        })
        .catch(function(err) {
            return res.status(500).json({'error': 'Coordonnées de l\'utilisateur non trouvées'});
        });
      }
    ], function(deleteRow){
      if(deleteRow >=0){
        return res.status(201).json({message: 'Mise à jour effectuée avec succès'});
      } else {
        return res.status(404).json({'error': 'impossible de supprimer, purchaseId inexistant'});
      }
    });
  },
}