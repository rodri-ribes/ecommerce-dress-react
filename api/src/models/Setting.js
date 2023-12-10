const mongoose = require("mongoose");
const { Schema } = mongoose;

const SettingSchema = new Schema({
  name_of_the_page: String,
  email: String,
  whatsapp: String,
  local_active: String,
  schedule: String,
  alias_mp: String,
  card_payment: String,
  store_address: {
    address: String,
    location: String,
    province: String,
  },
  free_min_amount: Number,
  shipping_price: Number,
});

module.exports = mongoose.model("Setting", SettingSchema);
