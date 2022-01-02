const encrypt = require('../permit/crypto.js');
const auth = require('../permit/auth');
const imageUrl = require('config').get('image').url;
const ObjectId = require('mongodb').ObjectID;
const accountSid = 'AC5d73ce4cfa70158e5357a905e379af2b';
var nodemailer = require('nodemailer');
let path = require('path');
const fs = require('fs');
// Your Account SID from www.twilio.com/console
const authToken = 'd864b1037de18df6150de9b4bf97b200';
// d864b1037de18df6150de9b4bf97b200;   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
const crypto = require('crypto');
const moment = require('moment');
var smtpPassword = require('aws-smtp-credentials');
const aws_accessKey = require('config').get('awsSes').accessKey;
const aws_secretKey = require('config').get('awsSes').secretKey;
const aws_region = require('config').get('awsSes').region;
var sesTransport = require('nodemailer-ses-transport');
const mailchimp = require('./mailchimp');
sendEmail = async (firstName, email, templatePath, subject, OTP) => {
  let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);

  if (OTP) {
    mailBody = mailBody.replace(/{{OTP}}/g, OTP);
  }

  // Send e-mail using AWS SES
  // var sesTransporter = nodemailer.createTransport(sesTransport({
  //   accessKeyId: aws_accessKey,
  //   secretAccessKey: aws_secretKey,
  //   region: aws_region
  // }));
  //Send e-mail using gmail
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
    // attachments: [{
    //   filename: 'welcome_img1.png',
    //   path: `${__dirname}/../public/images/welcome_img1.png`,
    //   cid: 'welcome_img1' //same cid value as in the html img src
    // },
    // {
    //   filename: 'complete_profile.png',
    //   path: `${__dirname}/../public/images/complete_profile.png`,
    //   cid: 'complete_profile' //same cid value as in the html img src
    // },
    // {
    //   filename: 'logo.png',
    //   path: `${__dirname}/../public/images/logo.png`,
    //   cid: 'logo1' //same cid value as in the html img src
    // },
    // {
    //   filename: 'welcome_img2.png',
    //   path: `${__dirname}/../public/images/welcome_img2.png`,
    //   cid: 'welcome_img2' //same cid value as in the html img src
    // },
    // {
    //   filename: 'welcome_img3.png',
    //   path: `${__dirname}/../public/images/welcome_img3.png`,
    //   cid: 'welcome_img3' //same cid value as in the html img src
    // },
    // {
    //   filename: 'welcome_img4.png',
    //   path: `${__dirname}/../public/images/welcome_img4.png`,
    //   cid: 'welcome_img4' //same cid value as in the html img src
    // },
    // {
    //   filename: 'welcome_img5.png',
    //   path: `${__dirname}/../public/images/welcome_img5.png`,
    //   cid: 'welcome_img5' //same cid value as in the html img src
    // },
    // {
    //   filename: 'welcome_img6.png',
    //   path: `${__dirname}/../public/images/welcome_img6.png`,
    //   cid: 'welcome_img6' //same cid value as in the html img src
    // },
    // {
    //   filename: 'logo_white.png',
    //   path: `${__dirname}/../public/images/logo_white.png`,
    //   cid: 'logo_white' //same cid value as in the html img src
    // },
    // {
    //   filename: 'fb.png',
    //   path: `${__dirname}/../public/images/fb.png`,
    //   cid: 'fb' //same cid value as in the html img src
    // },
    // {
    //   filename: 'insta.png',
    //   path: `${__dirname}/../public/images/insta.png`,
    //   cid: 'insta' //same cid value as in the html img src
    // },
    // {
    //   filename: 'pinterest.png',
    //   path: `${__dirname}/../public/images/pinterest.png`,
    //   cid: 'pinterest' //same cid value as in the html img src
    // }
    // ]
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

changePasswordEmail = async (firstName, email, templatePath, subject, OTP) => {
  let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);

  if (OTP) {
    mailBody = mailBody.replace(/{{OTP}}/g, OTP);
  }

  // Send e-mail using AWS SES
  // var sesTransporter = nodemailer.createTransport(sesTransport({
  //   accessKeyId: aws_accessKey,
  //   secretAccessKey: aws_secretKey,
  //   region: aws_region
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

sendOtpEmail = async (firstName, email, templatePath, subject, OTP) => {
  let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);

  if (OTP) {
    mailBody = mailBody.replace(/{{OTP}}/g, OTP);
  }

  // Send e-mail using AWS SES
  // var sesTransporter = nodemailer.createTransport(sesTransport({
  //   accessKeyId: aws_accessKey,
  //   secretAccessKey: aws_secretKey,
  //   region: aws_region
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

completeProfileEmail = async (
  userId,
  firstName,
  email,
  templatePath,
  subject
) => {
  let mailBody = fs.readFileSync(path.join(__dirname, templatePath)).toString();
  mailBody = mailBody.replace(/{{firstname}}/g, firstName);

  // Send e-mail using AWS SES
  // var sesTransporter = nodemailer.createTransport(sesTransport({
  //   accessKeyId: aws_accessKey,
  //   secretAccessKey: aws_secretKey,
  //   region: aws_region
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
        filename: 'complete_profile.png',
        path: `${__dirname}/../public/images/complete_profile.png`,
        cid: 'complete_profile', //same cid value as in the html img src
      },

      {
        filename: 'logo_white.png',
        path: `${__dirname}/../public/images/logo_white.png`,
        cid: 'logo_white', //same cid value as in the html img src
      },
      {
        filename: 'tick.png',
        path: `${__dirname}/../public/images/tick.png`,
        cid: 'tick', //same cid value as in the html img src
      },
      {
        filename: 'fb.png',
        path: `${__dirname}/../public/images/fb.png`,
        cid: 'fb', //same cid value as in the html img src
      },
      {
        filename: 'insta.png',
        path: `${__dirname}/../public/images/insta.png`,
        cid: 'insta', //same cid value as in the html img src
      },
      {
        filename: 'pinterest.png',
        path: `${__dirname}/../public/images/pinterest.png`,
        cid: 'pinterest', //same cid value as in the html img src
      },
    ],
  };
  let mailSent = await smtpTransport.sendMail(mailOptions);
  if (mailSent) {
    console.log('Message sent: %s', mailSent.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailSent));
    await db.user.findByIdAndUpdate(userId, {
      $set: {
        profileCompleteEmail: true,
      },
    });
    return;
  } else {
    log.end();
    throw new Error('Unable to send email try after sometime');
  }
};

const setUser = (model, user, context) => {
  const log = context.logger.start('services:users:set');
  if (model.firstName !== 'string' && model.firstName !== undefined) {
    user.firstName = model.firstName;
  }

  if (model.lastName !== 'string' && model.lastName !== undefined) {
    user.lastName = model.lastName;
  }

  if (model.phoneNumber !== 'string' && model.phoneNumber !== undefined) {
    user.phoneNumber = model.phoneNumber;
  }

  if (model.role !== 'string' && model.role !== undefined) {
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
    role: model.role.toLowerCase(),
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();
  log.end();
  return user;
};

function humanize(str) {
  var i,
    frags = str.split(' ');
  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toLowerCase() + frags[i].slice(1);
  }
  return frags.join('_');
}

const register = async (model, context) => {
  const log = context.logger.start('services:users:register');
  const isEmail = await db.user.findOne({ email: { $eq: model.email } });
  if (isEmail) {
    throw new Error('Email already resgister');
  }
  model.password = await encrypt.getHash(model.password, context);
  const user = await buildUser(model, context);
  if (user.role == 'provider') {
    if (user.firstName) {
      word = humanize(user.firstName);
    }
    await new db.provider({
      user: user._id,
      alias: word,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save();
  }
  //-----------------------------

  //------------------------------
  let templatePath = '../emailTemplates/newWelcome.html';
  let subject = 'welcome to join wonderfly';
  if (user) {
    if (user.role == 'parent') {
      const today = new Date();
      let date = moment(today).format('YYYY-MM-DD');
      // let time = moment(today).format('hh:mm A');
      await new db.notification({
        title: 'Parent Sign up',
        description: `You registered as a parent successfully on ${date}`,
        user: user._id,
        createdOn: new Date(),
        updateOn: new Date(),
      }).save();
    }
    const opt = {
      name: 'welcome-email-for-providers',
      email: [
        {
          email: user.email,
          type: 'to',
        },
      ],
      subject: 'Welcome',
      options: [
        {
          name: "FNAME",
          content: user.firstName
        }
      ]
    };
    const mailchimpMail = await mailchimp.dynamic(
      opt.name,
      opt.email,
      opt.subject,
      opt.options
    );
    // sendEmail(user.firstName, user.email, templatePath, subject);
  }
  const token = auth.getToken(user, false, context);
  user.token = token;
  log.end();
  return user;
};

const getById = async (id, context) => {
  const log = context.logger.start(`services:users:getById:${id}`);
  const user = await db.user.findById(id).populate('interests');
  let data = {};
  if (!user) {
    throw new Error('user Not found');
  }
  console.log('mandeep');
  if (user.notificationsOnOff) {
    let notification = {};
    const notifications = await db.notification.find({ user: id });
    notification.notifications = notifications;
    notification.count = await db.notification.count({ user: id });
    if (user.role !== 'provider') {
      user.notifications = notification;
    }

    if (user.role == 'provider') {
      const provider = await db.provider
        .findOne({ user: id })
        .populate('addedBy')
        .populate('categories')
        .populate('subCategoryIds');
      data.user = user;
      data.provider = provider;
      data.notifications = notification;
      log.end();
      return data;
    }
  }
  if (user.role == 'provider') {
    const provider = await db.provider
      .findOne({ user: id })
      .populate('addedBy');
    data.user = user;
    data.provider = provider;
    log.end();
    return data;
  }

  log.end();
  return user;
};

const get = async (query, context) => {
  const log = context.logger.start(`services:users:get`);
  let pageNo = Number(query.pageNo) || 1;
  let pageSize = Number(query.pageSize) || 10;
  let skipCount = pageSize * (pageNo - 1);
  let users;

  if (query.role == 'all') {
    users = await db.user
      .find({})
      .sort({ _id: -1 })
      .skip(skipCount)
      .limit(pageSize);

    users.count = await db.user.find({}).count();
  } else {
    users = await db.user
      .find({ role: query.role })
      .sort({ _id: -1 })
      .skip(skipCount)
      .limit(pageSize);
    users.count = await db.user.find({ role: query.role }).count();

    if (query.role == 'provider') {
      users.forEach((user, index) => {
        let progress = 20;
        if (
          user.phoneNumber !== 'string' &&
          user.phoneNumber !== undefined &&
          user.phoneNumber !== ''
        ) {
          progress += 10;
        }
        if (
          user.avatarImages !== 'string' &&
          user.avatarImages !== undefined &&
          user.avatarImages !== ''
        ) {
          progress += 10;
        }
        if (
          user.addressLine1 !== 'string' &&
          user.addressLine1 !== undefined &&
          user.addressLine1 !== ''
        ) {
          progress += 10;
        }
        if (
          user.city !== 'string' &&
          user.city !== undefined &&
          user.city !== ''
        ) {
          progress += 10;
        }
        if (
          user.state !== 'string' &&
          user.state !== undefined &&
          user.state !== ''
        ) {
          progress += 10;
        }
        if (
          user.country !== 'string' &&
          user.country !== undefined &&
          user.country !== ''
        ) {
          progress += 10;
        }
        let objUser = user;
        users.splice(index, 1);

        objUser.progress = progress;
        users.splice(index, 0, objUser);
      });
    }
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
    programCount: 0,
  };
  log.end();
  return count;
};

const recentAddedByRole = async (context, query) => {
  const log = context.logger.start(`services:users:recentAddedByRole`);
  const user = await db.user
    .find({ role: query.role })
    .sort({ _id: -1 })
    .limit(5);
  if (!user) {
    throw new Error('user not found');
  }
  log.end();
  return user;
};

const getRecentAdded = async (context) => {
  const log = context.logger.start(`services:users:getRecentAdded`);
  const user = await db.user.find().sort({ _id: -1 }).limit(5);
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
    user.lastModifiedBy = context.user.id;
    await user.save();

    if (user) {
      const today = new Date();
      let date = moment(today).format('YYYY-MM-DD');
      let time = moment(today).format('hh:mm A');
      await new db.notification({
        title: 'change password',
        description: `Your password is changed successfully on ${date} at ${time}`,
        user: user._id,
        createdOn: new Date(),
        updateOn: new Date(),
      }).save();
    }

    let templatePath = '../emailTemplates/change_password.html';
    let subject = 'Password changed';

    // changePasswordEmail(user.firstName, user.email, templatePath, subject);
    const opt = {
      name: 'password-change-complete',
      email: [
        {
          email: user.email,
          type: 'to',
        },
      ],
      subject: 'Password Changed',
    };
    const mailchimpMail = await mailchimp.static(
      opt.name,
      opt.email,
      opt.subject
    );
    log.end();
    return 'Password Updated Successfully';
  } else {
    log.end();
    throw new Error('Old Password Not Match');
  }
};

const update = async (id, model, context) => {
  const log = context.logger.start(`services:users:update`);
  let entity = await db.user.findById(id);
  if (!entity) {
    throw new Error('invalid user');
  }

  const user = await setUser(model, entity, context);
  log.end();
  return user;
  0;
};

const login = async (model, context) => {
  const log = context.logger.start('services:users:login');

  const query = {};

  if (model.email) {
    query.email = model.email;
  }

  let user = await db.user.findOne(query);

  if (!user) {
    log.end();
    throw new Error('user not found');
  }

  if (!user.isActivated) {
    log.end();
    throw new Error(
      'You can not login to this website because you are deactivated'
    );
  }

  const isMatched = encrypt.compareHash(model.password, user.password, context);

  if (!isMatched) {
    log.end();
    throw new Error('password mismatch');
  }
  let progress = 10;
  //  notification for profile complete
  if (
    user.phoneNumber !== 'string' &&
    user.phoneNumber !== undefined &&
    user.phoneNumber !== ''
  ) {
    progress += 20;
  }
  if (
    user.avatarImages !== 'string' &&
    user.avatarImages !== undefined &&
    user.avatarImages !== ''
  ) {
    progress += 20;
  }
  if (
    user.addressLine1 !== 'string' &&
    user.addressLine1 !== undefined &&
    user.addressLine1 !== ''
  ) {
    progress += 20;
  }

  if (progress !== 100 && user.loginCount <= 2) {
    await new db.notification({
      title: 'About Profile',
      description: `Your profile is not 100% complete please complete it`,
      user: user._id,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save();
  }

  //  notificaton for profile complete end

  let permissions = [];

  let data = await db.permission.aggregate([
    { $match: { userId: ObjectId(user.id) } },
    {
      $lookup: {
        from: 'permissiontypes',
        localField: 'permissionTypeId',
        foreignField: '_id',
        as: 'permissions',
      },
    },
  ]);
  if (data.length > 0) {
    data.forEach((item) => {
      if (!item.isDeleted) {
        item.permissions.forEach((permission) => {
          permissions.push(permission.type);
        });
      }
    });
  }

  if (user.role == 'parent') {
    let children = await db.child.find({ parent: user.id });
    if (children.length >= 1) {
      user.isOnBoardingDone = true;
    } else {
      user.isOnBoardingDone = false;
    }
  }
  if (user.role == 'provider') {
    let provider = await db.provider.findOne({ user: user.id });
    if (
      user.phoneNumber !== '' &&
      user.phoneNumber !== null &&
      user.phoneNumber !== undefined &&
      user.addressLine1 !== '' &&
      user.addressLine1 !== null &&
      user.addressLine1 !== undefined &&
      user.firstName !== '' &&
      user.firstName !== null &&
      user.firstName !== undefined &&
      user.city !== '' &&
      user.city !== null &&
      user.city !== undefined &&
      user.state !== '' &&
      user.state !== null &&
      user.state !== undefined &&
      provider.about !== '' &&
      provider.about !== null &&
      provider.about !== undefined
    ) {
      user.isOnBoardingDone = true;
      user.provider = provider;
    } else {
      user.isOnBoardingDone = false;
    }
  }

  const token = auth.getToken(user, false, context);
  user.lastLoggedIn = Date.now();
  user.loginCount = user.loginCount += 1;
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
    to: `+91${mobileNo}`, // Text this number
    from: '+15005550006', // From a valid Twilio number
  });
  console.log(msg.status);
  return msg;
};

const logout = async (model, context) => {
  const log = context.logger.start('services:users:logout');
  await context.user.save();
  log.end();
  return 'logout successfully';
};
const uploadProfilePic = async (id, file, context) => {
  const log = context.logger.start(`services:users:uploadProfilePic`);
  let user = await db.user.findById(id);
  if (!file) {
    throw new Error('image not found');
  }
  if (!user) {
    throw new Error('user not found');
  }
  if (user.avatarImages != '' && user.avatarImages !== undefined) {
    let picUrl = user.avatarImages.replace(`${imageUrl}`, '');
    try {
      await fs.unlinkSync(`${picUrl}`);
      console.log('File unlinked!');
    } catch (err) {
      console.log(err);
    }
  }
  // const avatarImages = imageUrl + 'assets/images/' + file.filename
  const avatarImages = imageUrl + file.filename;
  user.avatarImages = avatarImages;
  await user.save();
  log.end();
  return user;
};
const deleteUser = async (id, context) => {
  const log = context.logger.start(`services:users:deleteparent`);
  // (context.user.role != 'superAdmin')
  if (!(context.user.role == 'admin' || context.user.role == 'superAdmin')) {
    throw new Error('you are not authorized to perform this operation');
  }
  if (!id) {
    throw new Error('Id is requried');
  }

  let user = await db.user.findById(id);

  if (user !== null && user.role == 'parent' && user !== undefined) {
    const invitedUsers = await db.invitation.find({ invitedBy: id });
    if (invitedUsers.length > 0) {
      invitedUsers.forEach(async (invited) => {
        await db.user.deleteOne({ _id: invited.user });
      });
    }

    await db.child.deleteMany({ parent: id });
    await db.guardian.deleteMany({ invitedBy: id });
    await db.invitation.deleteMany({ invitedBy: id });

    await db.user.deleteOne({ _id: id });
    let parent = await db.user.findById(id);
    if (parent) {
      throw new Error('something went wrong');
    }
  } else if (user !== null && user.role == 'provider' && user !== undefined) {
    await db.program.deleteMany({ user: id });
    await db.provider.deleteOne({ user: id });
    await db.user.deleteOne({ _id: id });
    let provider = await db.user.findById(id);
    if (provider) {
      throw new Error('something went wrong');
    }
  } else {
    throw new Error('user not found');
  }

  log.end();
  return 'user delete successfully';
};
const activateAndDeactive = async (context, id, isActivated) => {
  const log = context.logger.start(`services:parents:activateAndDeactive`);
  // if (context.user.role != 'superAdmin') {
  //   throw new Error("you are not authorized to perform this operation");
  // }
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
const sendOtp = async (email, context) => {
  const log = context.logger.start('services/users/sendOtp');
  const user = await db.user.findOne({ email: { $eq: email } });
  if (!user) {
    throw new Error('user not found');
  }
  // four digit otp genration logic
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  // let message = `Your 4 digit One Time Password: <br>${OTP}<br></br>
  //   otp valid only 4 minutes`
  let subject = 'One Time Password';
  let templatePath = '../emailTemplates/forgot_password.html';

  if (user) {
    const opt = {
      name: 'send-otp',
      email: [
        {
          email: user.email,
          type: 'to',
        },
      ],
      subject: subject,
      options: [
        {
          name: 'FNAME',
          content: user.firstName,
        },
        {
          name: 'OTP',
          content: OTP,
        },
      ],
    };
    const mailchimpMail = await mailchimp.dynamic(
      opt.name,
      opt.email,
      opt.subject,
      opt.options
    );

    // sendOtpEmail(user.firstName, user.email, templatePath, subject, OTP);
  }
  // await sendMail(email, message, subject)

  let otpToken = auth.getOtpToken(OTP, true, context);
  let data = {
    message: 'OTP successfully sent on register email',
    otpToken: otpToken,
  };
  log.end();
  return data;
};

const otpVerify = async (model, context) => {
  const log = context.logger.start('services/users/otpVerified');
  const otp = await auth.extractToken(model.otpToken, context);
  if (!model.otpToken) {
    throw new Error('otpToken is required');
  }
  if (otp.id != model.otp) {
    throw new Error('please enter valid otp');
  }
  if (otp.name === 'TokenExpiredError') {
    throw new Error('otp expired');
  }
  if (otp.name === 'JsonWebTokenError') {
    throw new Error('otp is invalid');
  }
  let data = {
    message: 'otp verify successfully',
    otpVerifyToken: model.otpToken,
  };
  log.end();
  return data;
};
const forgotPassword = async (model, context) => {
  const log = context.logger.start('services/users/forgotPassword');
  const user = await db.user.findOne({ email: { $eq: model.email } });
  const otp = await auth.extractToken(model.otpToken, context);
  // if (otp.name === 'TokenExpiredError') {
  //   throw new Error('otp expired for forgot password');
  // }
  // if (otp.name === 'JsonWebTokenError') {
  //   throw new Error('invalid token');
  // }
  user.password = await encrypt.getHash(model.newPassword, context);
  await user.save();

  if (user) {
    const today = new Date();
    let date = moment(today).format('YYYY-MM-DD');
    let time = moment(today).format('hh:mm A');

    await new db.notification({
      title: 'reset password',
      description: `Your password is reset successfully on ${date} at ${time}`,
      user: user._id,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save();
  }

  let = subject = 'Reset password';
  let templatePath = '../emailTemplates/change_password.html';

  if (user) {
    const opt = {
      name: 'password-reset-successfully',
      email: [
        {
          email: user.email,
          type: 'to',
        },
      ],
      subject: 'Password Changed',
      options: [
        {
          name: 'FNAME',
          content: user.firstName,
        },
      ],
    };
    const mailchimpMail = await mailchimp.dynamic(
      opt.name,
      opt.email,
      opt.subject,
      opt.options
    );
    // changePasswordEmail(user.firstName, user.email, templatePath, subject);
  }
  log.end();
  return 'Password changed Succesfully';
};
const sendMail = async (email, message, subject) => {
  var smtpTrans = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: `wondrfly@gmail.com`,
      pass: `wondrfly@123`,
    },
  });
  // email send to registered email
  var mailOptions = {
    from: 'LetsPlay',
    to: email,
    subject: subject,
    html: message,
  };

  let mailSent = await smtpTrans.sendMail(mailOptions);
  if (mailSent) {
    console.log('Message sent: %s', mailSent.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailSent));
    return;
  } else {
    log.end();
    throw new Error('Unable to send email try after sometime');
  }
};
const tellAFriend = async (model, context) => {
  const log = context.logger.start('services/users/tellAFriend');
  if (!model.email) {
    throw new Error('email not found');
  }
  let message = `hi ${model.fullName}, <br> ${model.parentName} invite you to join letsplays  <br> ${model.personalNote}`;
  subject = 'invitation';
  await sendMail(model.email, message, subject);
  log.end();
  return;
};
const feedback = async (model, context) => {
  const log = context.logger.start('services/users/feedback');
  let user = await db.user.findById(model.id);
  if (!user) {
    throw new Error('user not found');
  }
  await new db.feedback({
    feedback: model.feedback,
    user: model.id || '',
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();
  log.end();
  return;
};
const getProfileProgress = async (query, context) => {
  const log = context.logger.start('services/users/getProfieProgress');
  if (!query.id) {
    throw new Error('user id not found');
  }
  if (!query.role) {
    throw new Error('user role not found');
  }
  let progress = 10;
  let user = await db.user.findById(query.id);
  if (
    user.phoneNumber !== 'string' &&
    user.phoneNumber !== undefined &&
    user.phoneNumber !== ''
  ) {
    progress += 20;
  }
  if (
    user.avatarImages !== 'string' &&
    user.avatarImages !== undefined &&
    user.avatarImages !== ''
  ) {
    progress += 20;
  }
  if (
    user.addressLine1 !== 'string' &&
    user.addressLine1 !== undefined &&
    user.addressLine1 !== ''
  ) {
    progress += 20;
  }
  // if (user.city !== "string" && user.city !== undefined && user.city !== "") {
  //   progress += 15
  // }
  // if (user.state !== "string" && user.state !== undefined && user.state !== "") {
  //   progress += 15
  // }
  // if (user.country !== "string" && user.country !== undefined && user.country !== "") {
  //   progress += 15
  // }

  if (query.role == 'parent') {
    let children = await db.child.find({ parent: user.id });
    if (children.length > 1) {
      let childCount = 1;
      children.forEach((child) => {
        while (childCount < 2) {
          // if (child.name !== "string" && child.name !== undefined && child.name !== "") {
          //   progress += 2
          // }
          // if (child.age !== "string" && child.age !== undefined && child.age !== "") {
          //   progress += 2
          // }
          // if (child.schoolinfo !== "string" && child.schoolinfo !== undefined && child.schoolinfo !== "") {
          //   progress += 1
          // }
          // if (child.avtar !== "string" && child.avtar !== undefined && child.avtar !== "") {
          //   progress += 1
          // }
          // if (child.sex !== "string" && child.sex !== undefined && child.sex !== "") {
          //   progress += 1
          // }
          // if (child.relationToChild !== "string" && child.relationToChild !== undefined && child.relationToChild !== "") {
          //   progress += 1
          // }
          // if (child.interestInfo.length >= 1) {
          //   progress += 2
          // }
          progress += 30;
          childCount++;
        }
      });
    }
  }
  if (query.role == 'provider') {
    const program = await db.program.find({ user: query.id });
    if (program.length >= 1) {
      progress += 10;
    }
  }
  if (
    user.role == 'parent' &&
    user.profileCompleteEmail != true &&
    progress >= 50
  ) {
    let templatePath = '../emailTemplates/complete_profile_parent.html';
    let subject = 'parent profile completness';
    if (user) {
      completeProfileEmail(
        query.id,
        user.firstName,
        user.email,
        templatePath,
        subject
      );
    }
  }
  if (
    user.role == 'provider' &&
    user.profileCompleteNotification != true &&
    progress >= 50
  ) {
    const notification = await new db.notification({
      title: 'User Profile',
      description: 'Congratulations! your profile is 50% complete',
      profileCompleteNotification: true,
      user: query.id,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save();
    await db.user.findByIdAndUpdate(query.id, {
      $set: {
        profileCompleteNotification: true,
      },
    });
  }
  if (
    user.role == 'provider' &&
    user.profileCompleteEmail != true &&
    progress >= 50
  ) {
    let templatePath = '../emailTemplates/complete_profile_provider.html';
    let subject = 'provider profile completness';
    if (user) {
      completeProfileEmail(
        query.id,
        user.firstName,
        user.email,
        templatePath,
        subject
      );
    }
  }

  let today = moment(new Date()).format('YYYY-MM-DD');

  var new_date = moment(new Date()).add(7, 'days');
  let day = moment(new_date._d).format('YYYY-MM-DD');

  if (progress !== 100) {
    if (user.weeklyDate) {
      if (user.weeklyDate == today) {
        await new db.notification({
          title: 'About Profile',
          description: `Your profile is not 100% complete please complete it`,
          user: user._id,
          createdOn: new Date(),
          updateOn: new Date(),
        }).save();
        await db.user.findByIdAndUpdate(query.id, {
          $set: {
            weeklyDate: day,
          },
        });
      }
    } else {
      await new db.notification({
        title: 'About Profile',
        description: `Your profile is not 100% complete please complete it`,
        user: user._id,
        createdOn: new Date(),
        updateOn: new Date(),
      }).save();
      await db.user.findByIdAndUpdate(query.id, {
        $set: {
          weeklyDate: day,
        },
      });
    }
  }
  log.end();
  let data = {
    profileProgress: progress,
  };
  return data;
};
const verifyAnswer = async (id, model, context) => {
  const log = context.logger.start(`service/users/verifyAnswer: ${model}`);
  const user = await db.user.findById(id);

  if (user.answer == model.answer) {
    return 'Answer Verify Successfully';
  } else {
    log.end();
    throw new Error('Answer Not Match');
  }
};

const search = async (query, context) => {
  const log = context.logger.start(`services:users:search`);
  if (!query.name) {
    throw new Error('name is required');
  }

  let users;
  if (query.role == 'parent' || query.role == 'provider') {
    users = await db.user
      .find({
        firstName: { $regex: '.*' + query.name + '.*', $options: 'i' },
        role: query.role,
      })
      .limit(5);
  }
  if (query.role == 'all') {
    users = await db.user
      .find({ firstName: { $regex: '.*' + query.name + '.*', $options: 'i' } })
      .limit(5);
  }

  if (users.length < 1) {
    throw new Error('user not found');
  }
  log.end();
  return users;
};

const buildFBUser = async (model, context) => {
  const { facebookId, firstName, lastName, email, role } = model;
  const log = context.logger.start(`services:users:build${model}`);

  if (!email) {
    throw new Error('email is required');
  }
  let userModel = {
    email: email.toLowerCase(),
    facebookId: facebookId,
    firstName: firstName,
    lastName: lastName,
    role: role,
    createdOn: new Date(),
    updatedOn: new Date(),
  };
  const user = await new db.user(userModel).save();
  if (role == 'provider') {
    await new db.provider({
      user: user._id,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save();
  }
  log.end();
  return user;
};

const facebookLogin = async (model, context) => {
  const log = context.logger.start('services:users:facebookLogin');

  let user = await db.user.findOne({ facebookId: model.facebookId });
  if (!user) {
    const createdFBUser = await buildFBUser(model, context);
    const token = auth.getToken(createdFBUser, false, context);
    createdFBUser.token = token;
    let templatePath = '../emailTemplates/newWelcome.html';
    let subject = 'welcome to join wonderfly';
    if (createdFBUser) {
      sendEmail(model.firstName, model.email, templatePath, subject);
    }
    log.end();
    return createdFBUser;
  }
  const token = auth.getToken(user, false, context);
  user.token = token;
  user.updatedOn = new Date();
  user.save();
  log.end();
  return user;
};

const loginWithGoogle = async (model, context) => {
  const log = context.logger.start('services:users:loginWithGoogle');
  const { googleId, firstName, lastName, email, role } = model;

  if (!email) {
    throw new Error('email is required');
  }

  let user = await db.user.findOne({ googleId: googleId });
  if (!user) {
    let userModel = {
      email: email.toLowerCase(),
      googleId: googleId,
      firstName: firstName,
      lastName: lastName,
      role: role,
      createdOn: new Date(),
      updatedOn: new Date(),
    };
    const user = await new db.user(userModel).save();
    if (role == 'provider') {
      await new db.provider({
        user: user._id,
        createdOn: new Date(),
        updateOn: new Date(),
      }).save();
    }
    let templatePath = '../emailTemplates/newWelcome.html';
    let subject = 'welcome to join wonderfly';
    if (user) {
      sendEmail(firstName, email.toLowerCase(), templatePath, subject);
    }
    const token = auth.getToken(user, false, context);
    user.token = token;
    log.end();
    return user;
  }
  const token = auth.getToken(user, false, context);
  user.token = token;
  user.updatedOn = new Date();
  user.save();
  log.end();
  return user;
};

const contactUs = async (model, context) => {
  const log = context.logger.start('services:users:facebookLogin');
  // Send e-mail using AWS SES
  var sesTransporter = nodemailer.createTransport(
    sesTransport({
      accessKeyId: aws_accessKey,
      secretAccessKey: aws_secretKey,
      region: aws_region,
    })
  );

  let mailOptions = {
    from: 'accounts@wondrfly.com',
    to: 'accounts@wondrfly.com', //sending to: E-mail
    subject: 'contact us',
    text: 'This mail for contact to wondrfly by user',
  };
  let mailSent = await sesTransporter.sendMail(mailOptions);
  if (mailSent) {
    console.log('Message sent: %s', mailSent.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(mailSent));
    return 'Mail sent sucessfully';
  } else {
    log.end();
    throw new Error('Unable to send email try after sometime');
  }
};

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
exports.search = search;
exports.facebookLogin = facebookLogin;
exports.loginWithGoogle = loginWithGoogle;
exports.contactUs = contactUs;
