'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Products.hasMany(models.Purchases,{
        as:"purchases",
        onDelete:"cascade",
        foreignKey:"product_id"
      })
      models.Products.hasMany(models.Products_tags,{
        as:"products_tags",
        onDelete:"cascade",
        foreignKey:"product_id"
      })
     
    }
  }
  Products.init({
    label: DataTypes.STRING,
    price: DataTypes.FLOAT,
    desc: DataTypes.TEXT,
    picture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};