+
    "use strict";
const fs = require('fs');
const csv = require('csvtojson')
const build = async (model, context) => {
    const log = context.logger.start(`services:providers:build${model}`);
    const provider = await new db.provider({
        name: model.Name,
        phone: model.Phone,
        category: model.Category,
        description: model.Description,
        email: model.Email,
        facebook: model.Facebook,
        fullAddress: model.Ful_Address,
        hours: model.Hours,
        instagram: model.Instagram,
        lat: model.Lat,
        long: model.Long,
        linkedin: model.Linkedin,
        rating: model.Rating,
        reviews: model.Reviews,
        twitter: model.Twitter,
        website: model.Website,
        youtube: model.Youtube,
        merchantVerified: model.Merchant_Verified,
        listingURL: model.Listing_URL,
        imageURL: model.Image_URL,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    // return provider;
};

const importProvider = async (file, context) => {
    if (file.fieldname != 'csv') {
        throw new Error("please provide csv file ");
    }
    const rows = await csv().fromFile(file.path);
    if (rows.length < 1) {
        throw new Error("csv is empty !please provide some data ");
    }
    if (rows.length > 1000) {
        throw new Error("csv file have too data");
    }
    rows.forEach(row => {
        build(row, context);
    });
    await fs.unlinkSync(file.path);
    return 'csv import successfully ';
};
const getAllProvider = async (context) => {
    const log = context.logger.start(`services:providers:getAllProvider`);
    const providers = await db.provider.find({})
    log.end();
    return providers;
};

exports.importProvider = importProvider;
exports.getAllProvider = getAllProvider;

