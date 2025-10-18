import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../../application/config/config";

export const sendAcceptanceEmail = async (email: string, username: string) => {
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
        rejectUnauthorized: false, // ✅ use only in dev
      },
    });

    const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:5173";

    const message = `🎉 Congratulations! Your theater <b>${username}</b> has been accepted. You can now login and start using our platform.`;

    const mailData = {
      from: EMAIL,
      to: email,
      subject: "Theater Accepted - MovieRule",
      html: `
        <p>${message}</p>
        <a href="${FRONTEND_URL}/theater/login" 
           style="display:inline-block; margin-top:10px; padding:10px 20px; background:tomato; color:white; text-decoration:none; border-radius:5px;">
           Login Here
        </a>
      `,
    };

    await transporter.sendMail(mailData);
    console.log("✅ Acceptance email sent successfully");
    return true;
  } catch (error: any) {
    console.error("❌ Error sending acceptance email:", error.message);
    return false;
  }
};
