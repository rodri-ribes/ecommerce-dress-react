const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { SECRET_KEY } = process.env;

const User = require("../models/User.js");


const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      let comparatorUser = await User.findOne({
        email: email,
      });

      if (comparatorUser) {
        const pass = await bcrypt.compare(password, comparatorUser.password);

        if (pass) {
          const token = jwt.sign({ _id: comparatorUser.id }, SECRET_KEY);

          let user = await User.findById({ _id: comparatorUser._id }).select({
            password: 0,
          });

          res.status(202).json({
            token,
            user,
          });
        } else {
          res.status(401).send(`Email o Contraseña incorrecto`);
        }
      } else {
        res.status(401).send(`Email o Contraseña incorrecto`);
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const registerUser = async (req, res) => {
  const { firstname, lastname, image, email, password, whatsapp } = req.body;

  if(firstname && lastname && image && email && password && whatsapp){
    try {
      let existEmail = await User.findOne({
        email,
      });
  
      if (existEmail) {
        return res.status(400).send("Ya esta registrado el Email");
      } else {
        let passwordHash = await bcrypt.hash(password, 10);
  
        const newUser = new User({
          firstname,
          lastname,
          email,
          whatsapp,
          image,
          password: passwordHash,
        });
  
        await newUser.save();
        
        const token = jwt.sign({ _id: newUser.id }, SECRET_KEY);
  
        res.status(201).json({ token, user: newUser });
      }
    } catch (error) {
      console.log(error);
    }
  }

};

const getUser = async (req, res) => {
  if (req.userId) {
    try {
      const user = await User.findOne({ _id: req.userId })
        .select({
          password: 0,
        })
        .populate("cart")
        .populate("favorites");
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).send("Unauthorized Access.");
      }
    } catch (error) {
      console.log(error)
    }
  }else{
    res.status(401).send("Unauthorized Access.");
  }
};

const updateUser = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const {
    firstname,
    lastname,
    image,
    email,
    domicile,
    whatsapp,
    favorite,
    product,
  } = req.body;

  if (userIsRegistered) {
    //add to favorites and remove from favorites logic
    if (favorite) {
      let remove = false;

      if (userIsRegistered.favorites.includes(favorite)) {
        remove = true;
        let arr = userIsRegistered.favorites.filter(
          (f) => f.toString() !== favorite.toString()
        );
        userIsRegistered.favorites = [...arr];
      } else {
        userIsRegistered.favorites.push(favorite);
      }
      await userIsRegistered.save();

      let user = await User.findOne({ _id: req.userId })
        .populate("favorites")
        .populate("cart");

      res.status(200).json({
        message: remove ? "Eliminado de Favoritos" : "Agregado a Favoritos",
        user,
      });
    } else if (product) {
      //add to cart o delete
      if (userIsRegistered.cart.includes(product)) {
        let aux = userIsRegistered.cart.filter((p) => p.toString() !== product);
        userIsRegistered.cart = [...aux];
      } else {
        userIsRegistered.cart.push(product);
      }
      await userIsRegistered.save();

      let user = await User.findOne({ _id: req.userId })
        .populate("favorites")
        .populate("cart");

      res.status(200).json({ message: "Perfil Actualizado", user });
    } else {
      try {
        await User.findOneAndUpdate(
          { _id: req.userId },
          {
            firstname,
            lastname,
            image,
            email,
            domicile,
            whatsapp,
            favorite,
          }
        );

        //se hace esto para mandar como respuesta el obj user modificado
        let user = await User.findOne({ _id: req.userId })
          .populate("favorites")
          .populate("cart");

        res.status(200).json({ message: "Perfil Actualizado", user });
      } catch (error) {
        console.log(error);
        res.status(404).send("Hubo un error, intente mas tarde...");
      }
    }
  } else {
    res.status(401).send("Unauthorized Access.");
  }
};

const updatePassword = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });

  let { oldPassword, newPassword } = req.body;

  if (user) {
    let okey = await bcrypt.compare(oldPassword, user.password);

    if (okey) {
      let passwordHash = await bcrypt.hash(newPassword, 10);

      try {
        user.password = passwordHash;
        await user.save();

        res.status(202).send("Contraseña Actualizada");
      } catch (error) {
        console.log(error)
        res.status(404).send("Hubo un error, intente mas tarde...");
      }
    } else {
      res.status(404).send("Contraseña Incorrecta");
    }
  } else {
    res.status(401).send("Unauthorized Access.");
  }
};

const updateCart = async (req, res) => {
  const user = await User.findOne({ _id: req.userId });

  const { product } = req.body;

  if (user) {
    try {
      if (user.cart.includes(product)) {
        let aux = user.cart.filter((p) => p.toString() !== product);
        user.cart = [...aux];
      } else {
        user.cart.push(product);
      }
  
      await user.save();
  
      let updateUser = await User.findOne({ _id: req.userId })
        .populate("favorites")
        .populate("cart");
      res.status(201).json(updateUser);
    } catch (error) {
      console.log(error)
    }
  } else {
    res.status(401).send("Unauthorized Access.");
  }
};

module.exports = {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  updateCart,
  // deleteCart,
  updatePassword,
};
