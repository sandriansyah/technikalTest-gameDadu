'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dadus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPlayer: {
        type: Sequelize.INTEGER,
        references:{
          model:"players",
          key:"id"
        },
        onUpdate:"CASCADE",
        onDelete:"CASCADE"
      },
      daduName: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('dadus');
  }
};