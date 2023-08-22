const express = require("express");
const { getElevators, requestElevator } = require("../controllers/elevator");

const router = express.Router();

router.get("/info", getElevators);
router.get("/request", requestElevator);

module.exports = { router };
