"use strict";/** @type {import('sequelize-cli').Migration} */
const bcryptjs = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [{
      nome: 'Luiz',
      email: 'luiz@teste.com',
      password_hash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'Joana',
      email: 'joana@teste.com',
      password_hash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      nome: 'Davi',
      email: 'davi@teste.com',
      password_hash: await bcryptjs.hash('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },
};
