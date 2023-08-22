const {calculateNearestElevator} = require('../elevatorService');

describe('Elevator Service Tests', () => {
  describe('calculateNearestElevator', () => {
    const elevators = [
      { id: 1, currentFloor: 3, direction: 'up', status: 'idle' },
      { id: 2, currentFloor: 5, direction: 'down', status: 'moving' },
      { id: 3, currentFloor: 1, direction: 'idle', status: 'idle' },
    ];

    const null_elevators = [
      { id: 1, currentFloor: 3, direction: 'up', status: 'moving' },
      { id: 2, currentFloor: 5, direction: 'down', status: 'moving' },
      { id: 3, currentFloor: 1, direction: 'idle', status: 'mocing' },
    ];

    it('should return the nearest available elevator', async () => {
      const requestedFloor = 2;
      const nearestElevator = await calculateNearestElevator(requestedFloor, elevators);
      expect(nearestElevator).toEqual(elevators[0]); // Elevator with id 1 is nearest and idle
    });

    it('should return null if no available elevators', async () => {
      const requestedFloor = 4;
      const nearestElevator = await calculateNearestElevator(requestedFloor, null_elevators);
      expect(nearestElevator).toBeNull();
    });
  });

  // More test cases for other functions can be added here
});
