const Mail = require("../models/Mail.js");
const User = require("../models/User.js");

const getMails = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });
  if (userIsRegistered) {
    const mails = await Mail.find({});

    res.status(201).json(mails);
  } else {
    res.status(401).send("Unauthorized Access.");
  }
};

const addMail = async (req, res) => {
  const { name, email, message } = req.body;
  if (name || email || message) {
    const newMail = new Mail({
      name,
      email,
      message,
    });
    await newMail.save();

    res.status(201).json({ message: "Correo Enviado." });
  } else {
    res.status(400).json({ message: "Error" });
  }
};

const deleteMail = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });
  const { id } = req.params;
  if (userIsRegistered) {
    await Mail.findByIdAndDelete({ _id: id });
    res.status(201).json({ message: "Eliminado" });
  } else {
    res.status(401).send("Unauthorized Access.");
  }
};

module.exports = {
  getMails,
  addMail,
  deleteMail,
};
