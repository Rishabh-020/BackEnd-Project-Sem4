import nodemailer from "nodemailer";

/**
 * Handles the contact form submission by sending an email.
 * Only logged-in users (verified by middleware) should be able to trigger this.
 */
export const sendContactEmail = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields (name, email, message).",
    });
  }

  try {
    // Create a transporter using SMTP settings from .env
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT === "465", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `📍 New Inquiry: ${subject || "Contact Form"}`,
      text: `New message from ${name} (${email}): ${message}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a202c; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px; text-transform: uppercase;">WanderSphere</h1>
            <p style="color: #a0aec0; margin: 5px 0 0; font-size: 14px;">New Contact Form Submission</p>
          </div>

          <!-- Content -->
          <div style="padding: 40px 30px; background-color: #ffffff;">
            <div style="margin-bottom: 25px;">
              <h2 style="font-size: 18px; color: #2d3748; margin-bottom: 15px; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;">Sender Details</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #718096; width: 100px;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #2d3748;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #718096;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3182ce; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #718096;"><strong>Subject:</strong></td>
                  <td style="padding: 8px 0; color: #2d3748;">${subject || "General Inquiry"}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 30px;">
              <h2 style="font-size: 18px; color: #2d3748; margin-bottom: 15px; border-bottom: 2px solid #edf2f7; padding-bottom: 10px;">Message</h2>
              <div style="background-color: #f7fafc; padding: 20px; border-radius: 8px; color: #4a5568; line-height: 1.8; font-style: italic; border-left: 4px solid #cbd5e0;">
                "${message.replace(/\n/g, "<br>")}"
              </div>
            </div>

            <div style="margin-top: 40px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; background-color: #3182ce; color: #ffffff; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold; transition: background-color 0.2s;">Reply Directly</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #edf2f7;">
            <p style="margin: 0; color: #a0aec0; font-size: 12px;">
              This email was sent from the WanderSphere Contact Form.<br>
              © 2026 WanderSphere Travel. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message:
        "Failed to send message. Please check server SMTP configuration.",
      error: error.message,
    });
  }
};
