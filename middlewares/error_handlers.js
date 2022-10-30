const createError = require("http-errors");

//Handling error for invalid api requests
const notFound = (req, res, next) => {

  next(createError(404, "Not Found"));
};

const errorHandler = (error, req, res, next) => {
  //check the status code of the error messages and set response status
  res.status(error.status || 404);

  //Send the error message
  res.send({
    error: {
      status: error.status || 404,
      message: error.message ,
      stack:
        process.env.NODE_ENV === "development"
          ? error.stack.split("\n")[0]
          : null,
    },
  });
};

module.exports = { notFound, errorHandler };
