module.exports = {
  moveElevators: async (elevators) => {
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
          elevator.direction === "up" && elevator.status !== "idle"
            ? elevator.currentFloor++
            : elevator.currentFloor--;

          if (elevator.currentFloor === elevator.targetFloor) {
            if (elevator.targetFloor !== elevator.destinationFloor) {
              /**
               * Elevator has reached requested floor
               * set new target as the destination floor
               * open and close door
               */
              await elevatorDoorHandler(elevator);
              elevator.targetFloor = elevator.destinationFloor;
            } else {
              // Elevator has reached the destination floor
              elevator.targetFloor = null;
              elevator.direction = "idle";
              elevator.status = "idle";
              await elevatorDoorHandler(elevator);
            }
          }

          console.log(elevator);
        }
        
        // Move the next elevator (recursive step)
        await moveElevatorRecursive(elevatorIndex + 1);
      }
    }

    // Start moving the elevators recursively
    await moveElevatorRecursive(0);
  }
};
