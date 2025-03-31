const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };
    error.message = err.message || "Server Error";
    console.error(err);

    //type of error

    //mongoose bad objectId
    if (err.name === "CastError") {
      const message = "Resource Not Found";

      error = new Error(message);
      error.statusCode = 404;
    }

    //mongoose duplicate key error
    if (err.code === 11000) {
      const message = "Duplicate field value enetered";
      error = new Error(message);
      error.statusCode = 400;
    }

    //mongooose validation error message
    if (er.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = errorMiddleware;