'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products_tags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tag_id: {
        allowNull: false,
       type: Sequelize.INTEGER,
       references:{
         model:"Tags",
         key:"id"
       }
      },
      product_id: {
        allowNull: false,
       type: Sequelize.INTEGER,
       references:{
         model:"Products",
         key:"id"
       }
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products_tags');
  }
};