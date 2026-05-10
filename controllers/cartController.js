const Cart = require("../models/Cart");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");

exports.addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({
    user: req.user.id
  });

  if (!cart) {
    cart = new Cart({
      user: req.user.id,
      items: []
    });
  }

  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    const newQuantity = cart.items[itemIndex].quantity + quantity;

    if (newQuantity > product.stock) {
      res.status(400);
      throw new Error("Not enough stock");
    }

    cart.items[itemIndex].quantity = newQuantity;
  } else {
    if (quantity > product.stock) {
      res.status(400);
      throw new Error("Not enough stock");
    }

    cart.items.push({
      product: productId,
      quantity
    });
  }

  await cart.save();

  res.json(cart);
});

exports.getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({
    user: req.user.id
  }).populate("items.product");

  res.json(cart);
});

exports.removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({
    user: req.user.id
  });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  await cart.save();

  res.json(cart);
});