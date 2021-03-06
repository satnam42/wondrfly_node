"use strict";
const moment = require('moment');
const fs = require('fs');
var nodemailer = require('nodemailer')
let path = require('path');
const aws_accessKey = require('config').get('awsSes').accessKey
const aws_secretKey = require('config').get('awsSes').secretKey
const aws_region = require('config').get('awsSes').region
var sesTransport = require('nodemailer-ses-transport');

const ObjectId = require("mongodb").ObjectID;
const build = async (model, provider, context) => {
    const { userId, programId } = model;
    const log = context.logger.start(`services:favourites:build${model}`);
    const favourite = await new db.favourite({
        user: userId,
        program: programId,
        providerId: provider,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();
    log.end();
    return favourite;
};

const saveProgramEmail = async (firstName, email, templatePath, subject, OTP) => {
    let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
    mailBody = mailBody.replace(/{{firstname}}/g, firstName);

    if (OTP) {
        mailBody = mailBody.replace(/{{OTP}}/g, OTP);
    }

    // Send e-mail using AWS SES
    var sesTransporter = nodemailer.createTransport(sesTransport({
        accessKeyId: aws_accessKey,
        secretAccessKey: aws_secretKey,
        region: aws_region
    }));


    let mailOptions = {
        from: "accounts@wondrfly.com",
        to: email, //sending to: E-mail
        subject: subject,
        html: mailBody,
        attachments: [
            {
                filename: 'logo.png',
                path: `${__dirname}/../public/images/logo.png`,
                cid: 'logo1' //same cid value as in the html img src
            },

            {
                filename: 'logo_white.png',
                path: `${__dirname}/../public/images/logo_white.png`,
                cid: 'logo_white' //same cid value as in the html img src
            }
        ]

    };
    let mailSent = await sesTransporter.sendMail(mailOptions);
    if (mailSent) {
        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return
    } else {
        log.end()
        throw new Error("Unable to send email try after sometime");
    }
}

const create = async (model, context) => {
    const log = context.logger.start("services:favourites:create");
    const Favourites = await db.favourite.find({ $and: [{ user: model.userId }, { program: model.programId }] })
    const program = await db.program.findById(model.programId);
    // console.log('program =>>', program.user)
    const user = await db.user.findById(model.userId);
    if (Favourites.length > 0) {
        return "favourite already exist";
    }
    if (program) {
        const favourite = build(model, program.user, context);
        const Favourites = await db.saveProvider.findOne({ $and: [{ parent: model.userId }, { provider: program.user }] })
        if (!Favourites) {
            const favourite = await new db.saveProvider({
                parent: model.userId,
                provider: program.user,
                createdOn: new Date(),
                updateOn: new Date(),
            }).save();
        }

        if (user) {
            const today = new Date()
            let date = moment(today).format('YYYY-MM-DD');
            await new db.notification({
                title: 'Save Program',
                description: `Program saved.`,
                user: user.id,
                createdOn: new Date(),
                updateOn: new Date(),
            }).save();
            let templatePath = '../emailTemplates/save_program.html';
            let subject = "Program saving";

            saveProgramEmail(user.firstName, user.email, templatePath, subject);
        }
        log.end();
        return favourite;
    }

};

const getAllfavourites = async (context) => {
    const log = context.logger.start(`services:favourites:getAllfavourites`);
    const Favourites = await db.favourite.find({}).populate('program');
    if (Favourites.length < 0) {
        throw new Error("Favourites not found");
    }
    log.end();
    return Favourites;
};

const getFavouritesByUserId = async (query, context) => {
    const log = context.logger.start(`services:favourites:getFavouritesByParentId`);
    if (!query.parentId) {
        throw new Error("userId not found");
    }
    // const favourites = await db.favourite.find({ user: query.parentId }).populate('program');
    // if (favourites.length < 0) {
    //     throw new Error("Favourites not found");
    // }
    const favourites = await db.favourite.aggregate([
        {
            $match: {
                user: ObjectId(query.parentId),
            },
        },
        {
            $lookup: {
                from: 'programs',
                localField: 'program',
                foreignField: '_id',
                as: 'programs',
            },
        },
        {
            $lookup: {
                from: 'tags',
                localField: 'programs.subCategoryIds',
                foreignField: '_id',
                as: 'tags',
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'programs.categoryId',
                foreignField: '_id',
                as: 'category',
            },
        },
    ])
    log.end();
    return favourites;
};

const removeById = async (id, context) => {
    const log = context.logger.start(`services:favourites:removeById`);

    if (!id) {
        throw new Error("favourite id not found");
    }
    let isFavourite = await db.favourite.findOne({ "program": ObjectId(id) })
    if (!isFavourite) {
        throw new Error("favourite not found");
    }
    if (isFavourite) {
        const today = new Date()
        let date = moment(today).format('YYYY-MM-DD');
        await new db.notification({
            title: 'unSave Program',
            description: `Program removed from saved.`,
            user: isFavourite.user,
            createdOn: new Date(),
            updateOn: new Date(),
        }).save();
    }

    let isDeleted = await db.favourite.deleteOne({ "program": ObjectId(id) })
    if (isDeleted) {
        throw new Error("something went wrong");
    }
    log.end();
    return 'favourite removed succesfully'
};


const savedProvidersUserId = async (query, context) => {
    const log = context.logger.start(`services:favourites:savedProvidersUserId`);
    if (!query.parentId) {
        throw new Error("userId not found");
    }
    // const favourites = await db.favourite.find({ user: query.parentId }).populate('program');
    // if (favourites.length < 0) {
    //     throw new Error("Favourites not found");
    // }
    //     const favourites = await db.favourite.aggregate([
    //         {
    //             $match: {
    //                 user: ObjectId(query.parentId),
    //             },
    //         },
    //         {
    //             $lookup: {
    //                 from: 'programs',
    //                 localField: 'program',
    //                 foreignField: '_id',
    //                 as: 'programs',
    //             },
    //         },
    //     ])
    //     let providers = []
    //     let finalFavourites = []
    //     for (let fav of favourites) {
    //         // console.log('=>_>_>', fav.programs[0])
    //         // console.log('==========---------<><><><>', fav.programs[0].user)
    //         if (fav.programs.length > 0) {
    //             providers.push(fav.programs[0].user.toString())
    //         }
    //     }
    //     let uniquePro = [...new Set(providers)];
    //     for (let fav of uniquePro) {
    //         const group = {}
    //         const providerFav = await db.saveProvider.findOne({ provider: fav })
    //         const provider = await db.user.findOne({ _id: fav })
    //         if (providerFav && provider) {
    //             provider.isFav = true
    //         } else {
    //             provider.isFav = false
    //         }
    //         // const programs = await db.favourite.find({ user: ObjectId(fav) }).populate('program')
    //         const programs = await db.favourite.aggregate([
    //             {
    //                 $match: {
    //                     user: ObjectId(query.parentId),
    //                 },
    //             },
    //             {
    //                 $lookup: {
    //                     from: 'programs',
    //                     localField: 'program',
    //                     foreignField: '_id',
    //                     as: 'programs',
    //                 },
    //             },
    //         ])
    //         console.log('provider ==>>>>', provider._id)
    //         console.log('programs =>>', programs);
    //         group.user = provider;
    //         group.programs = programs
    //         finalFavourites.push(group)
    //     }
    //     log.end();
    //     return finalFavourites;
    // };
    const favProvider = await db.saveProvider.find({ parent: query.parentId }).populate('provider');
    let finalFavourites = []
    for (let favPro of favProvider) {
        // console.log('provider ==', favPro.provider._id)
        const group = {}
        // { $match: { $or: [{ user: ObjectId(query.parentId) }, { providerId: ObjectId(provider._id) }] } }
        const favourites = await db.favourite.aggregate([
            { $match: { user: ObjectId(query.parentId), providerId: ObjectId(favPro.provider._id) } },
            {
                $lookup: {
                    from: 'programs',
                    localField: 'program',
                    foreignField: '_id',
                    as: 'programs',
                },
            },
        ])
        group.provider = favPro.provider;
        // console.log('provider ==>>>>>', favPro.provider);

        if (favourites.length > 0) {
            group.favourites = favourites
            // console.log('favourites ==>>>>>', favourites[0].programs);

        }
        // console.log('provider ==>>>>>', favPro.provider);
        // console.log('favourites ==>>>>>', favourites);
        finalFavourites.push(group);
    }

    // console.log('favProvider ==>>>', favProvider);
    // console.log('favourites ==>>>', finalFavourites);
    log.end();
    return finalFavourites;
};

const unsaveProvider = async (id, context) => {
    const log = context.logger.start(`services:favourites:unsaveProvider`);
    if (!id) {
        throw new Error("favourite id not found");
    }
    let isFavourite = await db.saveProvider.findOne({ provider: ObjectId(id) })
    if (!isFavourite) {
        throw new Error("favourite not found");
    }
    let isDeleted = await db.saveProvider.deleteOne({ provider: ObjectId(id) })
    log.end();
    return 'provider unsaved succesfully'
};

exports.create = create;
exports.getAllfavourites = getAllfavourites;
exports.removeById = removeById
exports.getFavouritesByUserId = getFavouritesByUserId
exports.savedProvidersUserId = savedProvidersUserId;
exports.unsaveProvider = unsaveProvider;