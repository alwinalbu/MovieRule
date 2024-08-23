import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../../application/config/config";

console.log("111111111");

console.log("email is this ", EMAIL);
console.log("email is this ", PASSWORD);
console.log("2222222222");

export const sendOtp = async (email: string, otp: number | string) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    service: "Gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    secure: true,
  });

  const message = "Enter This OTP to Continue";
  const mailData = {
    from: "movieruleentertainment@gmail.com",
    to: email,
    subject: "OTP From MovieRule",
    html: `<p>${message}</p> <p style="color: tomato; font-size: 25px; letter-spacing: 2px;"><b>${otp}</b></p><p>This Code <b>expires in ${1} minutes(s)</b>.</p>`,
  };
  const result = transporter.sendMail(mailData, (error, info) => {
    return new Promise((resolve, reject) => {
      if (error) {
        console.log("Error occurred while sending the", error);
        reject(false);
      } else {
        resolve(true);
      }
    });
  });
};
