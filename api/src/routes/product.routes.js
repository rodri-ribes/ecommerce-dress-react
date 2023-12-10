const { Router } = require("express");
const {
  createProduct,
  updateProduct,
  removeProduct,
  getProduct,
  getProducts,
  updateAll,
  discountProduct,
} = require("../controllers/product.controllers");

const verifyToken = require("./verifyToken");

const router = Router();

router.post("/add", verifyToken, createProduct);

router.patch("/update", verifyToken, updateProduct);

router.patch("/updateall", verifyToken, updateAll);

router.patch("/updatediscount", verifyToken, discountProduct);

router.delete("/delete/:idConfig", verifyToken, removeProduct);

router.get("/getone/:idConfig", getProduct);

router.get("/getall", getProducts);

module.exports = router;
