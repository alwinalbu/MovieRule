import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../application/config/config";

export const sendResetPasswordEmail = async (
  email: string,
  resetToken: string,
  userType: string
) => {
  // ✅ Detect environment
  const isProduction = process.env.NODE_ENV === "production";

  // ✅ Dynamically choose frontend URL
  const FRONTEND_URL = isProduction
    ? process.env.CLIENT_URL_PROD || "https://movie-rule.vercel.app"
    : process.env.CLIENT_URL_DEV || "http://localhost:5173";

  // ✅ Configure email transport
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

  // ✅ Build reset link based on user type
  let resetLink: string;

  if (userType === "user") {
    resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}`;
  } else if (userType === "theatre") {
    resetLink = `${FRONTEND_URL}/theater/theater-reset-password?token=${resetToken}`;
  } else {
    throw new Error("Invalid userType provided");
  }

  // ✅ Email content
  const mailData = {
    from: "movieruleentertainment@gmail.com",
    to: email,
    subject: "Password Reset - MovieRule 🎬",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2>Hi there 👋</h2>
        <p>You recently requested to reset your password on <b>MovieRule</b>.</p>
        <p>Click the button below to reset it:</p>
        <a href="${resetLink}"
          style="display:inline-block; background-color:#ff4b2b; color:#fff; padding:12px 20px;
                 text-decoration:none; border-radius:6px; margin-top:10px;">
          Reset Password
        </a>
        <p style="margin-top:20px;">This link <b>expires in 15 minutes</b>.</p>
        <p>If you didn’t request this, you can safely ignore this email.</p>
        <br/>
        <p>– The MovieRule Team 🎬</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailData);
    console.log(`📧 Password reset email sent successfully to ${email}`);
    return true;
  } catch (error) {
    console.error("❌ Error while sending password reset email:", error);
    return false;
  }
};

