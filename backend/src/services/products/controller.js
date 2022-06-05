//imports
var bcrypt = require('bcryptjs');
var models = require('./../../../models');
var asyncLib = require('async');
const { Op } = require("sequelize");

//Routes
module.exports = {
  getProducts: function(req, res) {
    asyncLib.waterfall([
      function(done) {
        models.Products.findAll({
            include: [
                {
                    model: models.Products_tags, as: "products_tags",  
                    attributes: { exclude: ['product_id', 'tag_id', 'createdAt', 'updatedAt'] },
                    include: [
                      {
                        model: models.Tags, 
                        as: "tag", 
                        attributes: { exclude: ['id','createdAt','updatedAt'] },                            
                      }]
                }
            ]
        })
        .then(function(Products) {
          done(Products);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'impossible de récupérer les articles' });
        });
      }, 
    ], function(Products){
      if(Products){
        return res.status(200).json(Products);
      } else {
        return res.status(500).json({'error': 'opération échouée'});
      }
    });
  }
}