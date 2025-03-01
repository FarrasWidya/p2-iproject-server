'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Users'
          },
          key:'id',
          onUpdate:'cascade',
          onDelete:'set null'
        }
      },
      ContentId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Contents'
          },
          key:'id',
          onUpdate:'cascade',
          onDelete:'set null'
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
    await queryInterface.dropTable('Comments');
  }
};