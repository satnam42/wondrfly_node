require('dotenv').config();

const mailchimpTx = require('@mailchimp/mailchimp_transactional')(
  process.env.MAILCHIMP_API_KEY
);
// console.log(process.env.MAILCHIMP_API_KEY);

const static = async (templateName, emails, subject) => {
  const message = {
    from_name: 'Wondrfly',
    from_email: 'hello@wondrfly.com',
    subject: subject,
    to: emails,
  };
  console.log('static mailchimp');
  const response = await mailchimpTx.messages.sendTemplate({
    template_name: templateName,
    template_content: [{}],
    message: message,
  });
  console.log(response);
  return response;
};

const dynamic = async (templateName, emails, subject, options) => {
  const message = {
    from_name: 'Wondrfly',
    from_email: 'hello@wondrfly.com',
    subject: subject,
    global_merge_vars: options,
    to: emails,
  };

  const response = await mailchimpTx.messages.sendTemplate({
    template_name: templateName,
    template_content: options,
    message: message,
  });

  return response;
};

exports.static = static;
exports.dynamic = dynamic;
