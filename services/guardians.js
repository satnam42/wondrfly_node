const ObjectId = require("mongodb").ObjectID;
const auth = require("../permit/auth");

sendOtpEmail = async (firstName, email, templatePath, subject, OTP) => {
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
        return
    } else {
        log.end()
        throw new Error("Unable to send email try after sometime");
    }
}

const setGuardian = (model, guardian, context) => {

    const log = context.logger.start("services:guardians:set");
    if (model.firstName !== "string" && model.firstName !== undefined) {
        guardian.firstName = model.firstName;
    }
    if (model.age !== "string" && model.age !== undefined) {
        guardian.age = model.age;
    }
    if (model.sex !== "string" && model.sex !== undefined) {
        guardian.sex = model.sex;
    }
    if (model.avtar !== "string" && model.avtar !== undefined) {
        guardian.avtar = model.avtar;
    }
    if (model.personalNote !== "string" && model.personalNote !== undefined) {
        guardian.personalNote = model.personalNote;
    }
    guardian.updateOn = new Date()
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
        sex: model.sex,
        password: '123456',
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
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already resgister");
    }
    const otp = await auth.extractToken(model.otpToken, context)
    if (!model.otpToken) {
        throw new Error("otpToken is required");
    }
    if (otp.id != model.otp) {
        throw new Error("please enter valid otp");;
    }
    if (otp.name === "TokenExpiredError") {
        throw new Error("otp expired");
    }
    if (otp.name === "JsonWebTokenError") {
        throw new Error("otp is invalid");
    }
    const guardian = await buildGuardian(model, context);
    if (guardian) {
        await new db.guardian({
            parent: model.parentId,
            user: guardian.id,
            createdOn: new Date(),
            updatedOn: new Date()
        }).save();
    }
    log.end();
    return guardian;
};


const get = async (query, context) => {
    const log = context.logger.start(`services:guardians:get`);
    let guardians = await db.guardian.find({}).populate('user')
    log.end();
    return guardians;
};


const updateGuardian = async (id, model, context) => {
    const log = context.logger.start(`services:guardians:update`);

    let entity = await db.user.findById(id);
    if (!entity) {
        throw new Error("guardian Not Found");
    }

    const guardian = await setGuardian(model, entity, context);

    log.end();
    return guardian
};

const getGuardianByParentId = async (id, context) => {
    const log = context.logger.start(`services:guardians:getGuardianByParentId`);
    if (!id) {
        throw new Error("parentId Not Found");
    }
    let guardians = await db.guardian.find({ parent: id }).populate('user')
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
    const log = context.logger.start('services/users/sendOtp')
    const { parentId } = model;
    const isEmail = await db.user.findOne({ email: { $eq: model.email } });
    if (isEmail) {
        throw new Error("Email already resgister");
    }

    // four digit otp genration logic
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    // let message = `Your 4 digit One Time Password: <br>${OTP}<br></br>
    //   otp valid only 4 minutes`
    let = subject = "Add Guardian"
    let templatePath = '../emailTemplates/guardian_otp.html';

    await sendOtpEmail(model.firstName, model.email, templatePath, subject, OTP);
    // await sendMail(email, message, subject)

    let otpToken = auth.getOtpToken(OTP, true, context)
    let data = {
        message: 'OTP successfully sent on your email',
        otpToken: otpToken
    }
    log.end()
    return data
}

exports.addGuardian = addGuardian;
exports.get = get;
exports.updateGuardian = updateGuardian;
exports.getGuardianByParentId = getGuardianByParentId;
exports.deleteGuardian = deleteGuardian;
exports.sendOtp = sendOtp;