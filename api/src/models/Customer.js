const mongoose = require("mongoose");
const { Schema } = mongoose;

const CustomerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  //no se uso ref Object _id porque se agrego nuevos atributos
  products: [
    {
      title: {
        type: String,
      },
      content: {
        type: String,
      },
      image: {
        type: String,
      },
      idConfig: {
        type: String,
      },
      id: {
        type: String,
      },
      price: {
        type: Number,
      },
      discount: {
        type: Number,
      },
      offer: {
        type: Number,
      },
      category: {
        type: String,
      },
      amount: {
        type: Number,
      },
      color: {
        type: String,
      },
      waist: {
        type: String,
      },
    },
  ],
  proofOfPayment: {
    name: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  paymentMethod: {
    type: String,
  },
  shipment: {
    type: String,
  },
  date: {
    type: String,
  },
  total: {
    type: Number,
  },
  status: {
    text: {
      type: String,
    },
    style: {
      type: Boolean,
    },
  },
  notification: [
    {
      text: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("Customer", CustomerSchema);
