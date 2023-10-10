const functions = require("firebase-functions");
// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIP_KEY);

require("dotenv").config();

const app = express();
app.use(cors({ origin: "https://clone-e65e0.web.app/" }));
// app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("Hello World"));
app.get("/evangadi", (request, response) =>
  response.status(200).send("Evangadi")
);

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  if (total > 0) {
    const payementIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    response.status(201).send({
      clientSecret: payementIntent.client_secret,
    });
    console.log("payement request recived for this amount >>>>>>>", total);
  } else {
    response.status(200).send({
      message: "cant process the payement",
    });
  }

  //   console.log("Payment Request Recieved for this amount >>>", total);

  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: total,
  //     currency: "usd",
  //   });
  //   // OK - Created
  //   response.status(201).send({ clientSecret: paymentIntent.client_secret });
});

app.listen(process.env.PORT, console.log("amazon backend server"));
// exports.api = functions.https.onRequest(app);

// BASE_URL;
// http://127.0.0.1:5001/clone-e65e0/us-central1/api
