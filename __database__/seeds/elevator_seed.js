const knex = require("knex");
const elevator_seed = [
  {
    id: "142e8446-f5ba-4813-bfb5-f3192a37f1bf",
    capacity: "5",
  },
  {
    id: "bf6091cc-69f8-4a9e-93ed-0294c3a8ac2f",
    capacity: "4",
  },
];

const seed = async (knex) => {
  await knex("elevators").truncate();
  await knex("elevators").insert(elevator_seed);
};

module.exports = { seed };
