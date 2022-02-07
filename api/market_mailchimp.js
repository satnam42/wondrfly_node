'use strict';
const service = require('../services/market_mailchimp');
const response = require('../exchange/response');

const addSubscribers = async (req, res) => {
  const log = req.context.logger.start('api.market_mailchimp:addSubscribers');
  try {
    const subscribers = await service.mailchimpSubscribe(req.body, req.context);
    log.end();
    return response.data(res, subscribers);
  } catch (err) {
    log.error();
    return response.failure(res, err.message);
  }
};
exports.addSubscribers = addSubscribers;
