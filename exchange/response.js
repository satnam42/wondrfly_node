"use strict";

const success = (res, message, data) => {
  res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    data: data,
    message: message
  });
};

const failure = (res, message) => {
  res.status(400).json({
    isSuccess: false,
    statusCode: 400,
    error: message
  });
};

const unAuthorized = (res, message) => {
  res.status(401).json({
    isSuccess: false,
    statusCode: 401,
    error: message
  });
};

const data = (res, data) => {
  res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    data: data
  });
};

const page = (message, res, data, pageNo, pageSize, total) => {
  res.status(200).json({
    message: message,
    isSuccess: true,
    statusCode: 200,
    pageNo: pageNo,
    pageSize: pageSize,
    total: total,
    items: data
  });
};

const authorized = (res, data, token) => {
  res
    .status(200)
    .set("x-access-token", token)
    .json({
      isSuccess: true,
      statusCode: 200,
      data: data
    });
};

const chatPage = (res, data, pageNo, pageSize, total) => {
  res.status(200).json({
    isSuccess: true,
    statusCode: 200,
    pageNo: pageNo,
    pageSize: pageSize,
    total: total,
    items: data
  });
};

const invitation = (message, res, data, accepted, pending, declined, expired) => {
  res.status(200).json({
    total: message,
    isSuccess: true,
    statusCode: 200,
    accepted: accepted,
    pending: pending,
    declined: declined,
    expired: expired,
    items: data
  });
};

exports.data = data;
exports.page = page;
exports.success = success;
exports.failure = failure;
exports.authorized = authorized;
exports.unAuthorized = unAuthorized;
exports.chatPage = chatPage;
exports.invitation = invitation;