function errorHandeler(res, errorMessage, statusCode) {
    res.status(statusCode || 500);
    res.send({
        status: 'error',
        message: `🔴 Error: ${errorMessage}`
    });
}

module.exports = errorHandeler;