require('dotenv').config();
const md5 = require('md5');
const mailchimpTx = require('@mailchimp/mailchimp_transactional')(
  process.env.MAILCHIMP_API_KEY
);
let mailchimpMarket = require('@mailchimp/mailchimp_marketing');
mailchimpMarket.setConfig({
  apiKey: process.env.MAILCHIMP_MARKET_KEY,
  server: process.env.MAILCHIMP_SERVER,
});

/**
 *
 * @param {*} templateName
 * @param {*} emails
 * @param {*} subject
 * @param {*} senderEmail
 * @returns
 */
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
/**
 *
 * @param {*} templateName
 * @param {*} emails
 * @param {*} subject
 * @param {*} options
 * @param {*} senderEmail
 * @returns
 */
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

/**
 * @param { Data-model }
 * @returns
 * */
const add_beta_user = async (model) => {
  const response = await mailchimpMarket.lists.addListMember(
    process.env.BETA_USER_LIST_ID,
    {
      email_address: model.email,
      status: model.subscribes || 'subscribed',
      email_type: 'html',
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

/**
 * @param {email , Data-model}
 * @returns
 * */
const update_beta_user = async (updateEmail, child, model) => {
  const md5Hash = md5(updateEmail.toLowerCase());
  const firstName = model.firstName.trim().split(' ')[0];
  const response = await mailchimpMarket.lists.updateListMember(
    process.env.BETA_USER_LIST_ID,
    md5Hash,
    {
      email_address: updateEmail,
      merge_fields: {
        FNAME: firstName || '',
        LNAME: model.lastName || ' ',
        PHONE: model.phoneNumber || 0,
        CHILDREN: child,
      },
      location: {
        latitude: 30.7428645,
        longitude: 76.6759107,
      },
    }
  );
  return response;
};
const updatechild = async function (child, email) {
  const md5Hash = md5(email.toLowerCase());
  const response = await mailchimpMarket.lists.updateListMember(
    process.env.BETA_USER_LIST_ID,
    md5Hash,
    {
      email_address: updateEmail,
      merge_fields: {
        CHILDREN: child,
      },
    }
  );
  return response;
};
exports.static = static;
exports.dynamic = dynamic;
exports.add_beta_user = add_beta_user;
exports.update_beta_user = update_beta_user;
exports.updatechild = updatechild;
