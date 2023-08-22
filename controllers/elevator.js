const db = require("../db.json");
const { calculateNearestElevator, moveElevators } = require("../services/elevatorService");

const getElevators = async (req, res) => {
  
  try {
    const misc = await req.db_context.search("elevators_info",{});
    let i = 0;
    
    // const interval = setInterval(() => {
      
    //   if (i<5) {
    //     res.write('Sending...\n')
    //     i++
    //   }else{
    //     res.end("Complete")
    //     clearInterval(interval)
    //   }
    //   console.log("interval running")
      
    // }, 2000);
    return res.status(200).json({
      data: misc,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const requestElevator = async(req, res) => {
  res.header('Content-Type', 'text/event-stream');
  try {
    const { db_context, query:{requestFloor, targetFloor} } = req
    if (!requestFloor || !targetFloor)
      return res.status(400).json({
        message: "Please provide target floor and request floor ",
        success: false,
      });


      const idle_elevators = await db_context.search("elevators_info",{});
      const nearest_idle_elevator = await calculateNearestElevator(Number(requestFloor), idle_elevators);
      

      /**
       * update return elevator to active and 
       * target and destination floor
       */
      nearest_idle_elevator.status = "active";
      nearest_idle_elevator.direction = nearest_idle_elevator.currentFloor>requestFloor? "down" : 'up';
      nearest_idle_elevator.targetFloor = Number(requestFloor);
      nearest_idle_elevator.destinationFloor = Number(targetFloor);

      const interval = setInterval(async() => {
        req.interval = interval
        await moveElevators(req, res, [nearest_idle_elevator])
      }, 5000);
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { getElevators, requestElevator };
