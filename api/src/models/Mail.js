const mongoose = require("mongoose");
const { Schema } = mongoose;

const MailSchema = new Schema({
  name: String,
  email: String,
  message: String,
});

module.exports = mongoose.model("Mail", MailSchema);
