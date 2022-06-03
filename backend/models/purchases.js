'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchases extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Purchases.belongsTo(models.Products,{
        as:"product",
        foreignKey:"product_id"
      })
      models.Purchases.belongsTo(models.Users,{
        as:"user",
        foreignKey:"user_id"
      })
    }
  }
  Purchases.init({
  
  }, {
    sequelize,
    modelName: 'Purchases',
  });
  return Purchases;
};