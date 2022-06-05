//imports
var bcrypt = require('bcryptjs');
var models = require('./../../../models');
var asyncLib = require('async');
const { Op } = require("sequelize");

//Routes
module.exports = {
  getTags: function(req, res) {
    asyncLib.waterfall([
      function(done) {
        models.Tags.findAll()
        .then(function(Tags) {
          done(Tags);
        }).catch(function(err) {
          return res.status(500).json({ 'error': 'impossible de récupérer les tags' });
        });
      }, 
    ], function(Tags){
      if(Tags){
        return res.status(200).json(Tags);
      } else {
        return res.status(500).json({'error': 'opération échouée'});
      }
    });
  }
}