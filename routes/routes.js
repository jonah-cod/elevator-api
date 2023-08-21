const express = require("express");
const { getElevators, requestElevator } = require("../controllers/elevator");

const router = express.Router();

router.get("", getElevators);
router.get("/request", requestElevator);

module.exports = { router };
