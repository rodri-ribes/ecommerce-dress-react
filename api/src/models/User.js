const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  image: {
    link: {
      type: String,
    },
    name: {
      type: String,
    },
  },

  email: {
    type: String,
    required: true,
  },
  domicile: {
    address: {
      type: String,
    },
    location: {
      type: String,
    },
    province: {
      type: String,
    },
    postal_code: {
      type: Number,
    },
  },
  whatsapp: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  shopping: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  ban: {
    type: Boolean,
    default: false,
  },
  rol: {
    type: String,
    default: "user",
  },
});

module.exports = mongoose.model("User", UserSchema);
