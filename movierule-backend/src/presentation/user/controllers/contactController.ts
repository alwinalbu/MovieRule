import contactModel from "../../../infrastructure/database/mogodb/models/contactModel";
import { sendContactMail } from "../../../utils/email/sendContactMail";
import { Request, Response } from "express";



export const submitContactController = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Name, Email, and Message are required.",
        });
    }

    //  Save contact message in database
    const contact = new contactModel({ name, email, phone, subject, message });
    await contact.save();

    //  Send email to admin
    const mailSent = await sendContactMail({
      name,
      email,
      phone,
      subject,
      message,
    });

    //  Send success response
    res.status(200).json({
      success: true,
      message: mailSent
        ? "Your message has been sent successfully."
        : "Message saved, but failed to send email notification.",
    });
  } catch (error: any) {
    console.error("Error submitting contact form:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
