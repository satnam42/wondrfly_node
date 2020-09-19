
"use strict";
const fs = require('fs');
const csv = require('csvtojson')
const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const imageUrl = require('config').get('image').url
const buildUser = async (model, context) => {
    const log = context.logger.start(`services:users:buildUser${model}`);
    const user = await new db.user({
        firstName: model.firstName,
        type: model.type || '',
        email: model.email,
        phoneNumber: model.Phone,
        password: model.password,
        role: 'provider',
        street: model.street,
        state: model.state,
        source: model.source,
        city: model.city,
        country: model.country,
        note: model.note,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return user;
};
const build = async (model, context) => {
    const log = context.logger.start(`services:providers:build${model}`);
    let password = await encrypt.getHash('321@LetsPlay!@#$%', context);
    if (model.Email == "") {
        let sNo = model.Sno.toString()
        model.Email = sNo + 'letsplay.us'
    }
    const user = await new db.user({
        firstName: model.Name,
        phone: model.Phone,
        email: model.Email,
        addressLine1: model.Address,
        password: password,
        role: 'provider'
    }).save()

    if (user) {
        const provider = await new db.provider({
            user: user._id
        }).save()
        log.end();
        return provider;
    }
    else (
        log.info(`user id Not Found for record no ${model.Sno}`)
    )



    // const provider = await new db.provider({
    //     name: model.Name,
    //     phone: model.Phone,
    //     category: model.Category,
    //     description: model.Description,
    //     email: model.Email,
    //     facebook: model.Facebook,
    //     fullAddress: model.Ful_Address,
    //     hours: model.Hours,
    //     instagram: model.Instagram,
    //     lat: model.Lat,
    //     long: model.Long,
    //     linkedin: model.Linkedin,
    //     rating: model.Rating,
    //     reviews: model.Reviews,
    //     twitter: model.Twitter,
    //     website: model.Website,
    //     youtube: model.Youtube,
    //     merchantVerified: model.Merchant_Verified,
    //     listingURL: model.Listing_URL,
    //     imageURL: model.Image_URL,
    //     createdOn: new Date(),
    //     updateOn: new Date(),
    // }).save();
    // log.end();
    // return provider;
};

const setProviderDetail = (model, provider, context) => {
    const log = context.logger.start("services:providers:setBasicInfo");
    if (model.categoryId !== "string" && model.categoryId !== undefined) {
        provider.category = model.categoryId;
    }
    if (model.about !== "string" && model.about !== undefined) {
        provider.about = model.about;
    }
    if (model.description !== "string" && model.description !== undefined) {
        provider.description = model.description;
    }
    if (model.facebook !== "string" && model.facebook !== undefined) {
        provider.facebook = model.facebook;
    }
    if (model.hours !== "string" && model.hours !== undefined) {
        provider.hours = model.hours;
    }
    if (model.imageURL !== "string" && model.imageURL !== undefined) {
        provider.imageURL = model.imageURL;
    }
    if (model.merchantVerified !== "string" && model.merchantVerified !== undefined) {
        provider.merchantVerified = model.merchantVerified;
    }
    if (model.linkedin !== "string" && model.linkedin !== undefined) {
        provider.linkedin = model.linkedin;
    }
    if (model.listingURL !== "string" && model.listingURL !== undefined) {
        provider.listingURL = model.listingURL;
    }
    if (model.twitter !== "string" && model.twitter !== undefined) {
        provider.twitter = model.twitter;
    }
    if (model.website !== "string" && model.website !== undefined) {
        provider.website = model.website;
    }
    if (model.youtube !== "string" && model.youtube !== undefined) {
        provider.youtube = model.youtube;
    }
    if (model.awards !== "string" && model.awards !== undefined) {
        provider.awards = model.awards;
    }
    if (model.instagram !== "string" && model.instagram !== undefined) {
        provider.instagram = model.instagram;
    }

    provider.updateOn = new Date()
    log.end()
    provider.save();
    // const provider = await setproviderDetail(model, entity, context);

    return provider;

}
const setBasicInfo = (model, user, context) => {
    const log = context.logger.start("services:providers:set");
    if (model.firstName !== "string" && model.firstName !== undefined) {
        user.firstName = model.firstName;
    }
    if (model.lastName !== "string" && model.lastName !== undefined) {
        user.lastName = model.lastName;
    }
    if (model.sex !== "string" && model.sex !== undefined) {
        user.sex = model.sex;
    }
    if (model.phoneNumber !== "string" && model.phoneNumber !== undefined) {
        user.phoneNumber = model.phoneNumber;
    }
    if (model.addressLine1 !== "string" && model.addressLine1 !== undefined) {
        user.addressLine1 = model.addressLine1;
    }
    if (model.addressLine2 !== "string" && model.addressLine2 !== undefined) {
        user.addressLine2 = model.addressLine2;
    }
    if (model.city !== "string" && model.city !== undefined) {
        user.city = model.city;
    }
    if (model.country !== "string" && model.country !== undefined) {
        user.country = model.country;
    }
    if (model.zipCode !== "string" && model.zipCode !== undefined) {
        user.zipCode = model.zipCode;
    }
    if (model.lat !== "string" && model.lat !== undefined) {
        user.lat = model.lat;
    }
    if (model.long !== "string" && model.long !== undefined) {
        user.long = model.long;
    }
    if (model.stripeToken !== "string" && model.stripeToken !== undefined) {
        user.stripeToken = model.stripeToken;
    }
    if (model.stripeKey !== "string" && model.stripeKey !== undefined) {
        user.stripeKey = model.stripeKey;
    }
    if (model.securityQuestion !== "string" && model.securityQuestion !== undefined) {
        user.securityQuestion = model.securityQuestion;
    }
    if (model.answer !== "string" && model.answer !== undefined) {
        user.answer = model.answer;
    }
    user.lastModifiedBy = context.user.id
    user.updateOn = new Date()
    log.end()
    user.save();
    // const provider = await setproviderDetail(model, entity, context);

    return user;
};

const buildBanner = async (provider, files) => {
    let bannerImages = []
    let bannerUrl = ''

    await files.forEach(file => {
        bannerUrl = imageUrl + 'assets/images/' + file.filename
        bannerImages.push(bannerUrl)
    });

    return bannerImages
}

const importProvider = async (file, context) => {
    const log = context.logger.start("services:providers:setBasicInfo");
    if (file.fieldname != 'csv') {
        throw new Error("please provide csv file");
    }

    const rows = await csv().fromFile(file.path);
    if (rows.length < 1) {
        throw new Error("csv file is empty !please provide some data ");
    }

    // if (rows.length > 1000) {
    //     throw new Error("csv file have too data");
    // }
    let count = 0
    for (let row of rows) {
        if (row.Name !== "") {
            count++
            await build(row, context);
        }
    }
    // console.log(`total record inserted ${count}`)
    log.info(`${count} record inserted `)
    await fs.unlinkSync(file.path);
    return `total record inserted ${count}`;
};


const getAllProvider = async (context) => {
    const log = context.logger.start(`services:providers:getAllProvider`);
    const providers = await db.provider.find({}).sort({ date: -1 })
    log.end();
    return providers;
};

const updateProvider = async (id, model, context) => {
    const log = context.logger.start(`services:providers:update`);
    let user = await db.user.findById(id);

    let provider = await db.provider.findOne({ user: user.id });
    if (!user) {
        throw new Error("provider Not Found");
    }
    const userBasicInfo = await setBasicInfo(model, user, context);
    const providerDetail = await setProviderDetail(model, provider, context);
    log.end();
    return providerDetail
};

const uploadBannerPic = async (id, files, context) => {
    const log = context.logger.start(`services:provider:uploadBannerPic`);
    const provider = await db.provider.findOne({ user: { $eq: id } });
    if (files.length < 0) {
        throw new Error("image not found");
    }
    if (!provider) {
        throw new Error("provider not found");
    }
    let banners = await buildBanner(provider, files)
    provider.banners = banners
    await provider.save();
    log.end();
    return provider
};
const getProvideById = async (id, context) => {
    const log = context.logger.start(`services:providers:getAllProvider`);
    const providers = await db.provider.findOne({ user: id }).populate('user')
    log.end();
    return providers;
};

const getProvideByEmail = async (email, context) => {
    const log = context.logger.start(`services:providers:getProvideByEmail`);
    if (!email) {
        throw new Error("emial id is requried");
    }
    const user = await db.user.findOne({ email: { $eq: email } });
    if (!user) {
        throw new Error("provider not found");
    }
    log.end();
    return user;
};
const search = async (name, context) => {
    const log = context.logger.start(`services:providers:search`);
    if (!name) {
        throw new Error("name is required");
    }
    const providers = await db.user.find({ firstName: { "$regex": '.*' + name + '.*', "$options": 'i' } }
    ).limit(5);
    if (providers.length < 1) {
        throw new Error("provider not found");
    }
    log.end();
    return providers;
};
const addProvider = async (model, context) => {
    const log = context.logger.start("services:providers:addProvider");
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already resgister");
    }

    model.password = await encrypt.getHash('321@LetsPlay!@#$%', context);
    const user = await buildUser(model, context);
    if (user.role == 'provider') {
        await new db.provider({
            user: user._id,
            createdOn: new Date(),
            updateOn: new Date()
        }).save();
    }
    log.end();
    return user;
};
exports.importProvider = importProvider;
exports.getAllProvider = getAllProvider;
exports.updateProvider = updateProvider;
exports.uploadBannerPic = uploadBannerPic;
exports.getProvideById = getProvideById;
exports.getProvideByEmail = getProvideByEmail;
exports.search = search;
exports.addProvider = addProvider;

