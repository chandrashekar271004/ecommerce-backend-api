const express = require("express");
const router = express.Router();

const validate = require("../middleware/validate");
const orderStatusSchema = require("../validators/orderValidator");

const {
  placeOrder,
  getUserOrders,
  updateOrderStatus
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// User routes
router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getUserOrders);

// Admin routes
router.put(
  "/:id/status",
  protect,
  adminOnly,
  validate(orderStatusSchema),
  updateOrderStatus
);

module.exports = router;