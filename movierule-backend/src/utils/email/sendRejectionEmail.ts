import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../../application/config/config";

export const sendRejectionEmail = async (
  email: string,
  username: string,
  comments: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASSWORD, 
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });

  const message = `We regret to inform you that your theater "${username}" has been rejected for the following reason: ${comments}`;
  const mailData = {
    from: "movieruleentertainment@gmail.com",
    to: email,
    subject: "Theater Rejected - MovieRule",
    html: `<p>${message}</p>`,
  };

  try {
    await transporter.sendMail(mailData);
    console.log("Rejection email sent successfully");
    return true;
  } catch (error) {
    console.error("Error occurred while sending the rejection email", error);
    return false;
  }
};