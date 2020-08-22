const handleError = (error, req, res, next) => {
    return res
        .status(error.status || 500)
        .json({
            error: {
                status: error.status,
                message: error.message || `Something went wrong.. Please try again`

            }
        })
}

module.exports = handleError;
