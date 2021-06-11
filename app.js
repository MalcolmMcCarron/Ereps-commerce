

// var finalProduct = require('./ereps.js');
const stripe = require('stripe')('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');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

// Process application/json
app.use(bodyParser.json());

app.use(express.json());

app.use(express.static('.'));



//     STUFF RELATING TO THE SERVER



const YOUR_DOMAIN = 'http://localhost:3000';




// app.post('/cart.html', async (req,res) {
// 
//   req.body
//
// })



app.post('/create-checkout-session', async (req, res) => {


  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Total Amount',
            images: ['https://i.imgur.com/n7M4u9i.png'],
          },
          unit_amount: 10000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  res.json({ id: session.id });
});


app.listen(3000, () => console.log('Running on port 3000'));
