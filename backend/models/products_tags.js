'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products_tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Products_tags.belongsTo(models.Tags,{
        as:"tag",
        foreignKey:"tag_id"
      })
      models.Products_tags.belongsTo(models.Products,{
        as:"product",
        foreignKey:"product_id"
      })
    }
  }
  Products_tags.init({
   
  }, {
    sequelize,
    modelName: 'Products_tags',
  });
  return Products_tags;
};