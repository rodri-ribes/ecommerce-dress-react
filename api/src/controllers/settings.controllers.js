const Setting = require("../models/Setting.js");
const User = require("../models/User.js");

const getSettings = async (req, res) => {
  const setting = await Setting.find({});

  res.status(200).json(setting[0]);
};

const addSettings = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const {
    name_of_the_page,
    email,
    whatsapp,
    local_active,
    schedule,
    alias_mp,
    card_payment,
    store_address,
    free_min_amount,
    shipping_price,
  } = req.body;
  if (userIsRegistered) {
    const setting = new Setting({
      name_of_the_page,
      email,
      whatsapp,
      local_active,
      schedule,
      alias_mp,
      card_payment,
      store_address,
      free_min_amount,
      shipping_price,
    });

    await setting.save();

    res.status(201).json({ message: "Configuración creada", setting });
  } else {
    res.status(401).send("Unauthorized Access.");
  }
};

const updateSettings = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const {
    name_of_the_page,
    email,
    whatsapp,
    local_active,
    schedule,
    alias_mp,
    card_payment,
    store_address,
    free_min_amount,
    shipping_price,
    _id,
  } = req.body;

  if (userIsRegistered) {
    await Setting.findOneAndUpdate(
      { _id },
      {
        name_of_the_page,
        email,
        whatsapp,
        local_active,
        schedule,
        alias_mp,
        card_payment,
        store_address,
        free_min_amount,
        shipping_price,
      }
    );

    let setting = await Setting.findById({ _id });

    res.status(201).json({ message: "Configuración Actualizada", setting });
  } else {
    res.status(401).send("Unauthorized Access.");
  }
};

module.exports = {
  getSettings,
  updateSettings,
  addSettings,
};
