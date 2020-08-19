"use strict";

const bcrypt = require("bcrypt");

const getHash = async (password, context) => {
  const log = context.logger.start("permit:crypto:getHash");
  const hash = await bcrypt.hashSync(password, 10);
  log.end();
  return hash;
};

const compareHash = (password, hash, context) => {
  const log = context.logger.start("permit:crypto:compareHash");
  if (bcrypt.compareSync(password, hash)) {
    log.end();
    return true;
  }
  log.end();
  return false;
};

exports.getHash = getHash;
exports.compareHash = compareHash;
