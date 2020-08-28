
"use strict";
const ObjectId = require("mongodb").ObjectID;
var moment = require('moment'); // require for date formating
const csv = require('csvtojson')
const fs = require('fs');
const buildImportProgram = async (model, context) => {
    const log = context.logger.start(`services:programs:buildImportProgram${model}`);
    let age = {
        from: 0,
        to: 0
    }

    if (model.AgeRange !== "" && model.AgeRange !== "-" && model.AgeRange !== undefined && model.AgeRange !== null) {
        if (model.AgeRange.includes('above') || model.AgeRange.includes('under') || model.AgeRange.includes('all') || model.AgeRange.includes('+')) {

            if (model.AgeRange.includes('above')) {
                let ageRange = model.AgeRange.match(/\d+/g).map(Number);
                if (!ageRange) {
                    age.from = 0
                    age.to = 0
                }
                else {
                    age.from = ageRange[0]
                    age.to = 100
                }
            };

            if (model.AgeRange.includes('under')) {
                let ageRange = model.AgeRange.match(/\d+/g).map(Number);
                if (!ageRange) {
                    age.from = 0
                    age.to = 0
                }
                else {
                    age.from = ageRange[0]
                    age.to = 0
                }
            };
            if (model.AgeRange.includes('all')) {
                age.from = 0
                age.to = 100
            };
            if (model.AgeRange.includes('+')) {
                let ageRange = model.AgeRange.match(/\d+/g).map(Number);
                if (!ageRange) {
                    age.from = 0
                    age.to = 0
                }
                else {
                    age.from = ageRange[0]
                    age.to = 100
                }
            };

        }
        else {
            let isMonths = model.AgeRange.includes('months')
            if (isMonths) {
                age.from = 0
                age.to = 0
            }
            else {
                // set age range
                let ageRange = model.AgeRange.match(/\d+/g).map(Number);
                if (ageRange.length == 2) {
                    age.from = ageRange[0]
                    age.to = ageRange[1]
                }
            }

        }
    }

    let category
    let tag
    let categoryId
    let categories = []
    let tagByCategoryId
    let tags = []
    let date = {
        from: '',
        to: ''
    }
    let time = {
        from: '',
        to: ''
    }
    console.log("StartDateIsValid", moment(model.StartDate).isValid())
    if (model.StartDate !== "" && model.StartDate !== "-" && model.StartDate !== undefined && model.StartDate !== null && moment(model.StartDate).isValid()) {
        date.from = moment(model.StartDate);
        log.info('date.from', date.from)
        console.log('date.from', date.from)
    }

    else {
        date.from = new Date()
    }
    console.log("EndDateIsValid", moment(model.StartDate).isValid())
    if (model.EndDate !== "" && model.EndDate !== "-" && model.EndDate !== undefined && model.EndDate !== null && moment(model.EndDate).isValid()) {
        date.to = moment(model.EndDate);
        log.info('date.to', date.to)
        console.log('date.to', date.to)

    } else {
        time.to = new Date()
    }

    console.log("timeFromIsValid", moment(model.StartDate + " " + model.StarTime).isValid())

    if (model.StarTime !== "" && model.StarTime !== "-" && model.StarTime !== undefined && model.StarTime !== null && moment(model.StartDate + " " + model.StarTime).isValid()) {
        time.from = moment(model.StartDate + " " + model.StarTime);
        log.info('time.from', time.from)
        console.log('time.from', time.from)

    }

    else {
        time.from = new Date()
    }

    console.log("timeTOIsValid", moment(model.EndDate + " " + model.EndTime).isValid())

    if (model.EndTime !== "" && model.EndTime !== "-" && model.EndTime !== undefined && model.EndTime !== null && moment(model.EndDate + " " + model.EndTime).isValid()) {
        time.to = moment(model.EndDate + " " + model.EndTime);
        log.info('time.to', time.to)
        console.log('time.to', time.to)

    } else {
        time.to = new Date()
    }

    category = await db.category.findOne({ name: { $eq: model.Catogory } });

    if (!category) {
        category = await new db.category({
            name: model.Catogory ? model.Catogory : 'undefine',
            description: 'csv file data',
            createdOn: new Date(),
            updateOn: new Date(),
        }).save();
        categoryId = category.id
        await categories.push(categoryId)
    }

    else {
        categoryId = category.id
        console.log('category.id', category.id)
        await categories.push(categoryId)
        tagByCategoryId = await db.tag.findOne({ categoryIds: ObjectId(categoryId) }, { name: model.SubCategory })
    }

    if (!tagByCategoryId) {

        tag = await new db.tag({
            name: model.SubCategory ? model.SubCategory : 'undefine',
            description: 'csv file data',
            categoryIds: categories,
            createdOn: new Date(),
            updateOn: new Date(),
        }).save();
        console.log('tagID', tag.id)
        tags.push(tag.id)

    }

    else {
        console.log('tagID', tagByCategoryId.id)
        tags.push(tagByCategoryId.id)
    }

    let user = await db.user.findOne({ firstName: { "$regex": '.*' + model.Reference + '.*', "$options": 'i' } })

    if (!user) {
        user = await db.user.findOne({ firstName: model.Reference })
    }

    console.log('userID', user.id)
    console.log('userID', user.id)

    await new db.program({
        name: model.ProgramName,
        description: model.Description,
        price: model.Price,
        ageGroup: age,
        date: date,
        time: time,
        status: model.status || 'active',
        user: user.id,
        tags: tags,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();

    return
    log.end();
}


const build = async (model, context) => {

    const log = context.logger.start(`services:programs:build${model}`);
    const program = await new db.program({
        name: model.name,
        description: model.description,
        type: model.type,
        price: model.price,
        code: model.code,
        programCoverPic: model.programCoverPic,
        location: model.location,
        ageGroup: model.ageGroup,
        date: model.date,
        time: model.time,
        bookingCancelledIn: model.bookingCancelledIn,
        duration: model.duration,
        isFree: model.isFree,
        pricePerParticipant: model.pricePerParticipant,
        priceForSiblings: model.priceForSiblings,
        specialInstructions: model.specialInstructions,
        adultAssistanceIsRequried: model.adultAssistanceIsRequried,
        capacity: model.capacity,
        emails: model.emails,
        batches: model.batches,
        status: model.status || 'active',
        user: model.userId,
        addresses: model.addresses,
        tags: model.tags,
        createdOn: new Date(),
        updateOn: new Date(),
    }).save();

    log.end();

    return program;

};
const buildTimelineUrl = async (files) => {

    let bannerImages = []
    let bannerUrl = ''
    await files.forEach(file => {
        bannerUrl = imageUrl + 'assets/images/' + file.filename
        bannerImages.push(bannerUrl)
    });
    return bannerImages
}
const set = (model, program, context) => {
    const log = context.logger.start("services:programs:set");
    if (model.name !== "string" && model.name !== undefined) {
        program.name = model.name;
    }
    if (model.description !== "string" && model.description !== undefined) {
        program.description = model.description;
    }
    if (model.type !== "string" && model.type !== undefined) {
        program.type = model.type;
    }
    if (model.price !== "string" && model.price !== undefined) {
        program.price = model.price;
    }
    if (model.programCoverPic !== "string" && model.programCoverPic !== undefined) {
        program.programCoverPic = model.programCoverPic;
    }
    if (model.code !== "string" && model.code !== undefined) {
        program.code = model.code;
    }
    if (model.location !== "string" && model.location !== undefined) {
        program.location = model.location;
    }
    if (model.ageGroup.from !== "string" && model.ageGroup.to !== "string" && model.ageGroup.to !== undefined && model.ageGroup.from) {
        program.ageGroup = model.ageGroup;
    }
    if (model.date.from !== "string" && model.date.to !== "string" && model.date.from !== undefined && model.date.to !== undefined) {
        program.date = model.date;
    }
    if (model.time.from !== "string" && model.time.to !== "string" && model.time.to !== undefined && model.time.from !== undefined) {
        program.time = model.time;
    }
    if (model.bookingCancelledIn !== "string" && model.bookingCancelledIn !== undefined) {
        program.bookingCancelledIn = model.bookingCancelledIn;
    }
    if (model.duration !== "string" && model.duration !== undefined) {
        program.duration = model.duration;
    }
    if (model.isFree !== "string" && model.isFree !== undefined) {
        program.isFree = model.isFree;
    }
    if (model.pricePerParticipant !== "string" && model.pricePerParticipant !== undefined) {
        program.pricePerParticipant = model.pricePerParticipant;
    }
    if (model.priceForSiblings !== "string" && model.priceForSiblings !== undefined) {
        program.priceForSiblings = model.priceForSiblings;
    }

    if (model.specialInstructions !== "string" && model.specialInstructions !== undefined) {
        program.specialInstructions = model.specialInstructions;
    }
    if (model.adultAssistanceIsRequried !== "string" && model.adultAssistanceIsRequried !== undefined) {
        program.adultAssistanceIsRequried = model.adultAssistanceIsRequried;
    }
    if (model.capacity !== "string" && model.capacity !== undefined) {
        program.capacity = model.capacity;
    }
    if (model.emails.length > 1) {
        program.emails = model.emails;
    }
    if (model.batches.length > 1) {
        program.batches = model.batches;
    }
    if (model.addresses.length > 1) {
        program.addresses = model.addresses;
    }
    if (model.tags.length > 1) {
        program.tags = model.tags;
    }
    program.updateOn = new Date()
    log.end();
    program.save();
    return program;

};

const create = async (model, context) => {
    const log = context.logger.start("services:programs:create");
    if (context.user.role == 'parent') {
        throw new Error("you are not authorized to perform this operation");
    }
    // const isprogramExist = await db.program.findOne({ name: { $eq: model.name } });
    // if (isprogramExist) {
    //     return "program already exist";
    // }
    const program = build(model, context);
    log.end();
    return program;
};

const getAllprograms = async (query, context) => {
    const log = context.logger.start(`services:programs:getAllprograms`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    let programs = await db.program.find().populate('tags').skip(skipCount).limit(pageSize);
    programs.count = await db.program.find().count();
    let favourites
    if (context.user !== undefined) {
        favourites = await db.favourite.find({ user: context.user.id }).populate('program')

    }
    if (favourites) {
        // add fav in program
        for (var p = 0; p < programs.length; p++) {
            for (var f = 0; f < favourites.length; f++) {
                if (favourites[f].program !== null && favourites[f].program !== undefined) {
                    if (programs[p].id === favourites[f].program.id) {
                        programs[p].isFav = true
                    }
                }

            }
        }
    }

    log.end();
    return programs;
};

const getById = async (id, context) => {
    const log = context.logger.start(`services:programs:getById`);
    if (!id) {
        throw new Error("id not found");
    }
    let program = await db.program.findById(id).populate('tags');
    if (!program) {
        throw new Error("program not found");
    }
    log.end();
    return program

};

const update = async (id, model, context) => {
    const log = context.logger.start(`services:programs:update`);
    if (!id) {
        throw new Error("id Not found");
    }
    if (context.user.role == 'parent') {
        throw new Error("you are not authorized to perform this operation");
    }
    let programDetail = await db.program.findById(id);

    if (!programDetail) {
        throw new Error("program Not found");
    }

    const program = await set(model, programDetail, context);

    log.end();
    return program
};

const removeById = async (id, model, context) => {
    const log = context.logger.start(`services:programs:removeById`);
    if (!id) {
        throw new Error("programs id not found");
    }
    let isDeleted = await db.program.deleteOne({ _id: id })
    if (!isDeleted) {
        throw new Error("something went wrong");
    }
    log.end();
    return 'program deleted succesfully'
};

const uploadTimeLinePics = async (id, files, context) => {
    const log = context.logger.start(`services:programs:uploadTimeLinePics`);
    const program = await db.program.findOne({ _id: id });

    if (files.length < 0) {
        throw new Error("image not found");
    }

    if (!program) {
        throw new Error("program not found");
    }

    let pics = await buildTimelineUrl(files)
    program.timelinePics = pics
    await program.save();
    log.end();
    return program

};
const search = async (query, context) => {
    const log = context.logger.start(`services:programs:search`);
    const program = await db.program.find({ name: { "$regex": '.*' + query.name + '.*', "$options": 'i' } }
    ).populate('tags').limit(5);
    log.end();
    return program;
};
const getProgramsByProvider = async (query, context) => {
    const log = context.logger.start(`services:programs:getAllprograms`);
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    if (!query.userId) {
        throw new Error("userId is  required");
    }
    let programs = await db.program.find({ user: query.userId }).populate('tags').skip(skipCount).limit(pageSize);


    // for (let program of programs) {
    //     for (let favourite of favourites) {
    //         if (program.id == favourite.program) {

    //         }
    //     }

    programs.count = await db.program.find({ user: query.userId }).count();
    log.end();
    return programs;
};
const addProgramAction = async (model, context) => {


    const log = context.logger.start("services:programs:increaseViewCount");
    let programActionCounter

    if (!model.programId) {
        throw new Error("program id is requried");
    }

    programActionCounter = await db.programActionCounter.findOne({ $and: [{ user: context.user.id, }, { program: model.programId }] })

    let count = 1

    if (model.action == 'view') {
        if (programActionCounter != null & programActionCounter != undefined) {
            programActionCounter.view = count += programActionCounter.view
            await programActionCounter.save()
        }
        else {
            programActionCounter = await new db.programActionCounter({
                view: count,
                program: model.programId,
                user: context.user.id,
                createdOn: new Date(),
                updateOn: new Date(),
            }).save();
        }
    }
    else if (model.action == 'click') {
        if (programActionCounter != null && programActionCounter != undefined) {
            programActionCounter.click = count += programActionCounter.click
            await programActionCounter.save()
        }
        else {
            programActionCounter = await new db.programActionCounter({
                click: count,
                program: model.programId,
                user: context.user.id,
                createdOn: new Date(),
                updateOn: new Date(),
            }).save();
        }

    }
    else if (model.action == 'favourite') {
        if (programActionCounter != null && programActionCounter != undefined) {
            programActionCounter.favourite = count += programActionCounter.favourite
            await programActionCounter.save()
        }
        else {
            click = await new db.programActionCounter({
                favourite: count,
                program: model.programId,
                user: context.user.id,
                createdOn: new Date(),
                updateOn: new Date(),
            }).save();
        }
    }
    log.end();
    return programActionCounter;
};
const getViewCount = async (query, context) => {
    const log = context.logger.start(`services:programs:getViewCount`);
    if (!query.userId) {
        throw new Error("userId not found");
    }
    const viewCount = await db.programActionCounter.aggregate([
        {
            $lookup: {
                from: "programs",
                localField: "program",
                foreignField: "_id",
                as: "program"

            }
        },
        {
            $match: {
                "program.user": ObjectId(query.userId)
            },
        },

        { $group: { _id: null, view: { $sum: "$view" }, } }
    ])
    let data = {}
    if (viewCount.length) {
        data.count = viewCount[0].view

    } else {
        data.message = 'somethng went wrong'
    }


    log.end();
    return data;
};
const getProgramCount = async (query, context) => {
    const log = context.logger.start(`services:programs:getProgramCount`);
    if (!query.userId) {
        throw new Error("userId is requried");
    }
    const count = await db.program.find({ $and: [{ user: query.userId }, { status: 'active' }] }).count();
    log.end();
    return count;
};
const setActiveOrDecactive = async (query, context) => {
    const log = context.logger.start(`services:programs:getProgramCount`);
    if (!query.id) {
        throw new Error("program id is requried");
    }
    if (!query.status) {
        throw new Error("program status is requried");
    }
    let program = await db.program.findById(query.id)
    program.status = query.status
    await program.save()
    log.end();
    return program;
};
const getGraphData = async (query, context) => {
    const log = context.logger.start(`services:programs:getGraphData`);
    if (!query.id) {
        throw new Error("userId is requried");
    }
    const data = await db.programActionCounter.aggregate([
        {
            $lookup: {
                from: "programs",
                localField: "program",
                foreignField: "_id",
                as: "program"
            }
        },
        {
            $match: {
                "program.user": ObjectId(query.id)
            },
        },
        {
            $group: {
                _id: "$program.name",
                view: { $sum: "$view" },
                click: { $sum: "$click" },
                favourite: { $sum: "$favourite" }
            }
        },
        {
            $sort: {
                _id: -1
            }
        }
    ]).limit(5);



    // {
    //     label: "view",
    //         backgroundColor: '#777CEA',
    //             data: 'clcik'[1, 4, 7,]
    // }, {
    //     label: "click",
    //         backgroundColor: '#F15C20',
    //             data: 'viwe'[2, 5, 8,]
    // },
    // {
    //     label: "fav",
    //         backgroundColor: ' #FFB206',
    //             data: 'fav'[3, 6, 9,]
    // }
    let barChartRes = {
        barChartLabels: [],
        barChartData: [{
            label: 'Views',
            data: []
        }, {
            label: 'Clicks',
            data: []
        }, {
            label: 'Favourites',
            data: []
        }]
    }
    try {
        data.forEach(item => {
            barChartRes.barChartLabels.push(item._id[0])
            barChartRes.barChartData.forEach(ChartData => {
                if (ChartData.label == 'Views') {
                    ChartData.data.push(item.view)
                }
                else if (ChartData.label == 'Clicks') {
                    ChartData.data.push(item.click)
                }
                else if (ChartData.label == 'Favourites') {
                    ChartData.data.push(item.favourite)
                }
            })

        });
    }
    catch (err) {
        throw new Error('barChartData mapping failed');
    }


    log.end();
    return barChartRes

};

const getFilterProgram = async (model, context) => {
    const log = context.logger.start(`services:programs:getFilterProgram`);
    let pageNo = Number(model.pageNo) || 1;
    let pageSize = Number(model.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);
    let query = {}

    if (model.ageFrom && model.ageTo) {
        query["ageGroup.from"] = { $gte: Number(model.ageFrom) }
        query["ageGroup.to"] = { $lte: Number(model.ageTo) }
    }

    if (model.fromDate && model.toDate) {
        query["date.from"] = { $gte: model.fromDate }
        query["date.to"] = { $lte: model.toDate }
    }

    if (model.toTime && model.fromTime) {
        query["time.from"] = { $gte: new Date(model.fromTime).getTime() }
        query["date.to"] = { $lte: new Date(model.toTime).getTime() }
    }

    if (model.userId) {
        query.user = model.userId
    }

    let programs = await db.program.find(query).populate('tags').skip(skipCount).limit(pageSize);
    programs.count = await db.program.find({ user: query.userId }).count();

    log.end();
    return programs;
};

const importProgram = async (file, context) => {
    const log = context.logger.start("services:program:importProgram");
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
        if (row.ProgramName !== "" && row.ProgramName !== null && row.ProgramName !== undefined) {
            count++
            await buildImportProgram(row, context);
        }
    }
    // console.log(`total record inserted ${count}`)
    log.info(`${count} record inserted `)
    await fs.unlinkSync(file.path);
    return `total record inserted ${count}`;
};


exports.create = create;
exports.getAllprograms = getAllprograms;
exports.update = update;
exports.getById = getById;
exports.removeById = removeById;
exports.uploadTimeLinePics = uploadTimeLinePics;
exports.search = search;
exports.getProgramsByProvider = getProgramsByProvider
exports.addProgramAction = addProgramAction
exports.getViewCount = getViewCount
exports.getProgramCount = getProgramCount
exports.setActiveOrDecactive = setActiveOrDecactive
exports.getGraphData = getGraphData
exports.getFilterProgram = getFilterProgram
exports.importProgram = importProgram