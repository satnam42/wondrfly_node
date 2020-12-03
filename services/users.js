const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;
const accountSid = 'AC5d73ce4cfa70158e5357a905e379af2b';
var nodemailer = require('nodemailer')
let path = require('path');
const fs = require('fs');
// Your Account SID from www.twilio.com/console
const authToken = 'd864b1037de18df6150de9b4bf97b200'
// d864b1037de18df6150de9b4bf97b200;   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
const crypto = require("crypto");




sendEmail = async (firstName, email, templatePath, subject, OTP) => {
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
      user: `javascript.mspl@gmail.com`,
      pass: `showmydev#$!45`
    }
  });

  let mailOptions = {
    from: "smtp.mailtrap.io",
    to: email, //sending to: E-mail
    subject: subject,
    html: mailBody,
    attachments: [{
      filename: 'welcome_img1.png',
      path: `${__dirname}/../public/images/welcome_img1.png`,
      cid: 'welcome_img1' //same cid value as in the html img src
    },
    {
      filename: 'logo.png',
      path: `${__dirname}/../public/images/logo.png`,
      cid: 'logo1' //same cid value as in the html img src
    },
    {
      filename: 'welcome_img2.png',
      path: `${__dirname}/../public/images/welcome_img2.png`,
      cid: 'welcome_img2' //same cid value as in the html img src
    },
    {
      filename: 'welcome_img3.png',
      path: `${__dirname}/../public/images/welcome_img3.png`,
      cid: 'welcome_img3' //same cid value as in the html img src
    },
    {
      filename: 'welcome_img4.png',
      path: `${__dirname}/../public/images/welcome_img4.png`,
      cid: 'welcome_img4' //same cid value as in the html img src
    },
    {
      filename: 'welcome_img5.png',
      path: `${__dirname}/../public/images/welcome_img5.png`,
      cid: 'welcome_img5' //same cid value as in the html img src
    },
    {
      filename: 'welcome_img6.png',
      path: `${__dirname}/../public/images/welcome_img6.png`,
      cid: 'welcome_img6' //same cid value as in the html img src
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


changePasswordEmail = async (firstName, email, templatePath, subject, OTP) => {
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
      user: `javascript.mspl@gmail.com`,
      pass: `showmydev#$!45`
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
      user: `javascript.mspl@gmail.com`,
      pass: `showmydev#$!45`
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




const setUser = (model, user, context) => {
  const log = context.logger.start("services:users:set");
  if (model.firstName !== "string" && model.firstName !== undefined) {
    user.firstName = model.firstName;
  }

  if (model.lastName !== "string" && model.lastName !== undefined) {
    user.lastName = model.lastName;
  }

  if (model.phoneNumber !== "string" && model.phoneNumber !== undefined) {
    user.phoneNumber = model.phoneNumber;
  }

  if (model.role !== "string" && model.role !== undefined) {
    user.role = model.role;
  }

  log.end();
  user.save();
  return user;

};

const buildUser = async (model, context) => {
  const log = context.logger.start(`services:users:buildUser${model}`);
  const user = await new db.user({
    firstName: model.firstName,
    type: model.type || '',
    email: model.email,
    password: model.password,
    role: model.role,
    createdOn: new Date(),
    updateOn: new Date()
  }).save();
  log.end();
  return user;
};

const register = async (model, context) => {
  const log = context.logger.start("services:users:register");
  const isEmail = await db.user.findOne({ email: { $eq: model.email } });
  if (isEmail) {
    throw new Error("Email already resgister");
  }
  model.password = await encrypt.getHash(model.password, context);
  const user = await buildUser(model, context);
  if (user.role == 'provider') {
    await new db.provider({
      user: user._id,
      createdOn: new Date(),
      updateOn: new Date()
    }).save();
  }
  let templatePath = '../emailTemplates/welcome_parent.html';
  let subject = "welcome to join wonderfly";
  if (user) {
    sendEmail(user.firstName, user.email, templatePath, subject);
  }
  log.end();
  return user;
};


const getById = async (id, context) => {

  const log = context.logger.start(`services:users:getById:${id}`);
  const user = await db.user.findById(id);
  const alerts = await db.alert.findOne().sort({ _id: -1 });

  if (alerts) {
    if (alerts.alertFor == 'parent' && user.role == 'parent') {
      user.alert = alerts.msg;
      user.alertType = alerts.msgType;
      log.end();
      return user;
    }
    if (alerts.alertFor == 'provider' && user.role == 'provider') {
      user.alert = alerts.msg;
      user.alertType = alerts.msgType;
      log.end();
      return user;
    }
    if (alerts.alertFor == 'all') {
      user.alert = alerts.msg;
      user.alertType = alerts.msgType;
      log.end();
      return user;

    }
    if (alerts.email == user.email) {
      user.alert = alerts.msg;
      user.alertType = alerts.msgType;
      log.end();
      return user;

    }
  }
  log.end();
  return user;
};

const get = async (query, context) => {

  const log = context.logger.start(`services:users:get`);
  let pageNo = Number(query.pageNo) || 1;
  let pageSize = Number(query.pageSize) || 10;
  let skipCount = pageSize * (pageNo - 1);
  let users

  if (query.role == 'all') {
    users = await db.user
      .find({}).sort({ _id: -1 })
      .skip(skipCount)
      .limit(pageSize);
    users.count = await db.user.find({}).count();
  }

  else {
    users = await db.user
      .find({ role: query.role }).sort({ _id: -1 })
      .skip(skipCount)
      .limit(pageSize);
    users.count = await db.user.find({ role: query.role }).count();
  }

  log.end();
  return users;

};
const getCount = async (context) => {

  const log = context.logger.start(`services:users:getCount`);

  const userCount = await db.user.find({}).count();
  const providerCount = await db.user.find({ role: 'provider' }).count();
  const parentCount = await db.user.find({ role: 'parent' }).count();
  const childrenCount = await db.user.find({ role: 'child' }).count();
  let count = {
    userCount: userCount,
    providerCount: providerCount,
    parentCount: parentCount,
    childrenCount: childrenCount,
    programCount: 0
  }
  log.end();
  return count;
};
const recentAddedByRole = async (context, query) => {

  const log = context.logger.start(`services:users:recentAddedByRole`);
  const user = await db.user.find({ role: query.role }).sort({ _id: -1 }).limit(5)

  if (!user) {
    throw new Error("user not found");
  }

  log.end();
  return user;

};

const getRecentAdded = async (context) => {
  const log = context.logger.start(`services:users:getRecentAdded`);
  const user = await db.user.find().sort({ _id: -1 }).limit(5)
  log.end();
  return user;
};

const resetPassword = async (id, model, context) => {
  const log = context.logger.start(`service/users/resetPassword: ${model}`);
  const user = await db.user.findById(id);

  const isMatched = encrypt.compareHash(
    model.oldPassword,
    user.password,
    context
  );

  if (isMatched) {
    const newPassword = await encrypt.getHash(model.newPassword, context);
    user.password = newPassword;
    user.updatedOn = new Date();
    user.lastModifiedBy = context.user.id
    await user.save();
    let templatePath = '../emailTemplates/change_password.html';
    let subject = "Password changed";

    changePasswordEmail(user.firstName, user.email, templatePath, subject);

    log.end();
    return "Password Updated Successfully";
  } else {
    log.end();
    throw new Error("Old Password Not Match");
  }
};

const update = async (id, model, context) => {
  const log = context.logger.start(`services:users:update`);
  let entity = await db.user.findById(id);
  if (!entity) {
    throw new Error("invalid user");
  }

  const user = await setUser(model, entity, context);
  log.end();
  return user
  0
};

const login = async (model, context) => {
  const log = context.logger.start("services:users:login");

  const query = {};

  if (model.email) {
    query.email = model.email;
  }

  let user = await db.user.findOne(query);

  if (!user) {
    log.end();
    throw new Error("user not found");
  }

  const isMatched = encrypt.compareHash(model.password, user.password, context);

  if (!isMatched) {
    log.end();
    throw new Error("password mismatch");
  }

  let permissions = []

  let data = await db.permission.aggregate(
    [{ $match: { userId: ObjectId(user.id) } },
    {
      $lookup: {
        from: "permissiontypes",
        localField: "permissionTypeId",
        foreignField: "_id",
        as: "permissions"
      },
    },
    ]
  );
  if (data.length > 0) {
    data.forEach(item => {
      if (!item.isDeleted) {
        item.permissions.forEach(permission => {
          permissions.push(permission.type)
        })
      }
    });
  }

  if (user.role == 'parent') {
    let children = await db.child.find({ parent: user.id })
    if (children.length >= 1) {
      user.isOnBoardingDone = true
    }
    else if (user.role == 'provider') {
      let provider = await db.provider.findOne({ user: user.id })
      if (user.phoneNumber !== '' && user.phoneNumber !== null && user.phoneNumber !== undefined) {
        user.isOnBoardingDone = true
        user.provider = provider
      }
      else {
        user.isOnBoardingDone = false
      }
    }
    else {
      user.isOnBoardingDone = false
    }
  }

  const token = auth.getToken(user, false, context);
  user.lastLoggedIn = Date.now();
  user.token = token;
  user.save();
  user.permissions = permissions;
  log.end();
  return user;
};

const otp = async (mobileNo, context) => {
  var client = new twilio(accountSid, authToken);
  const msg = await client.messages.create({
    body: 'otp is 0000',
    to: `+91${mobileNo}`,  // Text this number
    from: '+15005550006' // From a valid Twilio number
  })
  console.log(msg.status)
  return msg;
};

const logout = async (model, context) => {
  const log = context.logger.start("services:users:logout");
  await context.user.save();
  log.end();
  return "logout successfully";
};
const uploadProfilePic = async (id, file, context) => {
  const log = context.logger.start(`services:users:uploadProfilePic`);
  let user = await db.user.findById(id);
  if (!file) {
    throw new Error("image not found");
  }
  if (!user) {
    throw new Error("user not found");
  }
  if (user.avatarImages != "" && user.avatarImages !== undefined) {

    let picUrl = user.avatarImages.replace(`${imageUrl}`, '');
    try {
      await fs.unlinkSync(`${picUrl}`)
      console.log('File unlinked!');
    } catch (err) {
      console.log(err)
    }
  }
  const avatarImages = imageUrl + file.filename
  user.avatarImages = avatarImages
  await user.save();
  log.end();
  return user
};
const deleteUser = async (id, context) => {
  const log = context.logger.start(`services:users:deleteparent`);
  if (context.user.role != 'superAdmin') {
    throw new Error("you are not authorized to perform this operation");
  }
  if (!id) {
    throw new Error("Id is requried");
  }

  let user = await db.user.findById(id);

  if (user !== null && user.role == 'parent' && user !== undefined) {
    await db.child.deleteOne({ parent: id })
    await db.user.deleteOne({ _id: id })
    let parent = await db.user.findById(id);
    if (parent) {
      throw new Error("something went wrong");
    }
  }

  else if (user !== null && user.role == 'provider' && user !== undefined) {
    await db.program.deleteOne({ user: id })
    await db.provider.deleteOne({ user: id })
    await db.user.deleteOne({ _id: id })
    let provider = await db.user.findById(id);
    if (provider) {
      throw new Error("something went wrong");
    }
  }

  else {
    throw new Error("user not found");
  }

  log.end();
  return 'user delete successfully'

};
const activateAndDeactive = async (context, id, isActivated) => {
  const log = context.logger.start(`services:parents:activateAndDeactive`);
  // if (context.user.role != 'superAdmin') {
  //   throw new Error("you are not authorized to perform this operation");
  // }
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
const sendOtp = async (email, context) => {
  const log = context.logger.start('services/users/sendOtp')
  const user = await db.user.findOne({ email: { $eq: email } });
  if (!user) {
    throw new Error("user not found");
  }
  // four digit otp genration logic
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  // let message = `Your 4 digit One Time Password: <br>${OTP}<br></br>
  //   otp valid only 4 minutes`
  let = subject = "One Time Password"
  let templatePath = '../emailTemplates/forgot_password.html';

  if (user) {
    sendOtpEmail(user.firstName, user.email, templatePath, subject, OTP);
  }
  // await sendMail(email, message, subject)

  let otpToken = auth.getOtpToken(OTP, true, context)
  let data = {
    message: 'OTP successfully sent on register email',
    otpToken: otpToken
  }
  log.end()
  return data
}

const otpVerify = async (model, context) => {
  const log = context.logger.start('services/users/otpVerified')
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
  let data = {
    message: 'otp verify successfully',
    otpVerifyToken: model.otpToken
  }
  log.end()
  return data
}
const forgotPassword = async (model, context) => {
  const log = context.logger.start('services/users/forgotPassword')
  const user = await db.user.findOne({ email: { $eq: model.email } });
  const otp = await auth.extractToken(model.otpToken, context)
  if (otp.name === "TokenExpiredError") {
    throw new Error("otp expired for forgot password");
  }
  if (otp.name === "JsonWebTokenError") {
    throw new Error("invalid token");
  }
  user.password = await encrypt.getHash(model.newPassword, context)
  await user.save()
  let = subject = "Reset password"
  let templatePath = '../emailTemplates/change_password.html';

  if (user) {
    changePasswordEmail(user.firstName, user.email, templatePath, subject);
  }
  log.end()
  return "Password changed Succesfully"
}
const sendMail = async (email, message, subject) => {
  var smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: `javascript.mspl@gmail.com`,
      pass: `showmydev#$!45`
    }
  });
  // email send to registered email
  var mailOptions = {
    from: 'LetsPlay',
    to: email,
    subject: subject,
    html: message
  };

  let mailSent = await smtpTrans.sendMail(mailOptions)
  if (mailSent) {
    console.log("Message sent: %s", mailSent.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
    return
  } else {
    log.end()
    throw new Error("Unable to send email try after sometime");
  }
}
const tellAFriend = async (model, context) => {
  const log = context.logger.start('services/users/tellAFriend')
  if (!model.email) {
    throw new Error("email not found");
  }
  let message = `hi ${model.fullName}, <br> ${model.parentName} invite you to join letsplays  <br> ${model.personalNote}`
  subject = 'invitation'
  await sendMail(model.email, message, subject)
  log.end()
  return
}
const feedback = async (model, context) => {
  const log = context.logger.start('services/users/feedback')
  let user = await db.user.findById(model.id);
  if (!user) {
    throw new Error("user not found");
  }
  await new db.feedback({
    feedback: model.feedback,
    user: model.id || '',
    createdOn: new Date(),
    updateOn: new Date()
  }).save();
  log.end();
  return
}
const getProfileProgress = async (query, context) => {
  const log = context.logger.start('services/users/getProfieProgress')
  if (!query.id) {
    throw new Error("user id not found");
  }
  if (!query.role) {
    throw new Error("user role not found");
  }
  let progress = 20;
  let user = await db.user.findById(query.id);
  if (user.phoneNumber !== "string" && user.phoneNumber !== undefined && user.phoneNumber !== "") {
    progress += 10
  }
  if (user.avatarImages !== "string" && user.avatarImages !== undefined && user.avatarImages !== "") {
    progress += 10
  }
  if (user.addressLine1 !== "string" && user.addressLine1 !== undefined && user.addressLine1 !== "") {
    progress += 10
  }
  if (query.role == 'parent') {
    let children = await db.child.find({ parent: user.id })
    if (children.length > 1) {
      let childCount = 1
      children.forEach(child => {
        while (childCount < 3) {
          if (child.name !== "string" && child.name !== undefined && child.name !== "") {
            progress += 2
          }
          if (child.age !== "string" && child.age !== undefined && child.age !== "") {
            progress += 2
          }
          if (child.schoolinfo !== "string" && child.schoolinfo !== undefined && child.schoolinfo !== "") {
            progress += 1
          }
          if (child.avtar !== "string" && child.avtar !== undefined && child.avtar !== "") {
            progress += 1
          }
          if (child.sex !== "string" && child.sex !== undefined && child.sex !== "") {
            progress += 1
          }
          if (child.relationToChild !== "string" && child.relationToChild !== undefined && child.relationToChild !== "") {
            progress += 1
          }
          if (child.interestInfo.length > 1) {
            progress += 2
          }
          childCount++
        }
      });
    }
  } else {
    const program = await db.program.find({ user: query.id });
    if (program.length > 1) {
      progress += 40
    }
  }
  log.end();
  let data = {
    profileProgress: progress
  }
  return data;
};
const verifyAnswer = async (id, model, context) => {
  const log = context.logger.start(`service/users/verifyAnswer: ${model}`);
  const user = await db.user.findById(id);

  if (user.answer == model.answer) {
    return "Answer Verify Successfully";
  } else {
    log.end();
    throw new Error("Answer Not Match");
  }
};


// const forgotPasswordVerifyEmail = async (model, context) => {
//   const log = context.logger.start('service/users/forgotPasswordVerifyEmail');

//   const reset = {};
//   const resetPasswordToken = crypto.randomBytes(20).toString("hex");
//   const resetPasswordExpires = Date.now() + 3600000; //expires in an hour

//   reset.resetPasswordToken = resetPasswordToken;
//   reset.resetPasswordExpires = resetPasswordExpires;

//   const link = 'http://52.15.99.207:6700/resetPassword/' + resetPasswordToken;

//   async function storedToken() {
//     await db.user.findOneAndUpdate({ email: model.email }, { $set: reset }, { new: true }).then((tkn) => {
//       console.log("tkn");
//     });
//   }

//   let user = await db.user.findOne({ email: model.email })

//   if (!user) {
//     log.end();
//     throw new Error("The email address " + model.email + " is not associated with any account. Please check your email address and try again.");
//   } else {
//     storedToken();

//     let templatePath = '../emailTemplates/forgot_password.html';
//     let subject = "Forgot Password";
//     if (user) {
//       const mailrespose = await sendEmail(user.firstName, user.email, templatePath, subject, link);
//     }


// let mailBody = fs.readFileSync(path.join(__dirname, '../emailTemplates/forgot_password.html')).toString();
// // let date = moment(new Date()).format('L');
// mailBody = mailBody.replace(/{{firstname}}/g, user.firstName);
// mailBody = mailBody.replace(/"url_link_forgotPassword"/g, link);
// // mailBody = mailBody.replace(/{{date}}/g, date);

// let smtpTransport = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: `javascript.mspl@gmail.com`,
//     pass: `showmydev#$!45`
//   }
// });
// let mailOptions = {
//   from: "smtp.mailtrap.io",
//   to: user.email, //sending to: E-mail
//   subject: "Forgot password",
//   html: mailBody,
// };

// smtpTransport.sendMail(mailOptions, function (error, info) {
//   if (!error) {
//     log.end();
//     console.log("email sent");
//   } else {
//     log.end();
//     return error.message
//   }
// });
//   }
// };



exports.register = register;
exports.get = get;
exports.login = login;
exports.resetPassword = resetPassword;
exports.update = update;
exports.getById = getById;
exports.logout = logout;
exports.uploadProfilePic = uploadProfilePic;
exports.getCount = getCount;
exports.getRecentAdded = getRecentAdded;
exports.recentAddedByRole = recentAddedByRole;
exports.deleteUser = deleteUser;
exports.activateAndDeactive = activateAndDeactive;
exports.otp = otp;
exports.sendOtp = sendOtp;
exports.otpVerify = otpVerify;
exports.forgotPassword = forgotPassword;
exports.tellAFriend = tellAFriend;
exports.feedback = feedback;
exports.getProfileProgress = getProfileProgress;
exports.verifyAnswer = verifyAnswer;
// exports.forgotPasswordVerifyEmail = forgotPasswordVerifyEmail;