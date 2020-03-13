const encrypt = require("../permit/crypto.js");
const auth = require("../permit/auth");
const path = require("path");
const imageUrl = require('config').get('image').url
const ObjectId = require("mongodb").ObjectID;

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
<<<<<<< HEAD
  // if (model.country !== "string" && model.country !== undefined) {
  //   user.country = model.country;
  // }
  // if (model.address !== "string" && model.address !== undefined) {
  //   user.address = model.address;
  // }
  // if (model.dob !== "string" && model.dob !== undefined) {
  //   user.dob = model.dob;
  // }
=======
  if (model.customerGroup !== "string" && model.customerGroup !== undefined) {
    user.customerGroup = model.customerGroup;
  }
>>>>>>> 5946a1286946c55388262af0385d54fabbc5928a
  if (model.role !== "string" && model.role !== undefined) {
    user.role = model.role;
  }
  // if (model.anniversary !== "string" && model.anniversary !== undefined) {
  //   user.anniversary = model.anniversary;
  // }
  // if (model.profiePic !== "string" && model.profiePic !== undefined) {
  //   user.profiePic = model.profiePic;
  // }
  log.end();
  user.save();
  return user;
};

const setAddress = (model, address, context) => {
  const log = context.logger.start("services:users:set");
  if (model.name !== "string" && model.name !== undefined) {
    address.name = model.name;
  }
  if (model.address !== "string" && model.address !== undefined) {
    address.address = model.address;
  }
  if (model.city !== "string" && model.city !== undefined) {
    address.city = model.city;
  }
  if (model.state !== "string" && model.state !== undefined) {
    address.state = model.state;
  }
  if (model.zipCode !== "string" && model.zipCode !== undefined) {
    address.zipCode = model.zipCode;
  }
  if (model.specialInstruction !== "string" && model.specialInstruction !== undefined) {
    address.specialInstruction = model.specialInstruction;
  }
  if (model.contactName !== "string" && model.contactName !== undefined) {
    address.contactName = model.contactName;
  }
  if (model.contactNumber !== "string" && model.contactNumber !== undefined) {
    address.contactNumber = model.contactNumber;
  }
  address.updateOn = new Date()
  log.end();
  address.save();
  return address;
};

const buildUser = async (model, context) => {
  const { firstName, lastName, phoneNumber, email, password } = model;
  const log = context.logger.start(`services:users:build${model}`);
  const user = await new db.user({
    firstName: firstName,
    lastName: lastName,
<<<<<<< HEAD
    phoneNumber: phoneNumber,
=======
    mobileNo: mobileNo,
    customerGroup: customerGroup,
>>>>>>> 5946a1286946c55388262af0385d54fabbc5928a
    email: email,
    password: password,
    createdOn: new Date(),
    updateOn: new Date()
  }).save();
  log.end();
  return user;
};

const buildAddress = async (model, context) => {
  const { name, address, city, state, zipCode, specialInstruction, contactName, contactNumber, status, userId } = model;
  const log = context.logger.start(`services:users:build${model}`);
  const userAddress = await new db.address({
    name: name,
    address: address,
    city: city,
    state: state,
    zipCode: zipCode,
    specialInstruction: specialInstruction,
    contactName: contactName,
    contactNumber: contactNumber,
    userId: userId,
    createdOn: new Date(),
    updateOn: new Date(),
  }).save();
  log.end();
  return userAddress;
};

const create = async (model, context) => {
  const log = context.logger.start("services:users:create");
  const isEmail = await db.user.findOne({ email: { $eq: model.email } });
  if (isEmail) {
    return "Email already resgister";
  }
  model.password = encrypt.getHash(model.password, context);
  const user = buildUser(model, context);
  log.end();
  return user;
};


const addAddress = async (model, context) => {

  const log = context.logger.start("services:users:addAddress");
  const address = buildAddress(model, context);
  log.end();
  return address;

};

const getAddressById = async (id, context) => {
  const log = context.logger.start(`services:users:getAddressById:${id}`);
  const address = await db.address.find({ userId: id });
  log.end();
  return address;
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

const resetPassword = async (model, context) => {
  const log = context.logger.start(`service/users/resetPassword: ${model}`);
  const user = context.user;
  const isMatched = encrypt.compareHash(
    model.oldPassword,
    user.password,
    context
  );
  if (isMatched) {
    const newPassword = encrypt.getHash(model.newPassword, context);
    user.password = newPassword;
    user.updatedOn = new Date();
    await user.save();
    log.end();
    return "Password Updated Successfully";
  } else {
    log.end();
    throw new Error("Old Password Not Match");
  }
};
const adddressUpdate = async (id, model, context) => {
  const log = context.logger.start(`services:users:update`);

  let entity = await db.address.findById(id);
  if (!entity) {
    throw new Error("invalid  address id");
  }

  const user = await setAddress(model, entity, context);

  log.end();
  return user
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

  const token = auth.getToken(user.id, false, context);

  user.lastLoggedIn = Date.now();
  user.token = token;
  user.save();
  log.end();
  return user;

};

const logout = async (model, context) => {
  const log = context.logger.start("services:users:logout");
  await context.user.save();
  log.end();
  return "logout successfully";
};

const uploadProfilePic = async (req, context) => {

  const id = context.user.id
  const log = context.logger.start(`services:users:update`);
  let entity = await db.user.findById(id);
  let = model = entity
  model.profilePic = req.file.filename
  if (!req.file) {
    throw new Error("image not found");
  }
  if (!entity) {
    throw new Error("invalid user");
  }
  const user = await setUser(model, entity, context);

  const picUrl = imageUrl + 'assets/images/' + model.profilePic
  user.profilePic = picUrl
  return user
  log.end();

};

exports.create = create;
exports.get = get;
exports.login = login;
exports.resetPassword = resetPassword;
exports.update = update;
exports.getById = getById;
exports.logout = logout;
exports.uploadProfilePic = uploadProfilePic;
exports.addAddress = addAddress;
exports.getAddressById = getAddressById;
exports.addressUpdate = adddressUpdate