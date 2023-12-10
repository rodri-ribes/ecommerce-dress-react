const Customer = require("../models/Customer.js");
const User = require("../models/User.js");
const Product = require("../models/Product.js");

const updateStock = async (customer, action) => {
  //funcion para mandar mensajes al usuario (falta de productos para la compra)
  const sendMessage = async (msj, id) => {
    try {
      let customer = await Customer.findOne({ _id: id });
      customer.notification.push(msj);
      customer.save();
    } catch (error) {
      console.log(error);
    }
  };

  // se edita el producto (incrementar los vendidos, descontar el stock)
  customer?.products?.map(async (e) => {
    let product = await Product.findById({ _id: e.id });

    if (action === "reserve") {
      //sumamos dependiendo la cantidad vendida a sold
      product.sold += parseInt(e.amount);
      // descontamos la cantidad vendida y el color
      product?.sizeAndStock?.forEach((f) => {
        if (f.waist == e.waist) {
          f?.list?.forEach((l) => {
            if (e.color == l.color) {
              if (parseInt(l.stock) == 0) {
                sendMessage(
                  {
                    text: `Lamentamos informarte que el producto ${e.title} con las características que seleccionaste no está disponible en este momento. Tienes la opción de elegir otro producto o, si lo prefieres, te ofrecemos un reembolso. Un administrador se comunicará contigo lo más pronto posible para atender tu solicitud.`,
                  },
                  customer._id
                );
              }
              if (parseInt(l.stock) < parseInt(e.amount)) {
                sendMessage(
                  {
                    text: `Lamentamos informarte que un cliente ha adquirido una cantidad de X unidades del producto ${e.title}, dejándonos con un stock restante de ${l.stock} unidades disponibles. Por favor, háznoslo saber si deseas adquirir el stock restante o si prefieres que te realicemos un reembolso por las unidades no disponibles. Estaremos a la espera de tu decisión.`,
                  },
                  customer._id
                );
              } else {
                l.stock = l.stock - e.amount;
              }
            }
          });
          //si nos quedamos sin stock, quitamos el obj
          let aux = f.list.filter((x) => x.stock !== 0);
          f.list = aux;
        }
      });
      //si el listado de un talle determinado se vacia, quitamos el talle
      let arr = product.sizeAndStock.filter((a) => a?.list?.length !== 0);
      product.sizeAndStock = arr;
      //si se vacia todo el stock, ocultamos el producto.
      if (product.sizeAndStock.length < 1) {
        product.show = false;
      }
    } else {
      //restamos dependiendo la cantidad vendida a sold
      product.sold -= parseInt(e.amount);

      // devolvemos la cantidad restada

      let existeElTalle = true;

      product?.sizeAndStock?.forEach((f) => {
        if (f.waist == e.waist) {
          existeElTalle = false;
          f?.list?.forEach((l) => {
            if (e.color == l.color) {
              l.stock += e.amount;
            } else {
              f?.list?.push({
                color: e.color,
                stock: e.amount,
              });
            }
          });
          //si nos quedamos sin stock, quitamos el obj
          let aux = f.list.filter((x) => x.stock !== 0);
          f.list = aux;
        }
      });

      //si existeElTalle es false, significa que encontro el talle y se sumo el stock,
      //si es true significa que fue el ultimo vendido y se borro el talle

      if (existeElTalle) {
        let obj = {
          waist: e.talle,
          list: [
            {
              color: e.color,
              stock: e.amount,
            },
          ],
        };

        product.sizeAndStock.push(obj);
      }
    }

    //guardamos el producto modificado.
    await product.save();
  });
};

const addCustomer = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const {
    user,
    total,
    shipment,
    paymentMethod,
    products,
    status,
    date,
    notification,
  } = req.body;

  if (userIsRegistered) {
    if( user &&
      total &&
      shipment &&
      paymentMethod &&
      products &&
      status &&
      date){
        try {
          //se guarda la compra
          let customer = await Customer.create({
            user,
            products,
            paymentMethod,
            date,
            shipment,
            total,
            notification,
            status,
          });
    
          //se borra el carrito
          userIsRegistered.cart = [];
    
          //se añade la compra de los productos al arr de shopping
          products.forEach((e) => {
            userIsRegistered.shopping.push(e.id);
          });
    
          await userIsRegistered.save();
    
          res.status(201).send({ message: "Compra realizada", customer });
        } catch (error) {
          console.log(error);
          res.status(400).send("Hubo un error, intente mas tarde.");
        }
      }else{
        res.status(400).send("Hubo un error, intente mas tarde.");
      }
  } else {
    res.status(401).send("Hubo un error, intente mas tarde.");
  }
};

const getCustomers = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  if (userIsRegistered) {
    try {
      let customers = await Customer.find({})
        .populate("user")
        .populate("products");
      res.status(200).json({ message: "", customers });
    } catch (error) {
      console.log(error);
      res.status(201).send("Hubo un error, intente mas tarde.");
    }
  } else {
    res.status(401).send("Hubo un error, intente mas tarde.");
  }
};

const getCustomer = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const { id } = req.params;
  console.log(id)
  if (userIsRegistered) {
    try {
      let customer = await Customer.find({ user: id })
        .populate("user")
        .populate("products");
      res.status(200).json(customer);
    } catch (error) {
      console.log(error);
      res.status(201).send("Hubo un error, intente mas tarde.");
    }
  } else {
    res.status(401).send("Hubo un error, intente mas tarde.");
  }
};

const addMessage = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const { msj, id } = req.body;

  if (userIsRegistered) {
    try {
      let customer = await Customer.findOne({ _id: id });

      customer.chat.push(msj);
      await customer.save();

      let customerAux = await customer.populate("user");

      res.status(201).json(customerAux);
    } catch (error) {
      console.log(error);
      res.status(201).send("Hubo un error, intente mas tarde.");
    }
  } else {
    res.status(401).send("Hubo un error, intente mas tarde.");
  }
};

const updateCustomer = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const { proofOfPayment, status, id } = req.body;

  if (userIsRegistered) {
    try {
      await Customer.findOneAndUpdate(
        { _id: id },
        {
          proofOfPayment,
          status,
        }
      );

      let customer = await Customer.findOne({ _id: id }).populate("user");

      //se guardan los productos del comprador
      if (
        status?.text?.includes("Esperando al cliente...") ||
        status?.text?.includes("Preparando pedido...")
      ) {
        updateStock(customer, "reserve");
      }

      res.status(201).json({ message: "Actualizado", customer });
    } catch (error) {
      console.log(error);
      res.status(201).send("Hubo un error, intente mas tarde.");
    }
  } else {
    res.status(401).send("Hubo un error, intente mas tarde.");
  }
};

const deleteCustomer = async (req, res) => {
  const userIsRegistered = await User.findOne({ _id: req.userId });

  const { id } = req.params;

  if (userIsRegistered) {
    try {
      let customer = await Customer.findOne({ _id: id });
      let user = await User.findOne({ _id: customer?.user });

      //quitamos los productos comprados del arr del user
      customer?.products?.forEach((e) => {
        user.shopping = user.shopping.filter(
          (f) => f.toString() !== e._id.toString()
        );
      });

      //se devuelven los productos al almacen
      if (
        customer.status.text.includes("Esperando al cliente...") ||
        customer.status.text.includes("Preparando pedido...")
      ) {
        updateStock(customer, "return");
      }

      await user.save();
      await Customer.findOneAndDelete({ _id: id });

      res.status(201).json({ message: "Venta Eliminada" });
    } catch (error) {
      console.log(error);
      res.status(201).send("Hubo un error, intente mas tarde.");
    }
  } else {
    res.status(401).send("Hubo un error, intente mas tarde.");
  }
};

module.exports = {
  addCustomer,
  addMessage,
  getCustomer,
  getCustomers,
  deleteCustomer,
  updateCustomer,
};
