const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URL;
mongoose
    .connect(uri, {useUnifiedTopology: true})
    .then(() => {
        console.log('Connected to Mongo!');
    })
    .catch((err) => {
        console.error('Error connecting to Mongo', err);
    });


const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');


app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/order', ordersRouter);

app.listen(port, () => {
    console.log('listening on port : ' + port);
});