const db = require("../db.json");

const getElevators = async (req, res) => {
  try {
    const misc = await req.db_context.search("elevators", {
      // capacity:5
    });

    // const user = await req.db_context.exec('findElevator', [userId, targetUserId]);

    // const misc2 = await req.db_context.getById(elevatorId, "elevatorId");
    // const update =  req.db_context.update('elevators', {elevatorId:elevatorId}, {capacity:10});

    // const elevators = db.elevators.map((s) => {
    //   const { buildingName, floorId, currentDirection } =
    //     db.building_elevators.find(
    //       (elevator) => elevator.elevatorId === s.elevatorId,
    //     ) || {};
    //   return {
    //     elevatorId: s.elevatorId,
    //     capacity: s.capacity,
    //     floorId,
    //     currentDirection,
    //     buildingName,
    //     elevatorStatus: buildingName && floorId ? "occupied" : "available",
    //   };
    // });

    return res.status(200).json({
      message: misc,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const requestElevator = (req, res) => {
  try {
    const { elevatorId, targetFloor } = req.query;
    if (!elevatorId || !targetFloor)
      return res.status(400).json({
        message: "Please provide target elevator and floor ",
        success: false,
      });

    return res.status(200).json({
      message: { elevatorId, targetFloor },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { getElevators, requestElevator };
