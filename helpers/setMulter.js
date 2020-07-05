const toError = require("./toError");

const setMulter = (
    uploader = toError('Multer')
) => {

    const storage = uploader.diskStorage({
        // configure the filename before upload
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    });

    const imageFilter = function (req, file, cb) {
        // accept image files only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    return uploader({ storage: storage, fileFilter: imageFilter });

}

module.exports = setMulter;