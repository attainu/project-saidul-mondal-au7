const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY)

module.exports = async (to, content) => {
  const config = {
    to: to,
    from: 'attainuchatapp@gmail.com',
    subject: 'TutorUP Email Confirmation',
    html: content
  }

  try {
    await sgMail.send(config);
  }
  catch (err) {
    console.error(err);
  }
  
  }