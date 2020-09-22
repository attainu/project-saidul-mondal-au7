import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_KEY)

module.exports = async (to, content) => {
  const config = {
    to: to,
    from: 'mondalsaidul3232@gmail.com',
    subject: 'Bidiyalay Email Confirmation',
    html: content
  }

  try {
    await sgMail.send(config);
  }
  catch (err) {
    console.error(err);
  }
  
  }