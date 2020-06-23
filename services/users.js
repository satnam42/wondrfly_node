const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const path = require("path");
const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;
const accountSid = 'AC5d73ce4cfa70158e5357a905e379af2b';
var nodemailer = require('nodemailer')
// Your Account SID from www.twilio.com/console
const authToken = 'd864b1037de18df6150de9b4bf97b200'
// d864b1037de18df6150de9b4bf97b200;   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');

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

  const log = context.logger.start(`services:users:build${model}`);
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
  model.password = encrypt.getHash(model.password, context);
  const user = await buildUser(model, context);
  log.end();
  return user;

};

const getById = async (id, context) => {

  const log = context.logger.start(`services:users:getById:${id}`);
  const user = await db.user.findById(id);
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
      .find({})
      .skip(skipCount)
      .limit(pageSize);
    users.count = await db.user.find({}).count();
  }

  else {
    users = await db.user
      .find({ role: query.role })
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
    const newPassword = encrypt.getHash(model.newPassword, context);
    user.password = newPassword;
    user.updatedOn = new Date();
    user.lastModifiedBy = context.user.id
    await user.save();
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

  const token = auth.getToken(user, false, context);
  user.lastLoggedIn = Date.now();
  user.token = token;
  user.save();
  user.permissions = permissions
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
  const avatarImages = imageUrl + 'assets/images/' + file.filename
  user.avatarImages = avatarImages
  await user.save();
  log.end();
  return user
};

const deleteUser = async (context, id) => {
  const log = context.logger.start(`services:users:deleteparent`);
  if (context.user.role != 'superAdmin') {
    throw new Error("you are not authorized to perform this operation");
  }

  if (!id) {
    throw new Error("userId is requried");
  }

  let user = await db.user.findById(id);

  if (!user) {
    throw new Error("user not found");
  }

  user.isDeleted = true
  user.updatedOn = Date.now()
  user.deletedBy = context.user.id
  user.save()
  log.end();
  return user

};
const activateAndDeactive = async (context, id, isActivated) => {
  const log = context.logger.start(`services:parents:activateAndDeactive`);
  if (context.user.role != 'superAdmin') {
    throw new Error("you are not authorized to perform this operation");
  }
  if (!id) {
    throw new Error("Id is requried");
  }
  if (!isActivated) {
    throw new Error("isActivated requried");
  }
  let user = await db.user.findById(id);
  if (!parent) {
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
  var smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: `javascript.mspl@gmail.com`,
      pass: `yesterday@4321`
    }
  });

  // email send to registered email
  var mailOptions = {
    from: 'LetsPlay',
    to: user.email,
    subject: "One Time Password",
    html: `Your 4 digit One Time Password:<br>${OTP}<br>
    otp valid only 4 minutes`
  };

  let mailSent = await smtpTrans.sendMail(mailOptions)
  if (mailSent) {
    console.log("Message sent: %s", mailSent.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(mailSent));
    // return mailSent
  } else {
    log.end()
    throw new Error("Unable to send email try after sometime");
  }
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
  user.password = encrypt.getHash(model.newPassword, context)
  await user.save()
  log.end()
  return "Password changed Succesfully"
}

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
exports.deleteUser = deleteUser
exports.activateAndDeactive = activateAndDeactive
exports.otp = otp;
exports.sendOtp = sendOtp
exports.otpVerify = otpVerify
exports.forgotPassword = forgotPassword