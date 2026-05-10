const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");

exports.placeOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user.id
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = item.product;

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    if (item.quantity > product.stock) {
      res.status(400);
      throw new Error(`${product.name} does not have enough stock`);
    }

    totalPrice += product.price * item.quantity;

    orderItems.push({
      product: product._id,
      quantity: item.quantity,
      price: product.price
    });
  }

  const order = await Order.create({
    user: req.user.id,
    items: orderItems,
    totalPrice
  });

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(
      item.product._id,
      {
        $inc: {
          stock: -item.quantity
        }
      }
    );
  }

  await Cart.updateOne(
    {
      _id: cart._id
    },
    {
      $set: {
        items: []
      }
    }
  );

  const createdOrder = await Order.findById(order._id)
    .populate("items.product");

  res.status(201).json(createdOrder);
});

exports.getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user.id
  }).populate("items.product");

  res.json(orders);
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;

  await order.save();

  res.json(order);
});