const {moveElevators} = require('../elevatorService');

describe('Elevator Service Tests', () => {
  // ...

  describe('moveElevators', () => {
    const elevators = [
      { elevatorID: 1, currentFloor: 3, targetFloor: 4,destinationFloor:5, direction: 'up', status: 'moving', doorsOpen: false },
      { elevatorID: 2, currentFloor: 5, targetFloor: 2, destinationFloor:1, direction: 'down', status: 'moving', doorsOpen: false },
      // ... More elevator data
    ];

    it('should move elevators to their target floors and open doors', async () => {
      // Create mock req and res objects for testing purposes
      const req = {
        db_context: {
          update: jest.fn().mockResolvedValue(true), // Mock the database update
        },
        interval: null, // Mock interval
      };
      const res = {
        write: jest.fn(),
        end: jest.fn(),
      };

      await moveElevators(req, res, elevators);
      console.log(elevators)
      // Assert that elevators have moved one step up
      expect(elevators[0].currentFloor).toBe(elevators[0].targetFloor);
      expect(elevators[0].doorsOpen).toBe(false);
      expect(elevators[0].direction).toBe(elevators[0].direction);
      expect(elevators[0].status).toBe('moving');

      // Assert that elevators have moved one step down
      expect(elevators[1].currentFloor).toBe(4);
      expect(elevators[1].doorsOpen).toBe(false);
      expect(elevators[1].direction).toBe(elevators[1].direction);
      expect(elevators[1].status).toBe('moving');

      // Assert that update function was called with correct arguments
      expect(req.db_context.update).toHaveBeenCalledWith('elevators_info', { elevatorID: elevators[0].elevatorID }, elevators[0]);

      // Assert that res.write and res.end were called
      expect(res.write).toHaveBeenCalledTimes(2); // You might need to adjust this based on the exact behavior
      expect(res.end).toHaveBeenCalledTimes(0);
    });

    // Add more test cases for different scenarios
  });

  // ...
});
