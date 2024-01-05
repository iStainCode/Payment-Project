import mercadopago from "mercadopago";

import { TOKEN_MERCADO_PAGO } from "../config.js";

export const createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: TOKEN_MERCADO_PAGO,
  });

  const products = req.body;

  // console.log(products);

  const allProducts = products.map((product) => ({
    title: product.name,
    quantity: 1,
    currency_id: "PEN",
    unit_price: parseFloat(product.price.$numberDecimal),
  }));

  // console.log(allProducts);

  const result = await mercadopago.preferences.create({
    items: allProducts,
    back_urls: {
      success: "http://localhost:5173/",
      failure: "http://localhost:5173/",
      pending: "http://localhost:5173/pending",
    },
    notification_url: "https://eb39-179-6-4-245.ngrok-free.app/webhook",
  });

  console.log(result.body);

  res.status(200).json(result);
};

export const receiveWebhook = async (req, res) => {
  console.log(req.query);

  const payment = req.query;

  try {
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log('---------------------------------')


      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);

    return res.sendStatus(500).json({ error: error.message });
  }
};
