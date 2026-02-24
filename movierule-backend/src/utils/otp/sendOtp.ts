import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../../application/config/config";

export const sendOtp = async (email: string, otp: number | string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD, 
      },
      tls: {
        rejectUnauthorized: false, // allow self-signed certs (use only in dev)
      },
    });

    const message = "Enter This OTP to Continue";
    const mailData = {
      from: EMAIL,
      to: email,
      subject: "OTP From MovieRule",
      html: `<p>${message}</p> 
             <p style="color: tomato; font-size: 25px; letter-spacing: 2px;">
               <b>${otp}</b>
             </p>
             <p>This Code <b>expires in 1 minute</b>.</p>`,
    };

    // ✅ Use promise/await instead of callback
    const info = await transporter.sendMail(mailData);

    console.log("✅ Email sent successfully:", info.response);
    return true;
  } catch (error: any) {
    console.error("❌ Error sending email:", error.message);
    return false;
  }
};
