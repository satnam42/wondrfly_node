"use strict";

const jwt = require("jsonwebtoken");
const authConfig = require("config").get("auth");

const getToken = (user, isExpired, context) => {
  const log = context.logger.start(`permit:auth:getToken:${user}`);

  const extractFrom = {
    id: user.id,
    password: user.password
  };

  const options = {};

  if (isExpired) {
    options.expiresIn = "11h";
  }

  const token = jwt.sign(extractFrom, authConfig.jwtKey, options);
  log.end();
  return token;
};

const getOtpToken = (id, isExpired, context) => {
  const log = context.logger.start(`permit:auth:getToken:${id}`);

  const extractFrom = {
    id: id
  };

  const options = {};

  if (isExpired) {
    options.expiresIn = '4m';
  }

  const token = jwt.sign(extractFrom, authConfig.jwtKey, options);
  log.end();
  return token;
};


const extractToken = (token, context) => {
  const log = context.logger.start(`permit:auth:requiresToken:${token}`);

  try {
    const decoded = jwt.verify(token, authConfig.jwtKey);
    log.end();
    return decoded;
  } catch (err) {
    log.end();
    return err;
  }
};

exports.getToken = getToken;
exports.extractToken = extractToken;
exports.getOtpToken = getOtpToken;
