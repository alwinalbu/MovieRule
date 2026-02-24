import nodemailer from "nodemailer";
import { EMAIL, PASSWORD } from "../../application/config/config";

export const sendContactMail = async (formData: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) => {
  try {
    // ✅ Create Gmail transporter
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

    // ✅ Mail structure
    const mailOptions = {
      from: `"MovieRule Contact" <${EMAIL}>`, // must match your Gmail login
      to: EMAIL, // your admin email inbox
      replyTo: formData.email, // 👈 this allows admin to reply directly to the user
      subject: `📩 New Contact Message from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2 style="color: #e50914;">🎬 New Contact Message from MovieRule</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone || "N/A"}</p>
          <p><strong>Subject:</strong> ${formData.subject || "N/A"}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="border-left: 4px solid #e50914; padding-left: 10px; margin: 10px 0;">
            ${formData.message.replace(/\n/g, "<br>")}
          </blockquote>

          <hr/>
          <p style="font-size: 13px; color: #555;">
            <strong>Reply to this message</strong> directly to contact the user.<br/>
            <i>This message was sent automatically by MovieRule’s Contact form.</i>
          </p>
        </div>
      `,
    };

    // ✅ Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Contact email sent:", info.response);
    return true;
  } catch (error: any) {
    console.error("❌ Error sending contact email:", error.message);
    return false;
  }
};
