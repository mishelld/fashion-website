const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  imageUrl: { type: String },
});

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
