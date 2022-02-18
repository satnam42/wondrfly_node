"use strict";
const auth = require("./auth");
const response = require("../exchange/response");

const betaProgram = async (req, res, next) => {
  const log = req.context.logger.start(`permit:auth:betaProgram`);
  const token = req.headers["x-access-token"];
  if (!token) {
    return response.failure(res, "token is required");
  }
  const decodedUser = auth.extractToken(token, req.context);
  const user = await db.user.findById(decodedUser.id);
  console.log('user.role ===>>>>', user.role);
  if (!(user.role == 'admin' || user.role == 'superAdmin' || user.role == 'operationadmin')) {
        return response.failure(res, "you are not authorized to perform this operation");
  }
  log.end();
  return next();
};

exports.betaProgram = betaProgram;
