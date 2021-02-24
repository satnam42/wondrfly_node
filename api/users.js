"use strict";
const service = require("../services/users");
const response = require("../exchange/response");
const userMapper = require("../mappers/user");


const create = async (req, res) => {
  const log = req.context.logger.start(`api:users:create`);
  try {
    const user = await service.register(req.body, req.context);
    const message = "User Regsiter Successfully";
    log.end();
    return response.success(res, message, userMapper.toModel(user));
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};


const getById = async (req, res) => {
  const log = req.context.logger.start(`api:users:getById:${req.params.id}`);
  try {
    const user = await service.getById(req.params.id, req.context);
    log.end();
    return response.data(res, userMapper.toModel(user));
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};


const list = async (req, res) => {
  const log = req.context.logger.start(`api:users:get`);
  try {
    const users = await service.get(req.query, req.context);
    let message = users.count ? users.count : 0 + " " + "user Got";
    log.end();
    return response.page(
      message,
      res,
      userMapper.toSearchModel(users),
      Number(req.query.pageNo) || 1,
      Number(req.query.pageSize) || 10,
      users.count
    );
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};


const login = async (req, res) => {
  const log = req.context.logger.start("api:users:login");
  try {
    const user = await service.login(req.body, req.context);
    log.end();
    return response.authorized(res, userMapper.toModel(user), user.token);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

// const sendOtp = async (req, res) => {
//   const log = req.context.logger.start("api:users:otp");
//   try {
//     const data = await service.sendOtp(req.query.email, req.context);
//     log.end();
//     return response.success(res, data);
//   } catch (err) {
//     log.error(err);
//     log.end();
//     return response.failure(res, err.message);
//   }
// };


const update = async (req, res) => {
  const log = req.context.logger.start(`api:users:update:${req.params.id}`);
  try {
    const user = await service.update(req.params.id, req.body, req.context);
    log.end();
    return response.data(res, userMapper.toModel(user));
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const resetPassword = async (req, res) => {
  const log = req.context.logger.start("api:users:resetPassword");
  try {
    const message = await service.resetPassword(req.params.id, req.body, req.context);
    log.end();
    return response.success(res, message);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const logout = async (req, res) => {
  const log = req.context.logger.start("api:users:logout");
  try {
    const message = await service.logout(req.body, req.context);
    log.end();
    return response.success(res, message);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const uploadProfilePic = async (req, res) => {
  const log = req.context.logger.start(`api:users:uploadProfilePic`);
  try {
    const user = await service.uploadProfilePic(req.params.id, req.file, req.context);
    const message = "Profile Picture Successfully";
    log.end();
    return response.success(res, message, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }

};

const getCount = async (req, res) => {
  const log = req.context.logger.start(`api:users:count`);
  try {
    const count = await service.getCount(req.context);
    log.end();
    return response.data(res, count);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const getRecentAdded = async (req, res) => {
  const log = req.context.logger.start(`api:users:getRecentAdded`);
  try {
    const count = await service.getRecentAdded(req.context);
    log.end();
    return response.data(res, count);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const recentAddedByRole = async (req, res) => {
  const log = req.context.logger.start(`api:users:recentAddedByRole`);
  try {
    const count = await service.recentAddedByRole(req.context, req.query);
    log.end();
    return response.data(res, count);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const deleteUser = async (req, res) => {
  const log = req.context.logger.start(`api:users:deleteUser`);
  try {
    const user = await service.deleteUser(req.query.id, req.context);
    log.end();
    return response.data(res, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const activeOrDeactive = async (req, res) => {
  const log = req.context.logger.start(`api:users:activeOrDeactive`);
  try {
    const count = await service.activateAndDeactive(req.context, req.query.id, req.query.isActivated);
    log.end();
    return response.data(res, count);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const sendOtp = async (req, res) => {
  const log = req.context.logger.start("api:users:sendOtp");
  try {
    const data = await service.sendOtp(req.query.email, req.context);
    log.end();
    return response.success(res, data);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const otpVerify = async (req, res) => {
  const log = req.context.logger.start("api:users:otpVerify");
  try {
    const data = await service.otpVerify(req.body, req.context);
    log.end();
    return response.success(res, data);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const forgotPassword = async (req, res) => {
  const log = req.context.logger.start("api:users:forgotPassword");
  try {
    const data = await service.forgotPassword(req.body, req.context);
    log.end();
    return response.success(res, data);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const tellAFriend = async (req, res) => {
  const log = req.context.logger.start(`api:users:tellAFriend`);
  try {
    const user = await service.tellAFriend(req.body, req.context);
    const message = "Message sent Successfully";
    log.end();
    return response.success(res, message);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const feedback = async (req, res) => {
  const log = req.context.logger.start(`api:users:feedback`);
  try {
    const user = await service.feedback(req.body, req.context);
    log.end();
    return response.success(res, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const getProfileProgress = async (req, res) => {
  const log = req.context.logger.start(`api:users:getProfieProgress`);
  try {
    const progress = await service.getProfileProgress(req.query, req.context);
    log.end();
    return response.data(res, progress);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};
const verifySecuirtyAns = async (req, res) => {
  const log = req.context.logger.start("api:users:verifySecuirtyAns");
  try {
    const message = await service.verifyAnswer(req.params.id, req.body, req.context);
    log.end();
    return response.success(res, message);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const search = async (req, res) => {
  const log = req.context.logger.start(`api:users:search:${req.query.name}`);
  try {
    const users = await service.search(req.query, req.context);
    log.end();
    return response.data(res, users);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

exports.create = create;
exports.list = list;
exports.login = login;
exports.update = update;
exports.resetPassword = resetPassword;
exports.getById = getById;
exports.logout = logout;
exports.uploadProfilePic = uploadProfilePic;
exports.getCount = getCount;
exports.getRecentAdded = getRecentAdded;
exports.recentAddedByRole = recentAddedByRole;
exports.deleteUser = deleteUser;
exports.activeOrDeactive = activeOrDeactive;
exports.sendOtp = sendOtp;
exports.otpVerify = otpVerify;
exports.forgotPassword = forgotPassword;
exports.tellAFriend = tellAFriend;
exports.feedback = feedback;
exports.getProfileProgress = getProfileProgress;
exports.verifySecuirtyAns = verifySecuirtyAns;
exports.search = search;