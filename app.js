const express = require("express");
const indexRouter = require("./Routes/index");
const teacherRouter = require("./Routes/teacher")
const studentRouter = require("./Routes/student");
const createError = require('http-errors');
const morgan = require("morgan");

//dotenv inorder to access environment variables in .env file
require("dotenv").config();
require("./middlewares/init_mongodb");

const app = express();
app.use(morgan('dev'));


// Getting the port number from the .env file
const PORT = process.env.PORT || 3000;

// Using the middleware error handler function to handle errors
const { errorHandler } = require("./middlewares/error_handlers");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

app.use("", indexRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.use(errorHandler);
