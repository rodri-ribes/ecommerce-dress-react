const Comment = require("../models/Comment.js");

const User = require("../models/User.js");

const Product = require("../models/Product.js");

const createComment = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const { user, id_product, comment, date } = req.body;

  if (userIsRegistered) {
    if(user && id_product && comment && date){
      try {
        let addComment = await Comment.create({
          user,
          comment,
          date,
          id_product,
        });
  
        let product = await Product.findOne({ idConfig: id_product });
  
        product.comments.push(addComment._id);
        await product.save();
  
        let newComment = await addComment.populate("user", {
          image: 1,
          firstname: 1,
          lastname: 1,
          rol: 1,
        });
  
        res.status(201).json({ message: "Comentario Publicado.", newComment });
      } catch (error) {
        res.status(201).send("Hubo un error, intente mas tarde.");
      }
    }
  } else {
    res.status(401).send("Hubo un error, intente mas tarde.");
  }
};

const deleteComment = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const { id, id_product } = req.params;

  if (userIsRegistered) {
    if(id && id_product){
      try {
        await Comment.findOneAndDelete({ _id: id });
  
        let product = await Product.findOne({ idConfig: id_product });
  
        let aux = product.comments.filter((e) => e.toString() !== id);
  
        product.comments = [...aux];
  
        await product.save();
  
        res.status(200).json({ message: "Comentario Eliminado." });
      } catch (error) {
        console.log(error)
        res.status(400).send("Hubo un error, intente mas tarde.");
      }
    }else{
      res.status(400).send("Hubo un error, intente mas tarde.");
    }
  } else {
    res.status(401).send("Unauthorized Access.");
  }
};

const updateComment = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const { id, comment, date, view, response } = req.body;

  if (userIsRegistered) {
    try {
      await Comment.findOneAndUpdate(
        { _id: id },
        {
          date,
          comment,
          view,
          response,
        }
      );

      let newComment = await Comment.findOne({ _id: id }).populate("user", {
        image: 1,
        firstname: 1,
        lastname: 1,
        rol: 1,
      });

      res.status(200).json({ message: "Comentario Actualizado.", newComment });
    } catch (error) {
      console.log(error)
      res.status(400).send("Hubo un error, intente mas tarde.");
    }
  } else {
    res.status(401).send("Unauthorized Access.");
    }
};

module.exports = {
  createComment,
  deleteComment,
  updateComment,
};
