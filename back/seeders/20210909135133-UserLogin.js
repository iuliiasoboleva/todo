'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
      await queryInterface.bulkInsert('Users', [{
       email: 'admin@admin',
        password: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
     }], {});

  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('Users', null, {});
  }
};
