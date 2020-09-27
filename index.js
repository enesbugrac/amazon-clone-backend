const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HTozRFhgBIvpBlsmkvnGDOzuwCveNLt7CffF3B24m07s2Kv4Mu91hp8Ggn1459ZCbCA2hlERihOLPrOOFX2Vra0000h8YzpSt"
);
//API

//-App config
const app = express();

//-MiddleWares

app.use(cors({ origin: true }));
app.use(express.json());

//-API routes

app.get("/", (req, res) => res.status(200).send("hello woeld"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Recieved >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

//-Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/e-clone-71c9a/us-central1/api
