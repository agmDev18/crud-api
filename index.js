require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const productRoute = require('./src/routes/product.route');
const userRoute = require('./src/routes/user.route');
const errorMiddleware = require('./src/middleware/errorMiddleware');
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const CONNECTION_ALLOWED = process.env.CONNECTION_ALLOWED

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


var corsOptions = {
    origin: CONNECTION_ALLOWED,
}

app.use(cors(corsOptions));

//routes

app.use('/api', productRoute);
app.use('/api', userRoute);

app.use(errorMiddleware);

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('connected to mongodb');
        app.listen(PORT, () => {
            console.log(`Node api is running on port ${PORT}`);
        });

    }).catch((error) => {
        console.log(error);
    })