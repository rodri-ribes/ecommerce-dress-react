const { Router } = require("express");
const userRoutes = require("./user.routes.js");
const productRoutes = require("./product.routes.js");
const commentRoutes = require("./comment.routes.js");
const reviewsRoutes = require("./reviews.routes.js");
const customerRoutes = require("./customer.routes.js");
const settingRoutes = require("./settings.routes.js");
const payment = require("./payment.routes.js");
const mailRoutes = require("./mail.routes.js");

const router = Router();

router.use("/user", userRoutes);

router.use("/customer", customerRoutes);

router.use("/product", productRoutes);

router.use("/comment", commentRoutes);

router.use("/review", reviewsRoutes);

router.use("/setting", settingRoutes);

router.use("/payment", payment);

router.use("/mail", mailRoutes);

module.exports = router;
