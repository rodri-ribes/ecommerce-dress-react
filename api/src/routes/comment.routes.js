const { Router } = require("express");
const {
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller.js");
const verifyToken = require("./verifyToken.js");

const router = Router();

router.post("/add", verifyToken, createComment);

router.patch("/update", verifyToken, updateComment);

router.delete("/delete/:id/:id_product", verifyToken, deleteComment);

module.exports = router;
