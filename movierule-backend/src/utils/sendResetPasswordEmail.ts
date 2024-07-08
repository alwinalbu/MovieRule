// import nodemailer from "nodemailer";
// import { EMAIL, PASSWORD } from "@/application/config/config";

// export const sendResetPasswordEmail = async (
//   email: string,
//   resetToken: string,
//   role:string,
// ) => {
//   const transporter = nodemailer.createTransport({
//     port: 465,
//     service: "Gmail",
//     auth: {
//       user: EMAIL,
//       pass: PASSWORD,
//     },
//     secure: true,
//   });

//   const resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
//   const message = "Click the link below to reset your password:";
//   const mailData = {
//     from: "movieruleentertainment@gmail.com",
//     to: email,
//     subject: "Password Reset from MovieRule",
//     html: `<p>${message}</p> <a href="${resetLink}" style="color: tomato; font-size: 18px;">Reset Password</a><p>This link <b>expires in 15 minutes</b>.</p>`,
//   };

//   try {
//     await transporter.sendMail(mailData);
//     console.log("Password reset email sent successfully");
//     return true;
//   } catch (error) {
//     console.error(
//       "Error occurred while sending the password reset email",
//       error
//     );
//     return false;
//   }
// };

import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "@/application/config/config";

export const sendResetPasswordEmail = async (
  email: string,
  resetToken: string,
  userType: string 
) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    service: "Gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    secure: true,
  });

  let resetLink;
  if (userType === "user") {
    resetLink = `http://localhost:5173/reset-password?token=${resetToken}`;
  } else if (userType === "theatre") {
    resetLink = `http://localhost:5173/theater/theater-reset-password?token=${resetToken}`;
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

