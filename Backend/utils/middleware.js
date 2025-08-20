exports.asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

exports.errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (process.env.NODE_ENV === "production" && !err.isOperational) {
        message = "Something went wrong!";
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

