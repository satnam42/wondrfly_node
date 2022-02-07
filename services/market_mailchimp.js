const mailchimp = require('./mailchimp');

const mailchimpSubscribe = async (model, context) => {
  const log = context.logger.start('services:users:mailchimpSubscribe');
  if (typeof model !== 'object') {
    throw new Error('Body should be an object');
  }
  const { email, tags } = model;
  const option = {
    email: email,
    tags: tags,
    subscribes: 'subscribed',
  };
  const response = await mailchimp.add_beta_user(option);
  return response;
};

exports.mailchimpSubscribe = mailchimpSubscribe;
