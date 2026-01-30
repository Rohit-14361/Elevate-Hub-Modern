const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try{
          let transporter=nodemailer.createTransport({
              host:process.env.MAIL_HOST,
              port: 587,
              secure: false, // true for 465, false for other ports
              auth:{
                  user:process.env.MAIL_USER,
                  pass:process.env.MAIL_PASS
              }
          });
  
          let info=await transporter.sendMail({
              from: `"Elevate Hub Modern" <${process.env.MAIL_USER}>`,
              to:`${email}`,
              subject:`${title}`,
              html:`${body}`
          })
          console.log(info);
          return info;
        } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = mailSender;
