
import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../application/config/config";
const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:5173";

export const sendResetPasswordEmail = async (
  email: string,
  resetToken: string,
  userType: string 
) => {
 const transporter = nodemailer.createTransport({
       service: "gmail",
       port: 465,
       secure: true,
       auth: {
         user: EMAIL,
         pass: PASSWORD, // must be Gmail App Password
       },
       tls: {
         rejectUnauthorized: false, // ✅ use only in dev
       },
     });

  let resetLink;


  if (userType === "user") {
    resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
  } else if (userType === "theatre") {
    resetLink = `${FRONTEND_URL}/theater/theater-reset-password?token=${resetToken}`;
  } else {
    throw new Error("Invalid userType provided");
  }

  const message = "Click the link below to reset your password:";
  const mailData = {
    from: "movieruleentertainment@gmail.com",
    to: email,
    subject: "Password Reset from MovieRule",
    html: `<p>${message}</p> <a href="${resetLink}" style="color: tomato; font-size: 18px;">Reset Password</a><p>This link <b>expires in 15 minutes</b>.</p>`,
  };

  try {
    await transporter.sendMail(mailData);
    console.log("Password reset email sent successfully");
    return true;
  } catch (error) {
    console.error(
      "Error occurred while sending the password reset email",
      error
    );
    return false;
  }
};

