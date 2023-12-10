const axios = require("axios");

class PaymentService {
  async createPayment(req, res) {
    const url = "https://api.mercadopago.com/checkout/preferences";

    const body = {
      // payer: {
      //     email: "test_user_974738482@testuser.com"
      // },
      items: req.body.cartMp,
      back_urls: {
        failure: "http://localhost:3000/finalize-purchase/failure",
        pending: "http://localhost:3000/finalize-purchase/pending",
        success: "http://localhost:3000/finalize-purchase/success",
      },
      redirect_urls: {
        failure: "http://localhost:3000/finalize-purchase/failure",
        pending: "http://localhost:3000/finalize-purchase/pending",
        success: "http://localhost:3000/finalize-purchase/success",
      },
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
        Authorization: `Bearer APP_USR-4278714985238108-102908-2ac51d459894638b0c90898a5b883d23-369605563`,
      },
    });
    return payment.data;
  }
}

module.exports = PaymentService;
