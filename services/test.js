const { moveElevators } = require('./elevatorService');
const { building_elevators } = require('../db.json')

setInterval(() => {
      moveElevators(building_elevators)
}, 5000);