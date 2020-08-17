const handleError = (err, req, res, next) => {
    // the err comes from the first middleware defined in index.js incase its not a 404 error
    // this is by-the-way with the use of multi-line ternary, its working
    (err.status === 400)
        ? res.json({
            error: {
                errorCode: 400,
                message: `Username/Email is already taken. Please use a different Username/Email`
            }
        })
        : res.status(err.status || 500).json({
            error: {
                errorCode: err.status,
                message: err.message || `Something went wrong.. Please try again`
            }
        })
}

module.exports = handleError;
