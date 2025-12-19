import nodemailer from "nodemailer";

export const sendMail = async (email, name, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Gmail
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

      
    const info = await transporter.sendMail({
      from: '"DriveEasy Car Rentals" <sc763894@gmail.com>',
      to: email,
      subject: subject, // dynamic subject
      text: text,       // dynamic text
    });

    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Email error:", error);
  }
};
