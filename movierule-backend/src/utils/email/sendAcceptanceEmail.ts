// import nodemailer from "nodemailer";
// import { EMAIL, PASSWORD } from "../../application/config/config";

// export const sendAcceptanceEmail = async (email: string, username: string) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       port: 465,
//       secure: true,
//       auth: {
//         user: EMAIL,
//         pass: PASSWORD, 
//       },
//       tls: {
//         rejectUnauthorized: false, // ✅ use only in dev
//       },
//     });

//     const FRONTEND_URL = process.env.CLIENT_URL || "http://localhost:5173";

//     const message = `🎉 Congratulations! Your theater <b>${username}</b> has been accepted. You can now login and start using our platform.`;

//     const mailData = {
//       from: EMAIL,
//       to: email,
//       subject: "Theater Accepted - MovieRule",
//       html: `
//         <p>${message}</p>
//         <a href="${FRONTEND_URL}/theater/login" 
//            style="display:inline-block; margin-top:10px; padding:10px 20px; background:tomato; color:white; text-decoration:none; border-radius:5px;">
//            Login Here
//         </a>
//       `,
//     };

//     await transporter.sendMail(mailData);
//     console.log("✅ Acceptance email sent successfully");
//     return true;
//   } catch (error: any) {
//     console.error("❌ Error sending acceptance email:", error.message);
//     return false;
//   }
// };

import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../../application/config/config";

export const sendAcceptanceEmail = async (email: string, username: string) => {
  try {
    // ✅ Detect environment
    const isProduction = process.env.NODE_ENV === "production";

    // ✅ Dynamically pick correct frontend URL
    const FRONTEND_URL = isProduction
      ? process.env.CLIENT_URL_PROD || "https://movie-rule.vercel.app"
      : process.env.CLIENT_URL_DEV || "http://localhost:5173";

    // ✅ Setup secure mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // Safe for dev, harmless in prod
      },
    });

    // ✅ Message content
    const message = `
      🎉 Congratulations! <br/><br/>
      Your theater <b>${username}</b> has been <b>approved</b>! <br/>
      You can now log in to manage your shows, upload movies, and access your dashboard.
    `;

    // ✅ Email body
    const mailData = {
      from: `"MovieRule Support 🎬" <${EMAIL}>`,
      to: email,
      subject: "🎉 Your Theater Has Been Accepted - MovieRule",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px; line-height: 1.6;">
          <h2 style="color:#333;">Welcome to MovieRule, ${username}!</h2>
          <p>${message}</p>
          <a href="${FRONTEND_URL}/theater/login"
             style="display:inline-block; margin-top:20px; background-color:#ff4b2b;
                    color:#fff; padding:12px 20px; text-decoration:none; border-radius:8px;">
             Login to Your Theater Dashboard
          </a>
          <p style="margin-top:20px; font-size:14px; color:#555;">
            If you did not apply for this account, please ignore this message.
          </p>
          <br/>
          <p style="font-size:13px; color:#888;">– The MovieRule Team 🎬</p>
        </div>
      `,
    };

    // ✅ Send the email
    await transporter.sendMail(mailData);
    console.log(`📧 Acceptance email sent successfully to ${email}`);
    return true;
  } catch (error: any) {
    console.error("❌ Error sending acceptance email:", error.message);
    return false;
  }
};

