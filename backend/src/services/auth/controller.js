//imports
var bcrypt = require('bcryptjs');
var {generateToken, getUser} = require('../../utils/session');
var models = require('./../../../models');
var asyncLib = require('async');
const { Op } = require("sequelize");

//Routes
module.exports = {
  signup: function(req, res){
      //get params
      var email = req.body.email;
      var password = req.body.password;
      var firstname = req.body.firstname;
      var lastname = req.body.lastname;

      var empty = []
      if(!email) empty.push("email")
      if(!password) empty.push("password")
      if(!firstname) empty.push("firstname")
      if(!lastname) empty.push("lastname")

      if(empty.length){
        return res.status(400).json({ 'error': `paramètres manquants (${empty.toString()}) dans le corps de la requête` });
      }


      asyncLib.waterfall([
          function(done){
              //verify user exist
              models.Users.findOne({
                  attributes: ['email'],
                  where: {email: email}
              })
              .then(function(userFound){
                  done(null, userFound);
              })
              .catch(function(error){
                  return res.status(500).json({'error': 'Erreur, Veuillez réessayer plus tard'});
              })
          },
          function(userFound, done){
              if(!userFound){
                  bcrypt.hash(password, 5, function(err, bcryptedPassword){
                      done(null, bcryptedPassword);
                  });
              } else {
                  return res.status(409).json({'error': 'Cet utilisateur existe déjà'});
              }
          },
          function(bcryptedPassword, done){
              models.Users.create({
                  email: email,
                  password: bcryptedPassword,
                  firstname,
                  lastname
              })
              .then(function(newUser){
                  done(newUser);
              })
              .catch(function(err){
                  return res.status(500).json({'error': 'opération échouée'});
              });
          }
      ], function(newUser){
          if(newUser){            
            return res.status(201).json({'success': 'Compte créé avec succès'});
          } else {
            return res.status(500).json({'error': 'opération échouée'});
          }
      });
  },
  login: function(req, res){
    //get params
    var email = req.body.email;
    var password = req.body.password;
    asyncLib.waterfall([
        function(done) {
          models.Users.findOne({
            where: { email: email }
          })
          .then(function(userFound) {
            done(null, userFound);
          })
          .catch(function(err) {
            return res.status(500).json({'error': 'impossible de vérifier l\'utilisateur, Veuillez réessayer plus tard'});
          });
        },
        function(userFound, done) {
          if (userFound) {
            bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
              done(null, userFound, resBycrypt);
            });
          } else {
            return res.status(404).json({'error': 'Cet utilisateur n\'existe pas'});
          }
        },
        function(userFound, resBycrypt, done) {
          if(resBycrypt) {
            done(userFound);
          } else {
            return res.status(403).json({'error': 'Mot de passe incorrect'});
          }
        }
      ], function(userFound) {
        if (userFound) {
          return res.status(201).json({'token': generateToken(userFound.id)});
        } else {
            return res.status(500).json({'error': 'Erreur, Veuillez réessayer plus tard'});
        }
    });
  },
  connected: function(req, res) {
    return res.status(200).json(req.user);
  }
}