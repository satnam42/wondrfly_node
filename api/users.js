"use strict";
const service = require("../services/users");
const response = require("../exchange/response");
const userMapper = require("../mappers/user");
const addressMapper = require("../mappers/address");

const create = async (req, res) => {
  const log = req.context.logger.start(`api:users:create`);
  try {
    const user = await service.create(req.body, req.context);
    const message = "User Resgiter Successfully";
    log.end();
    return response.success(res, message, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const addAddress = async (req, res) => {
  const log = req.context.logger.start(`api:users:addAddress`);
  try {
    const address = await service.addAddress(req.body, req.context);
    const message = "Address Added Successfully";
    log.end();
    return response.success(res, message, address);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const addressList = async (req, res) => {
  const log = req.context.logger.start(`api:users:getById:${req.params.id}`);
  try {
    const address = await service.getAddressById(req.params.id, req.context);
    log.end();
    return response.data(res, addressMapper.toSearchModel(address));
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

const addressUpdate = async (req, res) => {
  const log = req.context.logger.start(`api:users:addressUpdate:${req.params.id}`);
  try {
    const address = await service.addressUpdate(req.params.id, req.body, req.context);
    log.end();
    return response.data(res, addressMapper.toModel(address));
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

const otp = async (req, res) => {
  const log = req.context.logger.start("api:users:otp");
  try {
    const msg = await service.otp(req.query.mobileNo, req.context);

    log.end();
    return response.success(res, msg);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};

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
    const message = await service.resetPassword(req.body, req.context);
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

  const log = req.context.logger.start(`api:users:create`);
  try {
    const user = await service.uploadProfilePic(req, req.context);
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
  const log = req.context.logger.start(`api:users:recentAddedByRole`);
  try {
    const user = await service.deleteUser(req.context, req.query.id);
    log.end();
    return response.data(res, user);
  } catch (err) {
    log.error(err);
    log.end();
    return response.failure(res, err.message);
  }
};
const activeOrDeactive = async (req, res) => {
  const log = req.context.logger.start(`api:users:recentAddedByRole`);
  try {
    const count = await service.setUserStatus(req.context, req.query.id, req.query.status);
    log.end();
    return response.data(res, count);
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
exports.addAddress = addAddress;
exports.addressList = addressList;
exports.addressUpdate = addressUpdate;
exports.getCount = getCount;
exports.getRecentAdded = getRecentAdded;
exports.recentAddedByRole = recentAddedByRole
exports.deleteUser = deleteUser
exports.activeOrDeactive = activeOrDeactive
exports.otp = otp

