const nodeMailer = require("nodemailer");
const {OAuth2Client} = require('google-auth-library');





const sendEmail = async (options) => {
  const myOAuth2Client = new OAuth2Client(
    process.env.GOOGLE_MAILER_CLIENT_ID,
    process.env.GOOGLE_MAILER_CLIENT_SECRET
  )
  // Set Refresh Token vào OAuth2Client Credentials
  myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
  });
  
    const myAccessTokenObject = await myOAuth2Client.getAccessToken()
    const myAccessToken = myAccessTokenObject?.token;
    const transporter = nodeMailer.createTransport({
        //host: process.env.SMPT_HOST,
        // port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
          type: 'OAuth2',
          user: process.env.ADMIN_EMAIL_ADDRESS,
          clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
          clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken
        },
      });
    const mailOptions = {
        to: options.email,
        subject: options.subject,
        text: options.message,
      };
    
    await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;