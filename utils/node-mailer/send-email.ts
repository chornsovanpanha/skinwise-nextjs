import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export type SendEmailDTO = {
  sender: Mail.Address;
  subject: string;
  message: string;
  receipients: Mail.Address[];
};
export async function sendEmail({
  message,
  receipients,
  sender,
  subject,
}: SendEmailDTO) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      // secure: process.env.NODE_ENV != "development" ? true : false,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: sender,
      to: receipients,
      subject,
      html: message,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Sending Email failed");
  }
}
