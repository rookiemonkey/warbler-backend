const toError = name => {
    return new Error(`Missing Parameter ${name}`);
}

module.exports = toError;