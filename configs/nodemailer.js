import nodemailer from "nodemailer";

export const sendMail = async (email,name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,      // Gmail
        pass: process.env.EMAIL_PASS,        // App Password
      },
    });

const info = await transporter.sendMail({
  from: '"Car Rental Team" <sc763894@gmail.com>',
  to: email,
  subject: "Welcome to DriveEasy Car Rentals 🚗",
  text: `Hello ${name},

Welcome to DriveEasy Car Rentals!

We’re excited to have you with us. Your account has been successfully created, and you can now book cars easily, safely, and at affordable prices.

If you have any questions or need assistance, feel free to contact our support team.

Happy Driving!
DriveEasy Car Rentals Team
`

});


    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Email error:", error);
  }
};
