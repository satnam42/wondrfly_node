require('dotenv').config();
const mailchimpTx = require('@mailchimp/mailchimp_transactional')(
  process.env.MAILCHIMP_API_KEY
);
let mailchimpMarket = require('@mailchimp/mailchimp_marketing');
mailchimpMarket.setConfig({
  apiKey: process.env.MAILCHIMP_MARKET_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

// console.log(process.env.MAILCHIMP_API_KEY);

const static = async (templateName, emails, subject, senderEmail) => {
  const message = {
    from_name: 'Wondrfly',
    from_email: senderEmail == undefined ? 'hello@wondrfly.com' : senderEmail,
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

const dynamic = async (templateName, emails, subject, options, senderEmail) => {
  const message = {
    from_name: 'Wondrfly',
    from_email: senderEmail == undefined ? 'hello@wondrfly.com' : senderEmail,
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

/////////
////////////////////////////////
const add_beta_user = async (model) => {
  const response = await mailchimpMarket.lists.addListMember(
    process.env.BETA_USER_LIST_ID,
    {
      email_address: model.email,
      status: model.subscribes || 'subscribed',
      email_type: 'html',
      message: model.occupation || 'Nothing',
      tags: model.tags,
      merge_fields: {
        FNAME: model.firstName || '',
        LNAME: model.lastName || ' ',
        PHONE: model.phoneNumber || '',
        OCCUPATION: model.occupation || 'Nothing',
      },
    }
  );
  return response;
};

exports.static = static;
exports.dynamic = dynamic;
exports.add_beta_user = add_beta_user;
