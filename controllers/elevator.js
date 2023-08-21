const db = require("../db.json");

const getElevators = async (req, res) => {
  try {
    const misc = await req.db_context.search("elevators",{});

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
  try {
    const { db_context, query:{requestFloor, targetFloor} } = req
    if (!requestFloor || !targetFloor)
      return res.status(400).json({
        message: "Please provide target floor and request floor ",
        success: false,
      });


    const res = await db_context.insert('elevators_requests', {})
    return res.status(200).json({
      message: { requestFloor, targetFloor },
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
