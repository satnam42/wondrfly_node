'use strict';
const encrypt = require('../permit/crypto.js');
var nodemailer = require('nodemailer');
let path = require('path');
const fs = require('fs');
const moment = require('moment');
const mailchimp = require('./mailchimp');
const Audience = mailchimp.audience;
const invitaionEmail = async (firstName, email, templatePath, subject, OTP) => {
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
        filename: 'cntr-img.png',
        path: `${__dirname}/../public/images/cntr-img.png`,
        cid: 'cntr-img', //same cid value as in the html img src
      },
      {
        filename: 'logo_wondr.png',
        path: `${__dirname}/../public/images/logo_wondr.png`,
        cid: 'logo_wondr', //same cid value as in the html img src
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

const buildUser = async (model, context) => {
  const log = context.logger.start(`services:invitation:buildUser${model}`);
  const user = await new db.user({
    firstName: model.firstName,
    type: model.type || '',
    email: model.email,
    role: 'parent',
    isActivated: false,
    password: model.password,
    betaUser: true,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();
  log.end();
  return user;
};

const create = async (model, context) => {
  const log = context.logger.start('services:invitation:register');
  const isEmail = await db.user.findOne({ email: { $eq: model.email } });
  if (isEmail) {
    throw new Error('This Email is already registered');
  }
  model.password = await encrypt.getHash(model.password, context);
  const user = await buildUser(model, context);
  const invitedUser = await db.invitation.findOne({
    invitedToEmail: { $eq: model.email },
  });
  if (user && !invitedUser) {
    const invitation = await new db.invitation({
      user: user.id,
      joined: true,
      bookedActivityFor: model.bookedActivityFor,
      lookingkidsActivityIn: model.lookingkidsActivityIn,
      lat: model.lat,
      lng: model.lng,
      bookedActivityInLastMonths: model.bookedActivityInLastMonths,
      wantWondrflyBetaUserBecause: model.wantWondrflyBetaUserBecause,
      occupation: model.occupation,
      willActive: model.willActive,
      createdOn: new Date(),
      updateOn: new Date(),
    }).save();
  }
  if (invitedUser && user) {
    let webStatus = { requestAccepted: true };
    invitedUser.webStatus = webStatus;
    invitedUser.user = user.id;
    invitedUser.joined = true;
    invitedUser.webStatus = webStatus;
    invitedUser.bookedActivityFor = model.bookedActivityFor;
    invitedUser.lookingkidsActivityIn = model.lookingkidsActivityIn;
    invitedUser.lat = model.lat;
    invitedUser.lng = model.lng;
    invitedUser.bookedActivityInLastMonths = model.bookedActivityInLastMonths;
    invitedUser.wantWondrflyBetaUserBecause = model.wantWondrflyBetaUserBecause;
    invitedUser.occupation = model.occupation;
    invitedUser.willActive = model.willActive;
    await invitedUser.save();
  }

  // let templatePath = '../emailTemplates/beta_congrats.html';
  // let subject = 'Congratulations!  wondrlfy';
  const opt = {
    name: 'beta-user-in-waitlist',
    email: [
      {
        email: model.email,
        type: 'to',
      },
    ],
    options: [
      {
        name: 'FNAME',
        content: model.firstName || 'User',
      },
    ],
    subject: 'Your application is on its way!',
  };
  const mailchimpMail = await mailchimp.dynamic(
    opt.name,
    opt.email,
    opt.subject,
    opt.options
  );
  //   congratsEmail(model.firstName, model.email, templatePath, subject);
  //// add mailchimp
  // if (model) {
  //   // const user = await db.user.findById(invitaton.user);
  //   // if (!user) throw new Error('User not found');
  //   let first_name = model.firstName;
  //   let last_name = ''; //= model.lastName;
  //   let name = model.firstName.trim();
  //   if (name.includes(' ')) {
  //     let splited = name.split(' ');
  //     first_name = splited[0];
  //     last_name = splited[splited.length - 1];
  //   }
  //   console.log(first_name);
  //   console.log(last_name);
  //   const data = {
  //     email: model.email,
  //     tags: ['Beta user', 'NewsLetter'],
  //     occupation: model.occupation || 'Nothing',
  //     firstName: first_name,
  //     lastName: last_name,
  //     phoneNumber: model.phoneNumber || 0,
  //   };
  //   const addMember = await mailchimp.add_beta_user(data);
  //   console.log(addMember);
  // }
  log.end();
  return user;
};

const getAllInvitation = async (context) => {
  const log = context.logger.start(`services:invitation:getAllInvitation`);
  let invitations = {};
  const invitation = await db.invitation
    .find({ joined: true })
    .populate('user')
    .populate('invitedBy');
  const count = await db.invitation.count({ joined: true });
  const accepted = await db.invitation
    .find({ joined: true, 'status.accepted': true })
    .count();
  const pending = await db.invitation
    .find({ joined: true, 'status.pending': true })
    .count();
  const declined = await db.invitation
    .find({ joined: true, 'status.declined': true })
    .count();
  const expired = await db.invitation
    .find({ joined: true, 'status.expired': true })
    .count();
  invitations.invitation = invitation;
  invitations.count = count;
  invitations.accepted = accepted;
  invitations.pending = pending;
  invitations.declined = declined;
  invitations.expired = expired;
  log.end();
  return invitations;
};

const approveAll = async (model, context) => {
  const log = context.logger.start('services:invitation:approveAll');
  const invitation = await db.invitation.updateMany({
    $set: {
      'status.accepted': true,
      'status.pending': false,
      'status.expired': false,
      'status.declined': false,
    },
  });
  const user = await db.user.updateMany(
    { betaUser: true },
    {
      $set: {
        isActivated: true,
      },
    }
  );
  const allInvitaions = await db.invitation.find({}).populate('user');
  if (allInvitaions.length > 0) {
    const emails = [];
    // for (let data of allInvitaions) {
    //   if (data.user && data.user.email !== undefined) {
    //     emails.push[{ email: data.user.email, type: 'to' }];
    //   }
    // }
    for (let i = 0; i < allInvitaions.length; i++) {
      let user = allInvitaions[i].user;
      let data = { email: user.email, type: 'to' };
      emails.push(data);
    }
    if (emails.length > 0) {
      console.log(emails);
      const opt = {
        name: 'welcome-beta-users',
        email: emails,
        // options: [
        //   {
        //     name: 'FNAME',
        //     content: user.firstName || 'User',
        //   },
        // ],
        subject: 'Welcome to the World of Wondrfly!',
      };
      const mailchimpMail = await mailchimp.static(
        opt.name,
        opt.email,
        opt.subject
      );
    }
  }
  log.end();
  return invitation;
};

const approveOrDecline = async (model, context) => {
  const log = context.logger.start('services:invitation:approveOrDecline');
  const invitaton = await db.invitation.findOne({ _id: model.id });
  if (model.type == 'approve') {
    let invitation = await db.invitation.findByIdAndUpdate(
      model.id,
      {
        $set: {
          'status.accepted': true,
          'status.pending': false,
          'status.expired': false,
          'status.declined': false,
        },
      },
      { new: true }
    );
    if (invitation) {
      const user = await db.user.findByIdAndUpdate(invitaton.user, {
        $set: {
          isActivated: true,
        },
      });
    }
    // model of add member
    if (invitation) {
      const user = await db.user.findById(invitaton.user);
      const opt = {
        name: 'welcome-beta-users',
        email: [
          {
            email: user.email,
            type: 'to',
          },
        ],
        // options: [
        //   {
        //     name: 'FNAME',
        //     content: user.firstName || 'User',
        //   },
        // ],
        subject: 'Welcome to the World of Wondrfly!',
      };
      const mailchimpMail = await mailchimp.static(
        opt.name,
        opt.email,
        opt.subject
      );
      ///// user add in mailchimp subscribes
      console.log(user.email, '>>>>>>>>>>>>>>>>');
      if (!user) throw new Error('User not found');
      let first_name = user.firstName;
      let last_name = user.lastName;
      let name = user.firstName.trim();
      if (name.includes(' ')) {
        let splited = name.split(' ');
        first_name = splited[0];
        last_name = splited[splited.length - 1];
      }
      console.log(first_name);
      console.log(last_name);
      const data = {
        email: user.email,
        tags: ['Beta user', 'NewsLetter'],
        occupation: invitation.occupation || 'Nothing',
        firstName: first_name,
        lastName: last_name,
      };
      const addMember = await mailchimp.add_beta_user(data);
      console.log(addMember);
    }

    log.end();
    return invitation;
  }
  if (model.type == 'decline') {
    let invitation = await db.invitation.findByIdAndUpdate(
      model.id,
      {
        $set: {
          'status.accepted': false,
          'status.pending': false,
          'status.expired': false,
          'status.declined': true,
        },
      },
      { new: true }
    );
    log.end();
    return invitation;
  }
};

const inviteToJoin = async (model, context) => {
  const log = context.logger.start('services:invitation:inviteToJoin');
  const user = await db.user.findById(model.userId);
  if (!user) {
    throw new Error('This user does not exist');
  }
  if (user.parentInvitationLimit >= 3) {
    throw new Error('only 3 user invitation limit, your limit is reached');
  }

  const isEmail = await db.invitation.findOne({
    invitedToEmail: { $eq: model.email },
  });
  if (isEmail) {
    throw new Error('This Email is already invited');
  }
  const invitation = await new db.invitation({
    invitedBy: model.userId,
    invitedToEmail: model.email,
    invitedToName: model.firstName,
    isInvited: 'invited',
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();

  if (invitation) {
    await db.user.findByIdAndUpdate(model.userId, {
      $set: {
        parentInvitationLimit: (user.parentInvitationLimit += 1),
      },
    });
    let templatePath = '../emailTemplates/beta_welcome.html';
    let subject = 'Invitation to join wondrlfy';

    // invitaionEmail(model.firstName, model.email, templatePath, subject);
  }
  log.end();
  return invitation;
};

const listByParentId = async (id, context) => {
  const log = context.logger.start('services:invitation:listByParentId');
  let invitations = await db.invitation.find({ invitedBy: id });
  const user = await db.user.findById(id);
  if (!user) {
    throw new Error('parent not found');
  }
  invitations.forEach(async (invitation) => {
    let threedays = moment(invitation.createdOn).add(3, 'd').toDate();
    let current = new Date();
    // let time = threedays <= current
    if (threedays <= current) {
      await db.user.findByIdAndUpdate(id, {
        $set: {
          parentInvitationLimit: (user.parentInvitationLimit -= 1),
        },
      });
    }
  });
  log.end();
  return invitations;
};

exports.create = create;
exports.getAllInvitation = getAllInvitation;
exports.approveAll = approveAll;
exports.approveOrDecline = approveOrDecline;
exports.inviteToJoin = inviteToJoin;
exports.listByParentId = listByParentId;
