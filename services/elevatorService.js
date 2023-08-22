module.exports = {
  // moveElevator service
  moveElevators: async (req, res, elevators) => {
    async function elevatorDoorHandler(elevator) {
      elevator.doorsOpen = true;

      // Close the doors after a delay
      setTimeout(() => {
        elevator.doorsOpen = false;
      }, 2000);
    }

    async function moveElevatorRecursive(elevatorIndex) {
      if (elevatorIndex < elevators.length) {
        const elevator = elevators[elevatorIndex];

        if (elevator.targetFloor !== null) {
          if (elevator.currentFloor === elevator.targetFloor) {
            if (
              elevator.currentFloor === elevator.targetFloor &&
              elevator.targetFloor === elevator.destinationFloor
            ) {
              /**
               * Elevator has reached the destination floor
               * free elevator on db
               */
              elevator.targetFloor = null;
              elevator.direction = "none";
              elevator.status = "idle";
              await elevatorDoorHandler(elevator);

              await req.db_context.update('elevators_info', {elevatorID: elevator.elevatorID}, elevator)
              //clear interval
              clearInterval(req.interval);
              
              return res.end("Doors open, we are here!\n");
            } else {
              /**
               * Elevator has reached requested floor
               * set new target as the destination floor
               * open and close door
               */console.log("here")
              await elevatorDoorHandler(elevator);
              elevator.targetFloor = elevator.destinationFloor;
              res.write("Doors open, please board!\n");
              /**
               * adjust elevator direction
               *  */
              elevator.currentFloor > elevator.targetFloor
                ? (elevator.direction = "down")
                : (elevator.direction = "up");
            }
          }

          /**
           * moving elevator up or down
           * according to direction
           * persist elevator movement on db
           */
          await req.db_context.update('elevators_info', {elevatorID: elevator.elevatorID}, elevator)

          elevator.direction === "up" && elevator.status !== "idle"
            ? elevator.currentFloor++
            : elevator.currentFloor--;

          const { currentFloor, direction, elevatorID } = elevator;
          res.write(
            `Elevator: ${elevatorID} going ${direction} currently at: ${currentFloor}\n`
          );
          
        }

        // Move the next elevator (recursive step)
        await moveElevatorRecursive(elevatorIndex + 1);
      }
    }

    // Start moving the elevators recursively
    await moveElevatorRecursive(0);
  },

  //get closest idle elevator

  calculateNearestElevator: async function (requestedFloor, elevators) {
    const availableElevators = elevators.filter(
      (elevator) => elevator.status === "idle"
    );

    if (availableElevators.length === 0) {
      return null; // No available elevators
    }

    // Calculate the absolute differences between elevator's current floor and the requested floor
    const distances = availableElevators.map((elevator) =>
      Math.abs(elevator.currentFloor - requestedFloor)
    );

    // Find the index of the elevator with the smallest distance
    const nearestElevatorIndex = distances.indexOf(Math.min(...distances));

    // Return the nearest available elevator
    return availableElevators[nearestElevatorIndex];
  },
};
