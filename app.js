const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const { connectDB } = require("./config/db.config");
const userRouter = require("./controllers/user");
const handleError = require('./utils/errorHandler');
const { isLoggedIn } = require("./controllers/middleware");
const parkingRouter = require("./controllers/parking");
const paymentMethodRouter = require("./controllers/paymentMethod");
const bookingRouter = require("./controllers/booking");
const spaceRouter = require("./controllers/spaceRouter");
const cors = require('cors');
const reviewRouter = require("./controllers/review");
const cityRouter =require("./controllers/city")
const addressRouter =require("./controllers/address")

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Set body-parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 5000;

app.use(cors())


// const url = "mongodb+srv://nandupvt02:"+pass_word+"@parkeasy.rhkw5gi.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(process.env.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.connection.once("open", async () => {
    console.log("Connected to database");
});
      
mongoose.connection.on("error", (err) => {
    console.log("Error connecting to database  ", err);
});

// Connect Database
//connectDB();


app.get('/', isLoggedIn, async (req, res) => {
    res.json({ message: 'Hello world!'})
})

app.use("/user", userRouter)
app.use("/parking", parkingRouter)
app.use("/paymentMethod", paymentMethodRouter)
app.use("/booking", bookingRouter)
app.use("/space", spaceRouter)
app.use("/review", reviewRouter)
app.use("/city", cityRouter)
app.use("/address", addressRouter)

// Error handler

app.use((req, res, next) => {
    const error = new Error("Not Found")
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    handleError(error, res);
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})