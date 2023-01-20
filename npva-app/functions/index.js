const functions     = require("firebase-functions");
const express       = require("express");
const cors          = require("cors");
const stripe        = require("stripe")('sk_test_51MNgF5SIxOAwwBfzNhisdjNWuMqSyujAdjrR9rRBJqnv8OsubE7dIqogAVdIEM9wSatNwNqkPV2XbvduzB6qAmz900JE07iEIq');

// API

// App config
const app           = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json())

// API routes
app.get('/', (req, res) => {
    res.status(200).send('Hello World!')
})

app.post('/payments/create', async (req, res) => {
    const total = req.query.total;
    const payload = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "INR",
        confirm: true,
        payment_method: payload.id
    });

    res.status(201).send({
        id: payload.id,
        payload: paymentIntent,
        reply: 'success'
    })
})

// Listen command
exports.api = functions.https.onRequest(app);