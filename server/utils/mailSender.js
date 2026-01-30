const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,       // smtp.gmail.com
  port: 465,                          // SSL port
  secure: true,                       // true for 465, false for 587
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,      // Gmail App Password
  },
});

    let info = await transporter.sendMail({
      from: "StudyNotion || CodeHelp - by Babbar",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log(info);
    return info;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = mailSender;
