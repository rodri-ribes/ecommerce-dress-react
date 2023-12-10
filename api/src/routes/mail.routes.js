const { Router } = require("express");
const {
  getMails,
  addMail,
  deleteMail,
} = require("../controllers/mail.controllers");

const verifyToken = require("./verifyToken");

const router = Router();

router.get("/get", verifyToken, getMails);

router.post("/add", addMail);

router.delete("/delete/:id", verifyToken, deleteMail);

module.exports = router;
