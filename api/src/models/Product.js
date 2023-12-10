const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
  idConfig: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  images: [
    {
      link: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
  price: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
  },
  offer: {
    type: Number,
    default: 0,
  },
  gender: {
    type: String,
  },
  category: {
    type: String,
  },
  brand: {
    type: String,
  },
  sizeAndStock: [
    {
      waist: String,
      list: [
        {
          color: String,
          stock: Number,
        },
      ],
    },
  ],
  sold: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  show: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Product", ProductSchema);
