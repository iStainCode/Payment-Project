import { MercadoPagoConfig, Payment } from "mercadopago";

import { TOKEN_MERCADO_PAGO } from "../config.js";

export const createOrder = async (req, res) => {
  // Step 2: Initialize the client object
  const client = new MercadoPagoConfig({
    accessToken: TOKEN_MERCADO_PAGO,
    options: { timeout: 5000, idempotencyKey: "abc" },
  });

  // Step 3: Initialize the API object
  const payment = new Payment(client);

  // Step 4: Create the request object
  const body = {
    transaction_amount: 12.34,
    description: "<DESCRIPTION>",
    payment_method_id: "<PAYMENT_METHOD_ID>",
    payer: {
      email: "<EMAIL>",
    },
  };

  // Step 5: Make the request
  payment.create({ body }).then(console.log).catch(console.log);
};
