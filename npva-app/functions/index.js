const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51MNgF5SIxOAwwBfzNhisdjNWuMqSyujAdjrR9rRBJqnv8OsubE7dIqogAVdIEM9wSatNwNqkPV2XbvduzB6qAmz900JE07iEIq');

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json())

// API routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;

    console.log("Payment request received BOOM!! for this amount >>>>>>", total);

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "INR",
    });

    res.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })
})

// Listen command
exports.api = functions.https.onRequest(app);

// http://127.0.0.1:5001/npva-d6f76/us-central1/api


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
