import nodemailer from 'nodemailer';

export async function sendMail(
    { to, subject, body }:
        { to: string, subject: string, body: string }) {
    const { SMTP_EMAIL, SMTP_GMAIL_PASS } = process.env;
    const transport = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: true,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_GMAIL_PASS,
        },
    });

    try {
        const sendResult = await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body,
        });
        console.log({ sendResult });
    } catch (e) {
        console.log("Error connecting to email server", e);
    }
}