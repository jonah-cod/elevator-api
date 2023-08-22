const knex = require("knex");
const {randomUUID} = require("crypto");

const elevator_seed = [
  {
    elevatorID: randomUUID(),
    status: "active",
    direction: "up",
    currentFloor: 2,
    targetFloor: 7,
    destinationFloor: 7,
    doorsOpen: false
  },
  {
    elevatorID: randomUUID(),
    status: "idle",
    direction: "down",
    currentFloor: 2,
    targetFloor: null,
    destinationFloor: null,
    doorsOpen: false
  },
  {
    elevatorID: randomUUID(),
    status: "active",
    direction: "down",
    currentFloor: 9,
    targetFloor: 2,
    destinationFloor: 4,
    doorsOpen: false
  },
  {
    elevatorID: randomUUID(),
    status: "active",
    direction: "up",
    currentFloor: 1,
    targetFloor: 2,
    destinationFloor: 5,
    doorsOpen: false
  },
  {
    elevatorID: randomUUID(),
    status: "idle",
    direction: "none",
    currentFloor: 6,
    targetFloor: null,
    destinationFloor: null,
    doorsOpen: false
  }
];

const seed = async (knex) => {
  await knex("elevators_info").truncate();
  await knex("elevators_info").insert(elevator_seed);
};

module.exports = { seed };
