const ObjectId = require('mongodb').ObjectID;
const auth = require('../permit/auth');
const encrypt = require('../permit/crypto.js');
const mobile = require('is-mobile');
const moment = require('moment');
var nodemailer = require('nodemailer');
let path = require('path');
const fs = require('fs');
const aws_accessKey = require('config').get('awsSes').accessKey;
const aws_secretKey = require('config').get('awsSes').secretKey;
const aws_region = require('config').get('awsSes').region;
var sesTransport = require('nodemailer-ses-transport');
const mailchimp = require('./mailchimp');

invitaionEmail = async (firstName, email, templatePath, subject) => {
  let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);

  // if (OTP) {
  //     mailBody = mailBody.replace(/{{OTP}}/g, OTP);
  // }

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
      pass: `wondrfly@123`,
    },
  });

  let mailOptions = {
    // from: "accounts@wondrfly.com",
    from: 'smtp.mailtrap.io',
    to: email, //sending to: E-mail
    subject: subject,
    html: mailBody,
    attachments: [
      {
        filename: 'beta1.png',
        path: `${__dirname}/../public/images/beta1.png`,
        cid: 'beta1', //same cid value as in the html img src
      },

      {
        filename: 'beta2.png',
        path: `${__dirname}/../public/images/beta2.png`,
        cid: 'beta2', //same cid value as in the html img src
      },
      {
        filename: 'logo_wondr.png',
        path: `${__dirname}/../public/images/logo_wondr.png`,
        cid: 'logo_wondr', //same cid value as in the html img src
      },
      {
        filename: 'cntr-img.png',
        path: `${__dirname}/../public/images/cntr-img.png`,
        cid: 'cntr-img', //same cid value as in the html img src
      },
    ],
  };
  let mailSent = await smtpTransport.sendMail(mailOptions);
  if (mailSent) {
    console.log('Message sent: %s', mailSent.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailSent));
    return mailSent;
  } else {
    log.end();
    throw new Error('Unable to send email try after sometime');
  }
};

const congratsEmail = async (firstName, email, templatePath, subject) => {
  let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);

  let smtpTransport = nodemailer.createTransport({
    host: 'localhost',
    port: 465,
    secure: true,
    service: 'Gmail',
    auth: {
      user: `wondrfly@gmail.com`,
      pass: `wondrfly@123`,
    },
  });

  let mailOptions = {
    from: 'smtp.mailtrap.io',
    to: email, //sending to: E-mail
    subject: subject,
    html: mailBody,
    attachments: [
      {
        filename: 'beta1.png',
        path: `${__dirname}/../public/images/beta1.png`,
        cid: 'beta1', //same cid value as in the html img src
      },
      {
        filename: 'beta2.png',
        path: `${__dirname}/../public/images/beta2.png`,
        cid: 'beta2', //same cid value as in the html img src
      },
      {
        filename: 'logo_wondr.png',
        path: `${__dirname}/../public/images/logo_wondr.png`,
        cid: 'logo_wondr', //same cid value as in the html img src
      },
      {
        filename: 'cracker.png',
        path: `${__dirname}/../public/images/cracker.png`,
        cid: 'cracker', //same cid value as in the html img src
      },
      {
        filename: 'slide1.png',
        path: `${__dirname}/../public/images/slide1.png`,
        cid: 'slide1', //same cid value as in the html img src
      },
      {
        filename: 'slide2.png',
        path: `${__dirname}/../public/images/slide2.png`,
        cid: 'slide2', //same cid value as in the html img src
      },
      {
        filename: 'slide3.png',
        path: `${__dirname}/../public/images/slide3.png`,
        cid: 'slide3', //same cid value as in the html img src
      },
    ],
  };
  let mailSent = await smtpTransport.sendMail(mailOptions);
  if (mailSent) {
    console.log('Message sent: %s', mailSent.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailSent));
    return;
  } else {
    log.end();
    throw new Error('Unable to send email try after sometime');
  }
};

const invitaionApprovedEmail = async (
  firstName,
  email,
  templatePath,
  subject
) => {
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
      pass: `wondrfly@123`,
    },
  });

  let mailOptions = {
    from: 'smtp.mailtrap.io',
    to: email, //sending to: E-mail
    subject: subject,
    html: mailBody,
    attachments: [
      {
        filename: 'logo.png',
        path: `${__dirname}/../public/images/logo.png`,
        cid: 'logo1', //same cid value as in the html img src
      },

      {
        filename: 'logo_white.png',
        path: `${__dirname}/../public/images/logo_white.png`,
        cid: 'logo_white', //same cid value as in the html img src
      },
    ],
  };
  let mailSent = await smtpTransport.sendMail(mailOptions);
  if (mailSent) {
    console.log('Message sent: %s', mailSent.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailSent));
    return;
  } else {
    log.end();
    throw new Error('Unable to send email try after sometime');
  }
};

const setGuardian = (model, guardian, context) => {
  const log = context.logger.start('services:guardians:set');
  if (
    model.firstName !== 'string' &&
    model.firstName !== undefined &&
    model.firstName !== ''
  ) {
    guardian.firstName = model.firstName;
  }
  if (model.age !== 'string' && model.age !== undefined && model.age !== '') {
    guardian.age = model.age;
  }
  if (model.dob !== 'string' && model.dob !== undefined && model.dob !== '') {
    guardian.dob = model.dob;
  }
  if (model.sex !== 'string' && model.sex !== undefined && model.sex !== '') {
    guardian.sex = model.sex;
  }
  if (
    model.avtar !== 'string' &&
    model.avtar !== undefined &&
    model.avtar !== ''
  ) {
    guardian.avtar = model.avtar;
  }
  if (
    model.personalNote !== 'string' &&
    model.personalNote !== undefined &&
    model.personalNote !== ''
  ) {
    guardian.personalNote = model.personalNote;
  }
  guardian.updatedOn = new Date();
  log.end();
  guardian.save();
  return guardian;
};
const setGuardianDetail = (model, guardian, context) => {
  const log = context.logger.start('services:guardians:set');
  if (
    model.relationToChild !== 'string' &&
    model.relationToChild !== undefined &&
    model.relationToChild !== ''
  ) {
    guardian.relationToChild = model.relationToChild;
  }

  guardian.updatedOn = new Date();
  log.end();
  guardian.save();
  return guardian;
};

const buildGuardian = async (model, guarId, context) => {
  const log = context.logger.start(`services:guardians:build${model}`);

  const user = await new db.user({
    firstName: model.firstName,
    avtar: model.avtar,
    email: model.email,
    age: model.age,
    dob: model.dob,
    sex: model.sex,
    password: model.password,
    role: 'parent',
    personalNote: model.personalNote,
    inviteLinked: guarId ? guarId : '',
    createdOn: new Date(),
    updatedOn: new Date(),
  }).save();
  log.end();
  return user;
};

// const addGuardian = async (model, context) => {
//     const log = context.logger.start("services:guardians:create");
//     if (!model.email) {
//         throw new Error("Email is required");
//     }
//     const isEmail = await db.user.findOne({ email: { $eq: model.email } });
//     if (isEmail) {
//         throw new Error("Email already resgister");
//     }
//     const guardianEmail = await db.guardian.findOne({ email: { $eq: model.email } });
//     if (!guardianEmail) {
//         console.log('condition 1')
//         throw new Error("Please enter only verified email");
//     }
//     if (guardianEmail.email !== model.email) {
//         console.log('condition 2')
//         throw new Error("Please enter only verified email");
//     }
//     // const otp = await auth.extractToken(model.otpToken, context)
//     // if (!model.otpToken) {
//     //     throw new Error("otpToken is required");
//     // }
//     // if (otp.id != model.otp) {
//     //     throw new Error("please enter valid otp");;
//     // }
//     // if (otp.name === "TokenExpiredError") {
//     //     throw new Error("otp expired");
//     // }
//     // if (otp.name === "JsonWebTokenError") {
//     //     throw new Error("otp is invalid");
//     // }
//     model.password = await encrypt.getHash(model.password, context);
//     const guardian = await buildGuardian(model, context);
//     if (guardianEmail && guardian) {
//         guardianEmail.user = guardian.id;
//         guardianEmail.relationToChild = model.relationToChild;
//         await guardianEmail.save();
//     }
//     log.end();
//     return guardian;
// };

const addGuardian = async (model, context) => {
  const log = context.logger.start('services:guardians:create');
  if (!model.email) {
    throw new Error('Email is required');
  }
  const isEmail = await db.user.findOne({ email: { $eq: model.email } });
  if (isEmail) {
    throw new Error('Email already resgister');
  }
  const guardianEmail = await db.guardian.findOne({
    invitedToEmail: { $eq: model.email },
  });
  if (!guardianEmail) {
    console.log('condition 1');
    throw new Error('Please enter only verified email');
  }
  if (guardianEmail.invitedToEmail !== model.email) {
    console.log('condition 2');
    throw new Error('Please enter only verified email');
  }

  model.password = await encrypt.getHash(model.password, context);
  const guardian = await buildGuardian(model, guardianEmail._id, context);
  if (guardianEmail && guardian) {
    guardianEmail.invitedTo = guardian.id;
    guardianEmail.relationToChild = model.relationToChild;
    await guardianEmail.save();
  }
  const today = new Date();
  let date = moment(today).format('YYYY-MM-DD');
  await new db.notification({
    title: 'Invitation approved',
    description: `Guardian invitaion approved on ${date}`,
    user: model.parentId,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();

  const user = await db.user.findById(model.parentId);
  let templatePath = '../emailTemplates/invitation_approved.html';
  let subject = 'Guardian invitation approved';

  invitaionApprovedEmail(user.firstName, user.email, templatePath, subject);
  log.end();
  return guardian;
};

// { "fieldToCheck": { $exists: true, $ne: null } }
const get = async (query, context) => {
  const log = context.logger.start(`services:guardians:get`);
  let guardians = await db.guardian
    .find({ invitedTo: { $exists: true, $ne: null } })
    .populate('invitedTo');
  log.end();
  return guardians;
};

const updateGuardian = async (id, model, context) => {
  const log = context.logger.start(`services:guardians:update`);

  let entity = await db.user.findById(id);
  let guardianData = await db.guardian.findOne({ user: id });
  if (!entity) {
    throw new Error('guardian Not Found');
  }

  const guardian = await setGuardian(model, entity, context);
  if (guardianData) {
    const guardianDetail = await setGuardianDetail(
      model,
      guardianData,
      context
    );
  }

  log.end();
  return guardian;
};

const getGuardianByParentId = async (id, context) => {
  const log = context.logger.start(`services:guardians:getGuardianByParentId`);
  if (!id) {
    throw new Error('parentId Not Found');
  }
  let guardians = await db.guardian
    .find({ invitedBy: id, invitedTo: { $exists: true, $ne: null } })
    .populate('invitedTo');
  if (!guardians.length) {
    throw new Error('guardian Not Found');
  }
  log.end();
  console.log('guardians ==>>>', guardians);
  return guardians;
};

const deleteGuardian = async (id, context) => {
  const log = context.logger.start(`services:guardians:deleteGuardian`);
  if (!id) {
    throw new Error('Id is requried');
  }
  let user = await db.user.findById(id);
  if (!user) {
    throw new Error('guardian not found');
  }
  await db.guardian.deleteOne({ user: id });
  await db.user.deleteOne({ _id: id });
  user = null;
  user = await db.user.findById(id);
  if (user) {
    throw new Error('something went wrong');
  }
  log.end();
  return 'guardian delete successfully';
};

// first code==>>>>>>>
// const sendOtp = async (mob, model, context) => {
//     const log = context.logger.start('services/guardians/sendOtp')
//     const { parentId } = model;
//     if (!model.email) {
//         throw new Error("Email is required");
//     }
//     if (!parentId) {
//         throw new Error("Parent id is required");
//     }
//     const isEmail = await db.user.findOne({ email: { $eq: model.email } });
//     if (isEmail) {
//         throw new Error("Email already resgister");
//     }
//     const isGuardianEmail = await db.guardian.findOne({ email: { $eq: model.email } });
//     if (isGuardianEmail) {
//         throw new Error("Email is already sent to register guardian at this email address");
//     }

//     // four digit otp genration logic
//     // var digits = '0123456789';
//     // let OTP = '';
//     // for (let i = 0; i < 4; i++) {
//     //     OTP += digits[Math.floor(Math.random() * 10)];
//     // }
//     // let message = `Your 4 digit One Time Password: <br>${OTP}<br></br>
//     //   otp valid only 4 minutes`

//     if (mob) {
//         let = subject = "Register Guardian"
//         let templatePath = '../emailTemplates/pwaGuardian_otp.html';
//         let mailsent = await sendOtpEmail(model.firstName, model.email, templatePath, subject);

//         console.log('mail send====>>>>')
//         // let otpToken = auth.getOtpToken(OTP, true, context)
//         await new db.guardian({
//             parent: parentId,
//             email: model.email,
//             createdOn: new Date(),
//             updatedOn: new Date()
//         }).save();
//         let data = {
//             message: 'Please register guardian, link is sent on your email',
//         }
//         log.end()
//         return data
//     } else {
//         let = subject = "Register Guardian"
//         let templatePath = '../emailTemplates/guardian_otp.html';
//         let mailsent = await sendOtpEmail(model.firstName, model.email, templatePath, subject);

//         console.log('mail send====>>>>')
//         await new db.guardian({
//             parent: parentId,
//             email: model.email,
//             createdOn: new Date(),
//             updatedOn: new Date()
//         }).save();
//         let data = {
//             message: 'Please register guardian, link is sent on your email',
//         }
//         log.end()
//         return data
//     }

// }

// second time code==>>>
// const sendOtp = async (mob, model, context) => {
//     const log = context.logger.start('services/guardians/sendOtp')
//     const { parentId } = model;
//     if (!model.email) {
//         throw new Error("Email is required");
//     }
//     if (!parentId) {
//         throw new Error("Parent id is required");
//     }

//     const isInvited = await db.user.findById(parentId);
//     if (isInvited.inviteLinked) {
//         throw new Error("You already invited a guardian. So you cannot invite guardian second time");
//     }

//     const isEmail = await db.user.findOne({ email: { $eq: model.email } });
//     if (isEmail) {
//         throw new Error("Email already resgister");
//     }

// if (mob) {
//     let = subject = "Register Guardian"
//     let templatePath = '../emailTemplates/pwaGuardian_otp.html';
//     let mailsent = await sendOtpEmail(model.firstName, model.email, templatePath, subject);

//     console.log('mail send====>>>>')
//     let guard = await new db.guardian({
//         invitedBy: parentId,
//         invitedToEmail: model.email,
//         createdOn: new Date(),
//         updatedOn: new Date()
//     }).save();
//     let data = {
//         message: 'Please register guardian, link is sent on your email',
//     }
//     isInvited.inviteLinked = guard._id
//     isInvited.save();
//     log.end()
//     return data
// } else {
//     let = subject = "Register Guardian"
//     let templatePath = '../emailTemplates/guardian_otp.html';
//     let mailsent = await sendOtpEmail(model.firstName, model.email, templatePath, subject);

//     console.log('mail send====>>>>')
//     let guard = await new db.guardian({
//         invitedBy: parentId,
//         invitedToEmail: model.email,
//         createdOn: new Date(),
//         updatedOn: new Date()
//     }).save();
//     let data = {
//         message: 'Please register guardian, link is sent on your email',
//     }
//     isInvited.inviteLinked = guard._id
//     isInvited.save();
//     log.end()
//     return data
// }

// }

const inviteToJoin = async (model, context) => {
  const log = context.logger.start('services:guardians:inviteToJoin');
  const user = await db.user.findById(model.parentId);
  if (!user) {
    throw new Error('This user does not exist');
  }
  if (user.guardianInvitationLimit == 1) {
    throw new Error('only 1 user invitation limit, your limit is reached');
  }

  const isEmail = await db.invitation.findOne({
    invitedToEmail: { $eq: model.email },
  });
  if (isEmail) {
    throw new Error('This Email is already invited');
  }
  const invitation = await new db.invitation({
    invitedBy: model.parentId,
    invitedToEmail: model.email,
    invitedToName: model.firstName,
    isInvited: 'invited',
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();

  if (invitation) {
    await db.user.findByIdAndUpdate(model.parentId, {
      $set: {
        guardianInvitationLimit: (user.guardianInvitationLimit += 1),
      },
    });
    let templatePath = '../emailTemplates/beta_welcome_guardian.html';
    let subject = 'Invitation to join wondrlfy';

    invitaionEmail(model.firstName, model.email, templatePath, subject);
  }
  const today = new Date();
  let date = moment(today).format('YYYY-MM-DD');
  await new db.notification({
    title: 'Invitation for wondrfly',
    description: `Invitation to join wondrfly is send to whom you want to join${date}`,
    user: model.parentId,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();
  let guard = await new db.guardian({
    invitedBy: model.parentId,
    invitedToEmail: model.email,
    createdOn: new Date(),
    updatedOn: new Date(),
  }).save();
  user.inviteLinked = guard._id;
  user.save();
  log.end();
  return invitation;
};

// ask to join after invited the user
const create = async (model, context) => {
  const log = context.logger.start('services:guardians:register');
  const isEmail = await db.user.findOne({ email: { $eq: model.email } });
  if (isEmail) {
    throw new Error('This Email is already registered');
  }

  const guardianEmail = await db.guardian.findOne({
    invitedToEmail: { $eq: model.email },
  });
  if (!guardianEmail) {
    console.log('condition 1');
    throw new Error('Please enter only verified email');
  }
  if (guardianEmail.invitedToEmail !== model.email) {
    console.log('condition 2');
    throw new Error('Please enter only verified email');
  }

  model.password = await encrypt.getHash(model.password, context);
  const guardian = await buildGuardian(model, guardianEmail._id, context);
  if (guardianEmail && guardian) {
    guardianEmail.invitedTo = guardian.id;
    // guardianEmail.relationToChild = model.relationToChild;
    await guardianEmail.save();
  }

  // model.password = await encrypt.getHash(model.password, context);
  // const user = await buildUser(model, context);
  const invitedUser = await db.invitation.findOne({
    invitedToEmail: { $eq: model.email },
  });
  if (invitedUser && guardian) {
    let webStatus = { requestAccepted: true };
    invitedUser.webStatus = webStatus;
    invitedUser.user = guardian.id;
    invitedUser.joined = true;
    await invitedUser.save();
  }

  // let templatePath = '../emailTemplates/beta_congrats.html';
  // let subject = "Congratulations!  wondrlfy";

  // congratsEmail(model.firstName, model.email, templatePath, subject);
  const opt = {
    name: 'welcome-beta-users',
    email: [
      {
        email: model.email,
        type: 'to',
      },
    ],
    subject: 'Welcome to the World of Wondrfly!',
  };
  const mailchimpMail = await mailchimp.static(
    opt.name,
    opt.email,
    opt.subject
  );
  log.end();
  return guardian;
};

const activateAndDeactive = async (context, id, isActivated) => {
  const log = context.logger.start(`services:guardians:activateAndDeactive`);
  if (!id) {
    throw new Error('Id is requried');
  }
  if (!isActivated) {
    throw new Error('isActivated requried');
  }
  let user = await db.user.findById(id);
  if (!user) {
    throw new Error('user not found');
  }
  user.isActivated = isActivated;
  user.lastModifiedBy = context.user.id;
  user.updatedOn = Date.now();
  user.save();
  log.end();
  return user;
};

// exports.addGuardian = addGuardian;
exports.get = get;
exports.updateGuardian = updateGuardian;
exports.getGuardianByParentId = getGuardianByParentId;
exports.deleteGuardian = deleteGuardian;
// exports.sendOtp = sendOtp;
exports.activateAndDeactive = activateAndDeactive;
exports.inviteToJoin = inviteToJoin;
exports.create = create;
