const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const User = require("../models/User"); // Your user model
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.post("/add", upload.single("image"), async (req, res) => {
  const { name, price, category } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const newItem = new Item({
    name,
    price,
    category,
    imageUrl,
  });

  await newItem.save();
  res.status(201).json({ item: newItem });
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find(); // Get ALL items
    res.json({ items });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST /api/cart/add
router.post("/cart/add", async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ message: "User ID and Item ID are required" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: check if item exists
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "item not found" });

    // Check if item already in cart
    const cartItemIndex = user.cart.findIndex(
      (ci) => ci.itemId.toString() === itemId
    );
    if (cartItemIndex > -1) {
      // Increase quantity
      user.cart[cartItemIndex].quantity += 1;
    } else {
      // Add new item
      user.cart.push({ itemId, quantity: 1 });
    }

    await user.save();

    res.json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/cart/remove", async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    if (!userId || !itemId) {
      return res
        .status(400)
        .json({ message: "User ID and Item ID are required" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Optional: check if item exists
    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ message: "item not found" });

    const cartItemIndex = user.cart.findIndex(
      (ci) => ci.itemId.toString() === itemId
    );

    // Assuming cartItemIndex is the index of the item to update
    if (user.cart[cartItemIndex].quantity > 1) {
      // Decrease quantity by 1
      user.cart[cartItemIndex].quantity -= 1;
    } else {
      // Quantity is 1, remove item completely
      user.cart.splice(cartItemIndex, 1);
    }

    await user.save();

    res.json({ message: "Item added to cart", cart: user.cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/cart/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("cart.itemId");
    if (!user) return res.status(404).json({ message: "User not found" });

    const cart = user.cart.map((ci) => ({
      item: ci.itemId,
      quantity: ci.quantity,
    }));
    res.json({ cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
