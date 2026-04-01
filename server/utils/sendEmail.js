const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Check if credentials exist so it doesn't crash local dev
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn(`⚠️ [MOCK EMAIL] To: ${options.email} | Subject: ${options.subject}`);
    console.warn(`Please set EMAIL_USER and EMAIL_PASS in .env to send real emails.`);
    return true;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Nithyam Divyam Spices" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
  } catch (err) {
    console.error(`Error sending email: ${err.message}`);
    // We don't throw error to avoid crashing user checkouts
  }
};

module.exports = sendEmail;
