const imageUrl = require('config').get('image').url
const baseUrl = require('config').get('image').baseUrl
const ObjectId = require("mongodb").ObjectID;
const moment = require('moment');
const fs = require('fs');
var nodemailer = require('nodemailer')
let path = require('path');
const aws_accessKey = require('config').get('awsSes').accessKey
const aws_secretKey = require('config').get('awsSes').secretKey
const aws_region = require('config').get('awsSes').region
var sesTransport = require('nodemailer-ses-transport');


const addChildEmail = async (firstName, email, templatePath, subject) => {
    let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
    mailBody = mailBody.replace(/{{firstname}}/g, firstName);

    // Send e-mail using AWS SES
    // var sesTransporter = nodemailer.createTransport(sesTransport({
    //     accessKeyId: aws_accessKey,
    //     secretAccessKey: aws_secretKey,
    //     region: aws_region
    // }));
    let smtpTransport = nodemailer.createTransport({
        host: 'localhost',
        port: 465,
        secure: true,
        service: 'Gmail',
        auth: {
            user: `wondrfly@gmail.com`,
            pass: `wondrfly@123`
        }
    });

    let mailOptions = {
        // from: "accounts@wondrfly.com",
        from: "smtp.mailtrap.io",
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
    let mailSent = await smtpTransport.sendMail(mailOptions);
    if (mailSent) {
        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return
    } else {
        log.end()
        throw new Error("Unable to send email try after sometime");
    }
}

const setChild = async (model, child, context) => {
    const log = context.logger.start("services:childs:set");
    if (model.name !== "string" && model.name !== undefined) {
        child.name = model.name;
    }
    if (model.dob !== "string" && model.dob !== undefined) {
        child.dob = model.dob;
    }
    if (model.age !== "string" && model.age !== undefined) {
        child.age = model.age;
    }
    if (model.avtar !== "string" && model.avtar !== undefined) {
        if (model.avtar !== child.avtar) {
            let picUrl = child.avtar.replace(`${imageUrl}`, '');
            try {
                await fs.unlinkSync(`${picUrl}`)
                console.log('File unlinked!');
            } catch (err) {
                console.log(err)
            }
        }
        child.avtar = model.avtar;
    }
    if (model.sex !== "string" && model.sex !== undefined) {
        child.sex = model.sex;
    }
    if (model.contactOtherInfo !== "string" && model.contactOtherInfo !== undefined) {
        child.contactOtherInfo = model.contactOtherInfo;
    }
    if (model.schoolInfo !== "string" && model.schoolInfo !== undefined) {
        child.schoolInfo = model.schoolInfo;
    }
    if (model.interestInfo !== "string" && model.interestInfo !== undefined) {
        child.interestInfo = model.interestInfo;
    }
    if (model.gradeLevel !== "string" && model.gradeLevel !== undefined) {
        child.gradeLevel = model.gradeLevel;
    }
    if (model.fromWhereYouHeard !== "string" && model.fromWhereYouHeard !== undefined) {
        child.fromWhereYouHeard = model.fromWhereYouHeard;
    }
    if (model.dislikes !== "string" && model.dislikes !== undefined) {
        child.dislikes = model.dislikes;
    }
    if (model.alergies !== "string" && model.alergies !== undefined) {
        child.alergies = model.alergies;
    }
    if (model.parentNotes !== "string" && model.parentNotes !== undefined) {
        child.parentNotes = model.parentNotes;
    }
    child.lastModifiedBy = context.user.id
    child.updateOn = new Date()
    log.end();
    child.save();
    return child;
};

const buildChild = async (model, context) => {
    const log = context.logger.start(`services:childs:build${model}`);
    const child = await new db.child({
        name: model.name,
        dob: model.dob,
        age: model.age,
        avtar: model.avtar,
        sex: model.sex,
        relationToChild: model.relationToChild,
        contactOtherInfo: model.contactOtherInfo,
        schoolInfo: model.schoolInfo,
        interestInfo: model.interestInfo,
        gradeLevel: model.gradeLevel,
        fromWhereYouHeard: model.fromWhereYouHeard,
        dislikes: model.dislikes,
        alergies: model.alergies,
        parent: model.parentId,
        parentNotes: model.parentNotes,
        createdBy: context.user.id,
        createdOn: new Date(),
        updateOn: new Date()
    }).save();
    log.end();
    return child;
};

const addChild = async (model, context) => {
    const log = context.logger.start("services:childs:create");
    const user = await db.user.findById(model.parentId);
    if (!user) {
        throw new Error("parent not found");
    }
    let isChild = await db.child.findOne({ $and: [{ parent: model.parentId }, { name: { "$regex": '^' + model.name, "$options": 'i' } }] });
    if (isChild) {
        throw new Error("child already exits with this name");
    }
    const child = buildChild(model, context);
    if (child) {
        const today = new Date()
        let date = moment(today).format('YYYY-MM-DD');
        await new db.notification({
            title: 'Add child',
            description: `Child is added successfully on ${date}`,
            user: model.parentId,
            createdOn: new Date(),
            updateOn: new Date(),
        }).save();
        let templatePath = '../emailTemplates/add_child.html';
        let subject = "Add child";

        addChildEmail(user.firstName, user.email, templatePath, subject);
    }
    log.end();
    return child;
};


const getList = async (query, context) => {
    let pageNo = Number(query.pageNo) || 1;
    let pageSize = Number(query.pageSize) || 10;
    let skipCount = pageSize * (pageNo - 1);

    const log = context.logger.start(`services:childs:get`);
    let childs = await db.child.find({})
        .populate('interestInfo')
        .skip(skipCount)
        .limit(pageSize);
    childs.count = await db.child.count();
    log.end();
    return childs;
};

const updateChild = async (id, model, context) => {
    const log = context.logger.start(`services:childs:update`);
    let entity = await db.child.findById(id);
    if (!entity) {
        throw new Error("child Not Found");
    }
    const child = await setChild(model, entity, context);
    log.end();
    return child
};

const deleteChild = async (id, context) => {
    const log = context.logger.start(`services:child:deleteChild`);

    if (!id) {
        throw new Error("child Not Found");
    }
    await db.child.deleteOne({ _id: id })

    let child = await db.child.findById(id);

    if (child) {
        throw new Error("something went wrong");
    }

    log.end();
    return 'child deleted succesfully'
};

const childByParentId = async (id, context) => {
    const log = context.logger.start(`services:child:update`);
    // inviteLinked
    let children = []
    let childrenGuardian
    let usrParent = await db.user.findById(id)
    if (usrParent.inviteLinked) {
        // console.log('if parent invited')
        let guardian = await db.guardian.findById(usrParent.inviteLinked)
        if (id == guardian.invitedBy) {
            // childrenGuardian = await db.child.find({ parent: guardian.invitedTo }).populate('interestInfo')
            childrenGuardian = await db.child.aggregate([
                {
                    $match: {
                        parent: ObjectId(guardian.invitedTo),
                    },
                },
                {
                    $lookup: {
                        from: 'tags',
                        localField: 'interestInfo',
                        foreignField: '_id',
                        as: 'tags',
                    },
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'tags.categoryIds',
                        foreignField: '_id',
                        as: 'categories',
                    },
                },
            ])
        }
        if (id == guardian.invitedTo) {
            // childrenGuardian = await db.child.find({ parent: guardian.invitedBy }).populate('interestInfo')
            childrenGuardian = await db.child.aggregate([
                {
                    $match: {
                        parent: ObjectId(guardian.invitedBy),
                    },
                },
                {
                    $lookup: {
                        from: 'tags',
                        localField: 'interestInfo',
                        foreignField: '_id',
                        as: 'tags',
                    },
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'tags.categoryIds',
                        foreignField: '_id',
                        as: 'categories',
                    },
                },
            ])
        }
        // let children1 = await db.child.find({ parent: id }).populate('interestInfo')
        let children1 = await db.child.aggregate([
            {
                $match: {
                    parent: ObjectId(id),
                },
            },
            {
                $lookup: {
                    from: 'tags',
                    localField: 'interestInfo',
                    foreignField: '_id',
                    as: 'tags',
                },
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'tags.categoryIds',
                    foreignField: '_id',
                    as: 'categories',
                },
            },
        ])

        if (children1.length >= 1) {
            for (var x of children1) {
                children.push(x);
            }
        }
        if (childrenGuardian.length >= 1) {
            for (var x of childrenGuardian) {
                children.push(x);
            }
        }

        if (children.length < 1) {
            throw new Error("child Not Found");
        }

        children.forEach((child, index) => {
            let tgs = child.tags;
            for (let j = 0; j < tgs.length; j++) {
                tgs[j].image = tgs[j].image ? baseUrl + tgs[j].image : ''
            }
        })
        log.end();
        return children
    }


    // children = await db.child.find({ parent: id }).populate('interestInfo')
    children = await db.child.aggregate([
        {
            $match: {
                parent: ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'tags',
                localField: 'interestInfo',
                foreignField: '_id',
                as: 'tags',
            },
        },
        {
            $lookup: {
                from: 'categories',
                localField: 'tags.categoryIds',
                foreignField: '_id',
                as: 'categories',
            },
        },
    ])
    if (children.length < 1) {
        throw new Error("child Not Found");
    }
    // baseUrl
    children.forEach((child, index) => {
        let tgs = child.tags;
        for (let j = 0; j < tgs.length; j++) {
            tgs[j].image = tgs[j].image ? baseUrl + tgs[j].image : ''
        }
    })
    log.end();
    return children
};

const childByGuardianId = async (id, context) => {
    const log = context.logger.start(`services:child:update`);
    let guardian = await db.guardian.findOne({ user: id });
    if (!guardian) {
        throw new Error("Guardian does not exist");
    }
    let children = await db.child.find({ parent: guardian.parent }).populate('interestInfo')
    if (!children) {
        throw new Error("child Not Found");
    }
    log.end();
};


const activateAndDeactive = async (context, id, isActivated) => {
    const log = context.logger.start(`services:child:activateAndDeactive`);
    console.log('activate and deactivate child')
    if (!id) {
        throw new Error("Id is requried");
    }
    if (!isActivated) {
        throw new Error("isActivated requried");
    }
    let child = await db.child.findById(id);
    if (!child) {
        throw new Error("child not found");
    }
    child.isActivated = isActivated
    child.lastModifiedBy = context.user.id
    child.updatedOn = Date.now()
    child.save()
    log.end();
    return child
};

exports.addChild = addChild;
exports.getList = getList;
exports.updateChild = updateChild;
exports.childByParentId = childByParentId;
exports.deleteChild = deleteChild
exports.childByGuardianId = childByGuardianId
exports.activateAndDeactive = activateAndDeactive