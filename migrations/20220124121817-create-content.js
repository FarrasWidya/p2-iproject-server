'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      upvote: {
        allowNull: false,
        type: Sequelize.INTEGER
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
      TagId: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Tags'
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
    await queryInterface.dropTable('Contents');
  }
};