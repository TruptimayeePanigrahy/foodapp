const mongoose = require("mongoose");

const orderschema = mongoose.Schema({
  
  items: [{
    name: String,
    price: Number,
    quantity: Number
  }],
  totalPrice: Number,
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  status: {
    type: String,
    enum: ["placed", "preparing", "on the way", "delivered"]
  }
})

const ordermodel = mongoose.model("order", orderschema);
module.exports = { ordermodel }
