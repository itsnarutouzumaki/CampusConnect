const nodemailer = require("nodemailer");
const HTML = require("./message.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailSender = async (email, subject, link) => {
  if (!email) {
    console.error("❌ No recipient email provided!");
    return;
  }

  console.log("📧 Sending email to:", email);

  if (subject === "Password Reset") {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `${HTML.resetPasswordHTML(link)}`,
    });
  } else if (subject === "Verify Account") {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Account",
      html: `${HTML.verifyAccountHTML(link)}`,
    });
  }
};

module.exports = mailSender;
