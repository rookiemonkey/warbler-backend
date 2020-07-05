const toError = require("./toError");

const setCloudinary = (
    cloud = toError('Cloudinary')
) => {
    return {
        cloud_name: 'promises',
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
}

module.exports = setCloudinary;