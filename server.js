// import express from 'express';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const compression =  require('compression');
const enforce = require('express-sslify');

if (process.env.NODE_ENV != 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(cors());

if(process.env.NODE_ENV == 'production') {
    //_dirname is part of Node.js, it returns the current directory
    //path.join calculates the overall directory
    // exprress static servers a file from the given path
    app.use(express.static(path.join(__dirname, 'client/build')));

    //basically serving the react files, i believe so
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
})

//serve service worker for PWA
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
});

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(500).send({ error: stripeErr });
        } else {
            res.status(200).send({ success: stripeRes });
        }
    })

})
