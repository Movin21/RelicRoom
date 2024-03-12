const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  let errorResponse = {
    title: "Server Error",
    message: "An unexpected error occurred",
    stackTrace: err.stack,
  };

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      errorResponse = {
        title: "Validation Failed",
        message: err.message,
        stackTrace: err.stack,
      };
      break;
    case constants.NOT_FOUND:
      errorResponse = {
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      };
      break;
    case constants.UNAUTHORIZED:
      errorResponse = {
        title: "Unauthorized",
        message: err.message,
        stackTrace: err.stack,
      };
      break;
    case constants.FORBIDDEN:
      errorResponse = {
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      };
      break;
    case constants.SERVER_ERROR:
      errorResponse = {
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      };
      break;
    default:
      console.error("No Error, All good !");
      break;
  }

  res.status(statusCode).json(errorResponse);
};

module.exports = errorHandler;
