const { Router } = require("express");
const {
  getSettings,
  updateSettings,
  addSettings,
} = require("../controllers/settings.controllers");

const verifyToken = require("./verifyToken");

const router = Router();

router.get("/get", getSettings);

router.post("/add", verifyToken, addSettings);

router.patch("/update", verifyToken, updateSettings);

module.exports = router;
