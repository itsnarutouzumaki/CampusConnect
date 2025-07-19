import * as HTML from "./message.html.js";
import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailSender = async (email, subject,link) => {
  console.log(email);
  if (subject === "Password Reset") {
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      html: `${HTML.resetPasswordHTML(link)}`,
    });
  } else if (subject === "Verify Account") {
    await transporter.sendMail({
      to: email,
      subject: "Verify Account",
      html: `${HTML.verifyAccountHTML(link)}`,
    });
  }
};


export default mailSender;