const imageUrl = require('config').get('image').url
const fs = require('fs');


const getPicUrl = async (file, context) => {
    const log = context.logger.start(`services:uploads:getPicUrl`);
    if (!file) {
        throw new Error("image not found");
    }
    const url = imageUrl + 'assets/images/' + file.filename

    log.end();
    return url
};

exports.getPicUrl = getPicUrl;