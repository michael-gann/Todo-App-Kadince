"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Todos",
      [
        {
          userId: 1,
          title: "Walk the dog",
          isComplete: true,
        },
        {
          userId: 1,
          title: "Do the dishes",
          isComplete: false,
        },
        {
          userId: 1,
          title: "Wash the cat",
          isComplete: false,
        },
        {
          userId: 1,
          title: "Eat a banana",
          isComplete: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Todos", null, {});
  },
};
