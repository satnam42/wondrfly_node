const ObjectId = require("mongodb").ObjectID;
const auth = require("../permit/auth");
const encrypt = require("../permit/crypto.js");
const mobile = require('is-mobile');

sendOtpEmail = async (firstName, email, templatePath, subject) => {
    let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
    mailBody = mailBody.replace(/{{firstname}}/g, firstName);

    if (OTP) {
        mailBody = mailBody.replace(/{{OTP}}/g, OTP);
    }


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
    let mailSent = await smtpTransport.sendMail(mailOptions)
    if (mailSent) {
        console.log("Message sent: %s", mailSent.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
        return mailSent
    } else {
        log.end()
        throw new Error("Unable to send email try after sometime");
    }
}

const setGuardian = (model, guardian, context) => {

    const log = context.logger.start("services:guardians:set");
    if (model.firstName !== "string" && model.firstName !== undefined && model.firstName !== '') {
        guardian.firstName = model.firstName;
    }
    if (model.age !== "string" && model.age !== undefined && model.age !== '') {
        guardian.age = model.age;
    }
    if (model.dob !== "string" && model.dob !== undefined && model.dob !== '') {
        guardian.dob = model.dob;
    }
    if (model.sex !== "string" && model.sex !== undefined && model.sex !== '') {
        guardian.sex = model.sex;
    }
    if (model.avtar !== "string" && model.avtar !== undefined && model.avtar !== '') {
        guardian.avtar = model.avtar;
    }
    if (model.personalNote !== "string" && model.personalNote !== undefined && model.personalNote !== '') {
        guardian.personalNote = model.personalNote;
    }
    guardian.updatedOn = new Date()
    log.end();
    guardian.save();
    return guardian;
};
const setGuardianDetail = (model, guardian, context) => {

    const log = context.logger.start("services:guardians:set");
    if (model.relationToChild !== "string" && model.relationToChild !== undefined && model.relationToChild !== '') {
        guardian.relationToChild = model.relationToChild;
    }

    guardian.updatedOn = new Date()
    log.end();
    guardian.save();
    return guardian;
};

const buildGuardian = async (model, context) => {
    const log = context.logger.start(`services:guardians:build${model}`);

    const user = await new db.user({
        firstName: model.firstName,
        avtar: model.avtar,
        email: model.email,
        age: model.age,
        dob: model.dob,
        sex: model.sex,
        password: model.password,
        role: 'guardian',
        personalNote: model.personalNote,
        createdOn: new Date(),
        updatedOn: new Date()
    }).save();
    log.end();
    return user;
};

const addGuardian = async (model, context) => {
    const log = context.logger.start("services:guardians:create");
    if (!model.email) {
        throw new Error("Email is required");
    }
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already resgister");
    }
    const guardianEmail = await db.guardian.findOne({ email: { $eq: model.email } });
    if (!guardianEmail) {
        console.log('condition 1')
        throw new Error("Please enter only verified email");
    }
    if (guardianEmail.email !== model.email) {
        console.log('condition 2')
        throw new Error("Please enter only verified email");
    }
    // const otp = await auth.extractToken(model.otpToken, context)
    // if (!model.otpToken) {
    //     throw new Error("otpToken is required");
    // }
    // if (otp.id != model.otp) {
    //     throw new Error("please enter valid otp");;
    // }
    // if (otp.name === "TokenExpiredError") {
    //     throw new Error("otp expired");
    // }
    // if (otp.name === "JsonWebTokenError") {
    //     throw new Error("otp is invalid");
    // }
    model.password = await encrypt.getHash(model.password, context);
    const guardian = await buildGuardian(model, context);
    if (guardianEmail && guardian) {
        guardianEmail.user = guardian.id;
        guardianEmail.relationToChild = model.relationToChild;
        await guardianEmail.save();
    }





    // if (guardian) {
    //     await new db.guardian({
    //         parent: model.parentId,
    //         user: guardian.id,
    //         createdOn: new Date(),
    //         updatedOn: new Date()
    //     }).save();
    // }
    log.end();
    return guardian;
};

// { "fieldToCheck": { $exists: true, $ne: null } }
const get = async (query, context) => {
    const log = context.logger.start(`services:guardians:get`);
    let guardians = await db.guardian.find({ "user": { $exists: true, $ne: null } }).populate('user')

    // let guardians = await db.guardian.find({}).populate('user')
    log.end();
    return guardians;
};


const updateGuardian = async (id, model, context) => {
    const log = context.logger.start(`services:guardians:update`);

    let entity = await db.user.findById(id);
    let guardianData = await db.guardian.findOne({ user: id })
    if (!entity) {
        throw new Error("guardian Not Found");
    }

    const guardian = await setGuardian(model, entity, context);
    if (guardianData) {
        const guardianDetail = await setGuardianDetail(model, guardianData, context)
    }

    log.end();
    return guardian
};

const getGuardianByParentId = async (id, context) => {
    const log = context.logger.start(`services:guardians:getGuardianByParentId`);
    if (!id) {
        throw new Error("parentId Not Found");
    }
    let guardians = await db.guardian.find({ parent: id, "user": { $exists: true, $ne: null } }).populate('user')
    if (!guardians.length) {
        throw new Error("guardian Not Found");
    }
    log.end();
    return guardians
};

const deleteGuardian = async (id, context) => {
    const log = context.logger.start(`services:guardians:deleteGuardian`);
    if (!id) {
        throw new Error("Id is requried");
    }
    let user = await db.user.findById(id);
    if (!user) {
        throw new Error("guardian not found");
    }
    await db.guardian.deleteOne({ user: id })
    await db.user.deleteOne({ _id: id })
    user = null
    user = await db.user.findById(id);
    if (user) {
        throw new Error("something went wrong");
    }
    log.end();
    return 'guardian delete successfully'
};

const sendOtp = async (model, context) => {
    const log = context.logger.start('services/guardians/sendOtp')
    const { parentId } = model;
    if (!model.email) {
        throw new Error("Email is required");
    }
    if (!parentId) {
        throw new Error("Parent id is required");
    }
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already resgister");
    }
    const isGuardianEmail = await db.guardian.findOne({ email: { $eq: model.email } });
    if (isGuardianEmail) {
        throw new Error("Email is already sent to register guardian at this email address");
    }
    console.log('is mobile request =====>>>>>', mobile());
    // four digit otp genration logic
    // var digits = '0123456789';
    // let OTP = '';
    // for (let i = 0; i < 4; i++) {
    //     OTP += digits[Math.floor(Math.random() * 10)];
    // }
    // let message = `Your 4 digit One Time Password: <br>${OTP}<br></br>
    //   otp valid only 4 minutes`
    let = subject = "Register Guardian"
    let templatePath = '../emailTemplates/guardian_otp.html';

    let mailsent = await sendOtpEmail(model.firstName, model.email, templatePath, subject);
    // await sendMail(email, message, subject)
    console.log('mail send====>>>>')
    // let otpToken = auth.getOtpToken(OTP, true, context)
    await new db.guardian({
        parent: parentId,
        email: model.email,
        createdOn: new Date(),
        updatedOn: new Date()
    }).save();
    let data = {
        message: 'Please register guardian, link is sent on your email',
    }
    log.end()
    return data
}


const activateAndDeactive = async (context, id, isActivated) => {
    const log = context.logger.start(`services:guardians:activateAndDeactive`);
    if (!id) {
        throw new Error("Id is requried");
    }
    if (!isActivated) {
        throw new Error("isActivated requried");
    }
    let user = await db.user.findById(id);
    if (!user) {
        throw new Error("user not found");
    }
    user.isActivated = isActivated
    user.lastModifiedBy = context.user.id
    user.updatedOn = Date.now()
    user.save()
    log.end();
    return user
};


exports.addGuardian = addGuardian;
exports.get = get;
exports.updateGuardian = updateGuardian;
exports.getGuardianByParentId = getGuardianByParentId;
exports.deleteGuardian = deleteGuardian;
exports.sendOtp = sendOtp;
exports.activateAndDeactive = activateAndDeactive;